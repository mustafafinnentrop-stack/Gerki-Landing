"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message { role: "user" | "assistant"; content: string; id?: string; }
interface Conversation {
  id: string;
  title: string | null;
  updatedAt: string;
  messages: { content: string; role: string }[];
}

async function apiPost(url: string, body: object) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function ChatInterface({ user }: { user: { name: string; email: string } }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // Load conversation list
  const loadConversations = useCallback(async () => {
    setLoadingConvs(true);
    try {
      const res = await fetch("/api/app/sync/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations ?? []);
      }
    } catch { /* silent */ } finally {
      setLoadingConvs(false);
    }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  // Load messages for a conversation
  async function openConversation(conv: Conversation) {
    setActiveConvId(conv.id);
    setMessages([]);
    setError(null);
    try {
      const res = await fetch(`/api/app/sync/messages?conversationId=${conv.id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages((data.messages ?? []).map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })));
      }
    } catch { /* silent */ }
  }

  function newChat() {
    setActiveConvId(null);
    setMessages([]);
    setError(null);
    textareaRef.current?.focus();
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      // Create conversation on first message
      let convId = activeConvId;
      if (!convId) {
        const conv = await apiPost("/api/app/sync/conversations", {
          title: text.slice(0, 60),
          deviceId: "web",
        });
        convId = conv.conversation.id;
        setActiveConvId(convId);
      }

      // Save user message to Supabase
      await apiPost("/api/app/sync/messages", { conversationId: convId, role: "user", content: text });

      // Stream from Groq/Llama
      const res = await fetch("/api/app/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, conversationId: convId }),
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

      // Save assistant response to Supabase
      if (full && convId) {
        await apiPost("/api/app/sync/messages", { conversationId: convId, role: "assistant", content: full });
      }

      // Refresh conversation list
      await loadConversations();

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  const firstName = user.name?.split(" ")[0] || "dort";

  return (
    <div className="flex h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 flex flex-col shrink-0" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
          <div className="p-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-semibold">Gespräche</span>
            <button
              onClick={newChat}
              className="text-xs px-2 py-1 rounded-lg font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--primary)" }}
            >
              + Neu
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {loadingConvs ? (
              <div className="px-3 py-2 text-xs" style={{ color: "var(--muted)" }}>Lädt...</div>
            ) : conversations.length === 0 ? (
              <div className="px-3 py-4 text-xs text-center" style={{ color: "var(--muted)" }}>
                Noch keine Gespräche.<br />Starte einen neuen Chat.
              </div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => openConversation(conv)}
                  className="w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-white/5"
                  style={{
                    background: activeConvId === conv.id ? "rgba(29,107,243,0.1)" : "transparent",
                    borderLeft: activeConvId === conv.id ? "2px solid var(--primary)" : "2px solid transparent",
                  }}
                >
                  <div className="font-medium truncate text-xs" style={{ color: "var(--foreground)" }}>
                    {conv.title || "Gespräch"}
                  </div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "var(--muted)" }}>
                    {conv.messages?.[0]?.content?.slice(0, 40) || ""}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)", opacity: 0.6 }}>
                    {new Date(conv.updatedAt).toLocaleDateString("de-DE")}
                  </div>
                </button>
              ))
            )}
          </div>
          <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
            <a href="/dashboard" className="text-xs block text-center py-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: "var(--muted)" }}>
              ← Dashboard
            </a>
          </div>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color: "var(--muted)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect y="2" width="16" height="1.5" rx="1" />
                <rect y="7" width="16" height="1.5" rx="1" />
                <rect y="12" width="16" height="1.5" rx="1" />
              </svg>
            </button>
            <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Gerki KI-Chat</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,212,170,0.15)", color: "var(--accent)", border: "1px solid rgba(0,212,170,0.3)" }}>⚡ Llama 3.3 70B</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(29,107,243,0.1)", color: "var(--primary-light)", border: "1px solid rgba(29,107,243,0.2)" }}>☁ Cloud-Sync aktiv</span>
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{user.email}</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4" style={{ color: "var(--muted)" }}>
              <img src="/gerki-icon.svg" alt="Gerki" className="w-16 h-16 rounded-2xl" />
              <div>
                <p className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>Hallo {firstName}, wie kann ich helfen?</p>
                <p className="text-sm mt-1">Deine Gespräche werden automatisch mit der Gerki-App synchronisiert.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2 max-w-md w-full">
                {["Erkläre mir diesen Behördenbrief", "Prüfe diesen Vertrag", "Erstelle eine Rechnung", "Schreibe eine professionelle E-Mail"].map((s) => (
                  <button key={s} onClick={() => setInput(s)} className="text-sm px-4 py-3 rounded-xl text-left transition-all hover:bg-white/10" style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
              {msg.role === "assistant" && (
                <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-full shrink-0 mt-1" />
              )}
              <div className="max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                style={msg.role === "user"
                  ? { background: "rgba(29,107,243,0.2)", border: "1px solid rgba(29,107,243,0.3)", color: "var(--foreground)" }
                  : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                {msg.content || (
                  <span className="flex gap-1">
                    {[0, 150, 300].map((d) => <span key={d} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: `${d}ms` }} />)}
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="text-center text-sm px-4 py-2 rounded-xl mx-auto max-w-sm" style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", color: "#ff5050" }}>{error}</div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 pb-4 pt-2" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--foreground)", minHeight: "48px", maxHeight: "160px" }}
              rows={1}
              placeholder="Nachricht eingeben... (Enter zum Senden, Shift+Enter für neue Zeile)"
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${e.target.scrollHeight}px`; }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={loading}
            />
            <button onClick={send} disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #1d6bf3, #1557d0)", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 15L15 9 3 3v5l8 1-8 1v5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-center mt-2" style={{ color: "var(--muted)" }}>
            Gespräche werden mit deiner Gerki-App synchronisiert · Llama 3.3 70B
          </p>
        </div>
      </div>
    </div>
  );
}
