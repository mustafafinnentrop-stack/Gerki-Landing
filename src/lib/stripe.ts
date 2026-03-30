import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const PLAN_PRICE_IDS: Record<string, string | undefined> = {
  standard: process.env.STRIPE_PRICE_STANDARD,
  business: process.env.STRIPE_PRICE_BUSINESS,
};
