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
              Kostenloser Download · Keine Kreditkarte erforderlich
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Jetzt kostenlos starten
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
              Laden Sie Gerki herunter und erleben Sie, wie KI wirklich für Sie arbeitet – auf Ihrem PC, mit Ihren Dateien.
            </p>

            {/* Form */}
            <form className="max-w-lg mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Vorname"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(5, 8, 15, 0.6)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(5, 8, 15, 0.6)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
              <input
                type="email"
                placeholder="Geschäftliche E-Mail-Adresse"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(5, 8, 15, 0.6)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              <input
                type="text"
                placeholder="Firmenname"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(5, 8, 15, 0.6)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              <select
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                style={{
                  background: "rgba(5, 8, 15, 0.6)",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                <option value="">Unternehmensgröße auswählen</option>
                <option value="1-10">1–10 Mitarbeiter</option>
                <option value="11-50">11–50 Mitarbeiter</option>
                <option value="51-200">51–200 Mitarbeiter</option>
                <option value="200+">Über 200 Mitarbeiter</option>
              </select>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #1d6bf3, #1557d0)",
                  boxShadow: "0 0 30px rgba(29, 107, 243, 0.4)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path fillRule="evenodd" d="M2 13a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zm3.293-5.707a1 1 0 011.414 0L9 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M9 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Gerki kostenlos herunterladen
              </button>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Windows & Mac · Keine Kreditkarte · In 2 Minuten startklar
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
