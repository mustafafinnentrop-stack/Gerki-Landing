export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ paddingTop: "100px" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(29, 107, 243, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 212, 170, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
          style={{
            background: "rgba(0, 212, 170, 0.1)",
            borderColor: "rgba(0, 212, 170, 0.3)",
            color: "var(--accent)",
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "var(--accent)" }} />
          Lokale KI · Kein API-Key · Läuft auf deinem PC
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Deine KI.{" "}
          <span className="gradient-text">Lokal. Privat.</span>
          {" "}Kostenlos.
        </h1>

        {/* Subline */}
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          Gerki ist deine persönliche KI-App – powered by Ollama.
          Läuft komplett auf deinem PC, ohne Cloud-Anbindung oder API-Key.
          Mit Pro: Claude & ChatGPT optional dazu.
        </p>

        {/* Pro note */}
        <p className="text-sm max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
          * Claude & ChatGPT erfordern eigene API-Zugänge (optional, nur Pro). Lokale KI immer kostenlos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#download"
            className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all hover:scale-105 hover:opacity-90 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #1d6bf3, #1557d0)",
              boxShadow: "0 0 30px rgba(29, 107, 243, 0.4)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Kostenlos herunterladen
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/10 flex items-center gap-2"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            So funktioniert&apos;s
          </a>
        </div>

        {/* Desktop App Preview */}
        <div
          className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface)",
            boxShadow: "0 0 80px rgba(29, 107, 243, 0.15)",
          }}
        >
          {/* macOS-style window header */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-4 text-sm" style={{ color: "var(--muted)" }}>Gerki Desktop — Persönlicher Assistent</span>
            {/* Model indicator */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0, 212, 170, 0.15)", color: "var(--accent)", border: "1px solid rgba(0, 212, 170, 0.3)" }}>⚡ Lokal (Ollama)</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium opacity-40" style={{ background: "rgba(29, 107, 243, 0.1)", color: "var(--primary-light)", border: "1px solid rgba(29, 107, 243, 0.2)" }}>Pro: Claude</span>
            </div>
          </div>

          {/* AI Chat preview – Behördenpost use case */}
          <div className="p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4aa, #1d6bf3)" }}>
                KI
              </div>
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
                Ich habe Ihr Schreiben vom Finanzamt analysiert. Sie werden um einen Einkommensnachweis und eine Kontoübersicht der letzten 3 Monate gebeten.
                <div className="mt-1 text-xs" style={{ color: "var(--accent)" }}>⚡ Lokal generiert – keine Cloud, kein API-Key</div>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(29, 107, 243, 0.2)", color: "var(--foreground)", border: "1px solid rgba(29, 107, 243, 0.3)" }}>
                Kannst du die passenden Dokumente auf meinem PC suchen und die Antwort vorbereiten?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4aa, #1d6bf3)" }}>
                KI
              </div>
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
                <div className="mb-2 flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2h8v8H2z" strokeLinecap="round" /><path d="M4 5h4M4 7h2" strokeLinecap="round" /></svg>
                  Durchsuche Dokumente-Ordner...
                </div>
                <span style={{ color: "var(--accent)" }}>✓ 2 Dateien gefunden:</span> Gehaltsabrechnung_März.pdf · Kontoauszug_Q1.pdf
                <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>Antwortmail wurde vorbereitet – bereit zum Versenden.</div>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 px-6 py-4" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
            {[
              { label: "Dokumente indexiert", value: "1.247" },
              { label: "Aktive Skills", value: "8" },
              { label: "Gesparte Stunden", value: "47h" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-bold text-lg" style={{ color: "var(--accent)" }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges below hero */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            "Kostenlos starten",
            "Kein API-Key nötig",
            "Läuft lokal auf deinem PC",
            "DSGVO-konform",
            "Claude & GPT-4 optional (Pro)",
            "N8N bald verfügbar"
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
