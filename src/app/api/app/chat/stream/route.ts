import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, resolveplan } from "@/lib/getAuthUser";
import { prisma } from "@/lib/prisma";
import { PLAN_TOKEN_LIMITS } from "@/app/api/app/usage/route";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Best available open-source model via Groq (Llama 3.3 70B — equivalent to best Ollama model)
const MODEL = "llama-3.3-70b-versatile";

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// POST /api/app/chat/stream
// Body: { messages: [{role, content}], conversationId? }
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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chat-Service nicht konfiguriert. Bitte GROQ_API_KEY setzen." }, { status: 503, headers: CORS });
  }

  const { messages, conversationId } = await req.json();
  if (!messages?.length) {
    return NextResponse.json({ error: "messages required" }, { status: 400, headers: CORS });
  }

  const systemPrompt = `Du bist Gerki, ein spezialisierter KI-Assistent für den deutschen Büroalltag.
Du hilfst mit Behördenpost, Verträgen, Rechnungen, E-Mails und anderen Büroaufgaben.
Antworte immer auf Deutsch, präzise und praxisorientiert.
Heute ist der ${new Date().toLocaleDateString("de-DE")}.`;

  // Groq API — OpenAI-compatible format, runs Llama 3.3 70B
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-20),
      ],
      max_tokens: 2048,
      stream: true,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.text();
    console.error("Groq error:", err);
    return NextResponse.json({ error: "KI-Anfrage fehlgeschlagen." }, { status: 502, headers: CORS });
  }

  const userId = user.id;
  let inputTokens = 0;
  let outputTokens = 0;

  // Parse OpenAI-format SSE stream and track token usage from final chunk
  const transform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
      const text = new TextDecoder().decode(chunk);
      for (const line of text.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") continue;
        try {
          const data = JSON.parse(raw);
          // Groq sends usage in the last chunk
          if (data.usage) {
            inputTokens = data.usage.prompt_tokens ?? 0;
            outputTokens = data.usage.completion_tokens ?? 0;
          }
        } catch { /* ignore */ }
      }
    },
    async flush() {
      if (inputTokens + outputTokens > 0) {
        await prisma.usageRecord.create({
          data: { userId, model: MODEL, tokensInput: inputTokens, tokensOutput: outputTokens, month: currentMonth() },
        });
      }
      if (conversationId) {
        await prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } }).catch(() => {});
      }
    },
  });

  return new NextResponse(groqRes.body!.pipeThrough(transform), {
    headers: {
      ...CORS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
