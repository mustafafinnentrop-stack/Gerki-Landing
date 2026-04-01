import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function getAuthUser(req: NextRequest) {
  // 1. Try Bearer JWT (Electron app)
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const secret = process.env.APP_JWT_SECRET;
    if (!secret) return null;
    try {
      const payload = jwt.verify(token, secret) as { sub: string };
      return await prisma.user.findUnique({
        where: { id: payload.sub },
        include: { company: { include: { subscription: true } } },
      });
    } catch {
      return null;
    }
  }

  // 2. Fall back to NextAuth session (web)
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { include: { subscription: true } } },
  });
}

export function resolveplan(user: {
  createdAt: Date;
  company: { createdAt: Date; subscription: { plan: string; status: string } | null } | null;
} | null): string {
  if (!user) return "expired";

  const sub = user.company?.subscription;
  if (sub && (sub.status === "ACTIVE" || sub.status === "TRIALING")) {
    const map: Record<string, string> = {
      PRO: "standard",
      BUSINESS: "pro",
      ENTERPRISE: "business",
    };
    return map[sub.plan] ?? "standard";
  }

  // No active subscription — check 14-day trial window
  const ref = user.company?.createdAt ?? user.createdAt;
  const daysSince = Math.floor((Date.now() - new Date(ref).getTime()) / 86_400_000);
  return daysSince <= 14 ? "trial" : "expired";
}
