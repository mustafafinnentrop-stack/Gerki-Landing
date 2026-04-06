import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/getAuthUser";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// GET /api/app/sync/conversations — list user's conversations
export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      agentType: true,
      deviceId: true,
      createdAt: true,
      updatedAt: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1, select: { content: true, role: true } },
    },
  });

  return NextResponse.json({ conversations }, { headers: CORS });
}

// POST /api/app/sync/conversations — create a conversation
export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const { title, agentType, deviceId } = await req.json();

  const conversation = await prisma.conversation.create({
    data: { userId: user.id, title: title ?? "Neues Gespräch", agentType, deviceId },
  });

  return NextResponse.json({ conversation }, { status: 201, headers: CORS });
}
