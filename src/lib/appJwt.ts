import jwt from "jsonwebtoken";

const PLAN_MAP: Record<string, string> = {
  PERSONAL: "free",
  PRO: "pro",
  BUSINESS: "enterprise",
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

  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, plan: user.plan },
    secret,
    { expiresIn: "30d", algorithm: "HS256" }
  );
}
