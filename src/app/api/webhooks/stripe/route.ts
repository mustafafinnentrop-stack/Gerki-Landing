import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

const PLAN_MAP: Record<string, "STANDARD" | "PRO" | "BUSINESS"> = {
  [process.env.STRIPE_PRICE_STANDARD ?? "__standard__"]: "STANDARD",
  [process.env.STRIPE_PRICE_PRO ?? "__pro__"]: "PRO",
  [process.env.STRIPE_PRICE_BUSINESS ?? "__business__"]: "BUSINESS",
};

function getPlanFromPriceId(priceId: string): "STANDARD" | "PRO" | "BUSINESS" | "TRIAL" {
  return PLAN_MAP[priceId] ?? "TRIAL";
}

async function upsertSubscription(
  companyId: string,
  sub: Stripe.Subscription
) {
  const priceId = sub.items.data[0]?.price?.id ?? "";
  const plan = getPlanFromPriceId(priceId);

  const statusMap: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING" | "PAUSED"> = {
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    trialing: "TRIALING",
    paused: "PAUSED",
    incomplete: "PAST_DUE",
    incomplete_expired: "CANCELED",
    unpaid: "PAST_DUE",
  };

  const status = statusMap[sub.status] ?? "ACTIVE";

  await prisma.subscription.upsert({
    where: { companyId },
    create: {
      companyId,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      plan,
      status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      plan,
      status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode !== "subscription") break;

        const subscriptionId = checkoutSession.subscription as string;
        if (!subscriptionId) break;

        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        // companyId is in subscription metadata (propagated from subscription_data.metadata)
        const companyId = sub.metadata?.companyId ?? checkoutSession.metadata?.companyId;
        if (!companyId) break;

        await upsertSubscription(companyId, sub);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription;
        const companyId = sub.metadata?.companyId;
        if (!companyId) {
          // Fall back to looking up by stripeCustomerId
          const company = await prisma.company.findUnique({
            where: { stripeCustomerId: sub.customer as string },
          });
          if (company) await upsertSubscription(company.id, sub);
        } else {
          await upsertSubscription(companyId, sub);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: "CANCELED", plan: "TRIAL", cancelAtPeriodEnd: false },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription as string | null;
        if (subId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subId },
            data: { status: "PAST_DUE" },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription as string | null;
        if (subId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subId },
            data: { status: "ACTIVE" },
          });

          // Save invoice record
          const company = await prisma.company.findUnique({
            where: { stripeCustomerId: invoice.customer as string },
          });
          if (company) {
            await prisma.invoice.upsert({
              where: { stripeInvoiceId: invoice.id },
              create: {
                companyId: company.id,
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: "PAID",
                pdfUrl: invoice.invoice_pdf ?? null,
                paidAt: new Date(),
              },
              update: {
                status: "PAID",
                pdfUrl: invoice.invoice_pdf ?? null,
                paidAt: new Date(),
              },
            });
          }
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Internal handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
