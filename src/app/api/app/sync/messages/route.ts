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

// GET /api/app/sync/messages?conversationId=xxx
export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const conversationId = req.nextUrl.searchParams.get("conversationId");
  if (!conversationId) return NextResponse.json({ error: "conversationId required" }, { status: 400, headers: CORS });

  // Verify ownership
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId: user.id },
  });
  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });

  const messages = await prisma.syncMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages }, { headers: CORS });
}

// POST /api/app/sync/messages — add message to conversation
export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const { conversationId, role, content, tokenCount } = await req.json();

  if (!conversationId || !role || !content) {
    return NextResponse.json({ error: "conversationId, role, content required" }, { status: 400, headers: CORS });
  }

  // Verify ownership
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId: user.id },
  });
  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });

  const [message] = await prisma.$transaction([
    prisma.syncMessage.create({
      data: { conversationId, role, content, tokenCount },
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ message }, { status: 201, headers: CORS });
}
