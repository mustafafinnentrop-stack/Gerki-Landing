"use client";

export default function DemoSection() {
  return (
    <section className="py-24 px-6" id="demo">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(29, 107, 243, 0.15) 0%, rgba(0, 212, 170, 0.1) 100%)",
            border: "1px solid rgba(29, 107, 243, 0.3)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(29, 107, 243, 0.1) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(0, 212, 170, 0.15)",
                border: "1px solid rgba(0, 212, 170, 0.3)",
                color: "var(--accent)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1l1.5 3 3.3.5-2.4 2.3.6 3.2L7 8.5 4 10l.6-3.2L2.2 4.5l3.3-.5L7 1z" />
              </svg>
              Windows & Mac · 14 Tage kostenlos testen
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Jetzt herunterladen
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
              Laden Sie Gerki herunter und melden Sie sich in der App an – oder erstellen Sie direkt ein Konto und starten Sie Ihren 14-Tage-Trial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/mustafafinnentrop-stack/gerki-app/releases"
                className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all hover:opacity-90 hover:scale-105 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #1d6bf3, #1557d0)",
                  boxShadow: "0 0 30px rgba(29, 107, 243, 0.4)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Gerki herunterladen
              </a>
              <a
                href="/register"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/10 flex items-center gap-2"
                style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                14 Tage kostenlos testen
              </a>
            </div>
            <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
              Windows & Mac · 14 Tage kostenlos — kein API-Key, kein Cloud-Zwang
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
