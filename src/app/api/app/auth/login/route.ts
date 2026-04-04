import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

// Rate limiting: max 5 login attempts per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count++;
  return false;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Zu viele Versuche. Bitte warte eine Minute." },
      { status: 429, headers: CORS_HEADERS }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "E-Mail und Passwort erforderlich." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
      include: {
        company: {
          include: { subscription: true },
        },
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: "Ungültige Anmeldedaten." },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const passwordValid = await bcrypt.compare(String(password), user.password);

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: "Ungültige Anmeldedaten." },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const secret = process.env.APP_JWT_SECRET;
    if (!secret) {
      console.error("APP_JWT_SECRET is not set");
      return NextResponse.json(
        { success: false, error: "Serverkonfigurationsfehler." },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Determine plan: active subscription > trial window > expired
    const sub = user.company?.subscription;
    let plan = "expired";
    if (sub && (sub.status === "ACTIVE" || sub.status === "TRIALING")) {
      const map: Record<string, string> = { STANDARD: "standard", PRO: "pro", BUSINESS: "business" };
      plan = map[sub.plan] ?? "standard";
    } else {
      const ref = user.company?.createdAt ?? user.createdAt;
      const daysSince = Math.floor((Date.now() - new Date(ref).getTime()) / 86_400_000);
      plan = daysSince <= 14 ? "trial" : "expired";
    }
    const username = user.name ?? user.email?.split("@")[0] ?? "user";

    const token = jwt.sign(
      { sub: user.id, email: user.email, username, plan },
      secret,
      { expiresIn: "24h", algorithm: "HS256" }
    );

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          username,
          plan,
          created_at: user.createdAt,
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Anmeldung fehlgeschlagen." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
