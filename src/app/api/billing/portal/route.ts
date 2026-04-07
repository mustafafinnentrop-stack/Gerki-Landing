import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: true },
  });

  if (!user?.company?.stripeCustomerId) {
    return NextResponse.json(
      { error: "Kein Stripe-Konto gefunden. Bitte zuerst ein Abo abschließen." },
      { status: 404 }
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://www.gerki.app";

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.company.stripeCustomerId,
      return_url: `${baseUrl}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("[billing/portal] Stripe error:", err);
    return NextResponse.json(
      { error: "Fehler beim Öffnen des Kundenportals. Bitte versuche es erneut." },
      { status: 502 }
    );
  }
}
