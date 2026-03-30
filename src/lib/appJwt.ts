import jwt from "jsonwebtoken";

const PLAN_MAP: Record<string, string> = {
  PERSONAL: "free",
  PRO: "standard",
  BUSINESS: "business",
  ENTERPRISE: "enterprise",
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
    { expiresIn: "30d", algorithm: "HS256" }
  );
}
