import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, resolveplan } from "@/lib/getAuthUser";
import { prisma } from "@/lib/prisma";
import { PLAN_TOKEN_LIMITS } from "@/app/api/app/usage/route";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// POST /api/app/chat/stream
// Body: { messages: [{role, content}], model?, conversationId?, agentType? }
export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });

  const plan = resolveplan(user);
  if (plan === "expired") {
    return NextResponse.json({ error: "Abo abgelaufen. Bitte Plan erneuern." }, { status: 402, headers: CORS });
  }

  // Check monthly token limit
  const limit = PLAN_TOKEN_LIMITS[plan] ?? 0;
  if (limit !== Infinity) {
    const month = currentMonth();
    const records = await prisma.usageRecord.findMany({ where: { userId: user.id, month } });
    const used = records.reduce((s, r) => s + r.tokensInput + r.tokensOutput, 0);
    if (used >= limit) {
      return NextResponse.json(
        { error: `Monatliches Token-Limit erreicht (${limit.toLocaleString()} Tokens). Bitte upgraden.` },
        { status: 429, headers: CORS }
      );
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chat-Service nicht konfiguriert." }, { status: 503, headers: CORS });
  }

  const { messages, model = "claude-sonnet-4-6", conversationId } = await req.json();
  if (!messages?.length) {
    return NextResponse.json({ error: "messages required" }, { status: 400, headers: CORS });
  }

  // Build system prompt based on plan
  const systemPrompt = `Du bist Gerki, ein spezialisierter KI-Assistent für den deutschen Büroalltag.
Du hilfst mit Behördenpost, Verträgen, Rechnungen, E-Mails und anderen Büroaufgaben.
Antworte immer auf Deutsch, präzise und praxisorientiert.
Aktueller Plan des Nutzers: ${plan}.`;

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: systemPrompt,
      stream: true,
      messages: messages.slice(-20), // last 20 messages for context
    }),
  });

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text();
    console.error("Anthropic error:", err);
    return NextResponse.json({ error: "KI-Anfrage fehlgeschlagen." }, { status: 502, headers: CORS });
  }

  // Track usage after stream completes using transform stream
  let inputTokens = 0;
  let outputTokens = 0;
  const userId = user.id;
  const usedModel = model;

  const transform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
      // Parse SSE lines for token counts
      const text = new TextDecoder().decode(chunk);
      for (const line of text.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === "message_start") inputTokens = data.message?.usage?.input_tokens ?? 0;
          if (data.type === "message_delta") outputTokens = data.usage?.output_tokens ?? 0;
        } catch { /* ignore parse errors */ }
      }
    },
    async flush() {
      if (inputTokens + outputTokens > 0) {
        await prisma.usageRecord.create({
          data: { userId, model: usedModel, tokensInput: inputTokens, tokensOutput: outputTokens, month: currentMonth() },
        });
        // Save assistant message to conversation if provided
        if (conversationId) {
          await prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } });
        }
      }
    },
  });

  return new NextResponse(anthropicRes.body!.pipeThrough(transform), {
    headers: {
      ...CORS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
