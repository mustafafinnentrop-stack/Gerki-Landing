import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, PLAN_PRICE_IDS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { plan } = await req.json();

  if (!plan || !["standard", "pro", "business"].includes(plan)) {
    return NextResponse.json({ error: "Ungültiger Plan." }, { status: 400 });
  }

  const priceId = PLAN_PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe Preis nicht konfiguriert. Bitte kontaktiere den Support." },
      { status: 500 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { include: { subscription: true } } },
  });

  if (!user?.company) {
    return NextResponse.json({ error: "Kein Unternehmenskonto gefunden." }, { status: 404 });
  }

  const company = user.company;
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://www.gerki.app";

  try {
    // Get or create Stripe customer
    let stripeCustomerId = company.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        name: company.name,
        metadata: { companyId: company.id, userId: user.id },
      });
      stripeCustomerId = customer.id;
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { companyId: company.id, plan },
      },
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/dashboard?checkout=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("[checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Checkout-Session. Bitte versuche es erneut." },
      { status: 502 }
    );
  }
}
