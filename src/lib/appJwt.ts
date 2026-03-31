import jwt from "jsonwebtoken";

const PLAN_MAP: Record<string, string> = {
  PERSONAL: "free",
  PRO: "standard",       // Standard plan (39,90€)
  BUSINESS: "pro",       // Pro plan (59,90€)
  ENTERPRISE: "business", // Business plan (89,90€)
};

export function mapPlan(prismaPlan: string): string {
  return PLAN_MAP[prismaPlan] ?? "free";
}

export function generateAppJWT(user: {
  id: string;
  email: string | null;
  name: string | null;
  plan: string;
}): string {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error("APP_JWT_SECRET is not set");

  const username = user.name ?? user.email?.split("@")[0] ?? "user";

  return jwt.sign(
    { sub: user.id, email: user.email, username, plan: user.plan },
    secret,
    { expiresIn: "24h", algorithm: "HS256" }
  );
}
