import jwt from "jsonwebtoken";

// DB PlanType enum → JWT plan string (matches Electron app expectations)
const PLAN_MAP: Record<string, string> = {
  TRIAL:    "trial",
  STANDARD: "standard",
  PRO:      "pro",
  BUSINESS: "business",
};

export function mapPlan(prismaPlan: string): string {
  return PLAN_MAP[prismaPlan] ?? "trial";
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
