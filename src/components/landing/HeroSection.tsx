export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ paddingTop: "100px" }}
    >
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
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
          style={{
            background: "rgba(0, 212, 170, 0.1)",
            borderColor: "rgba(0, 212, 170, 0.3)",
            color: "var(--accent)",
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "var(--accent)" }} />
          Sprachassistent + 8 Agenten · lokal &amp; offline · 14 Tage kostenlos
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Die KI die{" "}
          <span className="gradient-text">bei dir bleibt.</span>
        </h1>

        {/* Subline */}
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          Läuft komplett auf deinem Rechner — kein Internet, kein Tracking.
          Für Behördenpost, Verträge und Geschäftsdokumente — ohne Abo-Dschungel.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 mt-10">
          <a
            href="https://github.com/mustafafinnentrop-stack/gerki-app/releases"
            className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all hover:scale-105 hover:opacity-90 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #1d6bf3, #1557d0)",
              boxShadow: "0 0 30px rgba(29, 107, 243, 0.4)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            14 Tage kostenlos testen
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
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-4 text-sm" style={{ color: "var(--muted)" }}>Gerki Desktop — KI-Agenten für dein Büro</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0, 212, 170, 0.15)", color: "var(--accent)", border: "1px solid rgba(0, 212, 170, 0.3)" }}>⚡ Rechtsberater-Agent</span>
            </div>
          </div>

          <div className="p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4aa, #1d6bf3)" }}>
                G
              </div>
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
                Ich habe Ihr Schreiben vom Finanzamt analysiert. Sie werden um einen Einkommensnachweis und eine Kontoübersicht der letzten 3 Monate gebeten.
                <div className="mt-1 text-xs" style={{ color: "var(--accent)" }}>✓ Behördenpost-Agent — Antwort in 30 Sekunden bereit</div>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(29, 107, 243, 0.2)", color: "var(--foreground)", border: "1px solid rgba(29, 107, 243, 0.3)" }}>
                Kannst du die passenden Dokumente suchen und die Antwort vorbereiten?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #00d4aa, #1d6bf3)" }}>
                G
              </div>
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--foreground)" }}>
                <span style={{ color: "var(--accent)" }}>✓ 2 Dateien gefunden:</span> Gehaltsabrechnung_März.pdf · Kontoauszug_Q1.pdf
                <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>Antwortmail wurde vorbereitet — bereit zum Versenden.</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 px-6 py-4" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
            {[
              { label: "Gesparte Stunden/Woche", value: "12h" },
              { label: "Aktive KI-Agenten", value: "8" },
              { label: "Erledigte Aufgaben", value: "1.247" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-bold text-lg" style={{ color: "var(--accent)" }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            "100% lokal — keine Cloud",
            "14 Tage gratis — kein Risiko",
            "Offline & privat",
            "Jederzeit kündbar",
            "Made in Germany",
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
