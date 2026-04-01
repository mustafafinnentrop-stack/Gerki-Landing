import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, resolveplan } from "@/lib/getAuthUser";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const PLAN_TOKEN_LIMITS: Record<string, number> = {
  trial:    50_000,
  standard: 200_000,
  pro:      1_000_000,
  business: Infinity,
  expired:  0,
};

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// GET /api/app/usage — current month stats + limit
export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const month = currentMonth();
  const plan = resolveplan(user);
  const limit = PLAN_TOKEN_LIMITS[plan] ?? 0;

  const records = await prisma.usageRecord.findMany({
    where: { userId: user.id, month },
  });

  const tokensInput = records.reduce((s, r) => s + r.tokensInput, 0);
  const tokensOutput = records.reduce((s, r) => s + r.tokensOutput, 0);
  const total = tokensInput + tokensOutput;

  return NextResponse.json({
    month,
    plan,
    tokensInput,
    tokensOutput,
    total,
    limit: limit === Infinity ? null : limit,
    remaining: limit === Infinity ? null : Math.max(0, limit - total),
    percent: limit === Infinity ? 0 : Math.min(100, Math.round((total / limit) * 100)),
  }, { headers: CORS });
}

// POST /api/app/usage — track usage from Electron app
export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const { model, tokensInput, tokensOutput } = await req.json();
  if (!model || tokensInput == null || tokensOutput == null) {
    return NextResponse.json({ error: "model, tokensInput, tokensOutput required" }, { status: 400, headers: CORS });
  }

  await prisma.usageRecord.create({
    data: {
      userId: user.id,
      model,
      tokensInput: Number(tokensInput),
      tokensOutput: Number(tokensOutput),
      month: currentMonth(),
    },
  });

  return NextResponse.json({ ok: true }, { status: 201, headers: CORS });
}
