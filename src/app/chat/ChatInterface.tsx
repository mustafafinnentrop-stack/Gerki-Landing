"use client";

import { useState, useRef, useEffect } from "react";

interface Message { role: "user" | "assistant"; content: string; }

export default function ChatInterface({ user }: { user: { name: string; email: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...next, assistantMsg]);

    try {
      const res = await fetch("/api/app/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Fehler beim Senden");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") continue;
          try {
            const data = JSON.parse(raw);
            // OpenAI/Groq format: choices[0].delta.content
            const delta = data.choices?.[0]?.delta?.content;
            if (delta) {
              full += delta;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full };
                return updated;
              });
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setMessages(next); // remove empty assistant message
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
          >
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Gerki KI-Chat</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,212,170,0.15)", color: "var(--accent)", border: "1px solid rgba(0,212,170,0.3)" }}>⚡ Llama 3.3 70B</span>
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>{user.email}</div>
          </div>
        </div>
        <a
          href="/dashboard"
          className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
        >
          Dashboard
        </a>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4" style={{ color: "var(--muted)" }}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
            >
              G
            </div>
            <div>
              <p className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>Wie kann ich helfen?</p>
              <p className="text-sm mt-1">Stelle mir eine Frage zu Behördenpost, Verträgen, Rechnungen oder Büroaufgaben.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2 max-w-md w-full">
              {[
                "Erkläre mir diesen Behördenbrief",
                "Prüfe diesen Vertrag",
                "Erstelle eine Rechnung",
                "Schreibe eine professionelle E-Mail",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-sm px-4 py-3 rounded-xl text-left transition-all hover:bg-white/10"
                  style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
            {msg.role === "assistant" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1"
                style={{ background: "linear-gradient(135deg, #00d4aa, #1d6bf3)" }}
              >
                G
              </div>
            )}
            <div
              className="max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
              style={
                msg.role === "user"
                  ? { background: "rgba(29,107,243,0.2)", border: "1px solid rgba(29,107,243,0.3)", color: "var(--foreground)" }
                  : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }
              }
            >
              {msg.content || (
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "300ms" }} />
                </span>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="text-center text-sm px-4 py-2 rounded-xl mx-auto max-w-sm" style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", color: "#ff5050" }}>
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-4 pt-2" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              minHeight: "48px",
              maxHeight: "160px",
            }}
            rows={1}
            placeholder="Nachricht eingeben... (Enter zum Senden)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #1d6bf3, #1557d0)", flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 15L15 9 3 3v5l8 1-8 1v5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: "var(--muted)" }}>
          Gerki kann Fehler machen. Prüfe wichtige Informationen.
        </p>
      </div>
    </div>
  );
}
