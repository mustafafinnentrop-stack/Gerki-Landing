const steps = [
  {
    number: "01",
    title: "Herunterladen & Installieren",
    description: "Laden Sie Gerki herunter und installieren Sie es wie jede andere App – in unter 2 Minuten. Ollama (lokale KI) ist schon enthalten.",
    details: ["Windows & Mac verfügbar", "Kein API-Key nötig", "Setup-Assistent inklusive"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 3v16M7 13l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 22h20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Ordner freigeben & Skills wählen",
    description: "Geben Sie Ordner frei, die Gerki durchsuchen darf. Wählen Sie die Skills aus, die Sie brauchen – alles läuft 100% lokal.",
    details: ["Dokumente-Ordner freigeben", "Gewünschte Skills aktivieren", "Keine Cloud-Verbindung nötig"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4M6.22 6.22l2.83 2.83M18.95 18.95l2.83 2.83M6.22 21.78l2.83-2.83M18.95 9.05l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Loslegen – Ihre Daten bleiben lokal",
    description: "Stellen Sie Fragen, lassen Sie Dokumente suchen, delegieren Sie Aufgaben. Alles auf Ihrem PC — kein Internet nötig, kein Tracking.",
    details: ["Fragen stellen & Agenten starten", "Dokumente automatisch finden", "Ergebnisse exportieren & teilen"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 12 10-12h-9l1-12z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            In 3 Schritten
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            In 3 Schritten startklar
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Von Download bis zum ersten automatisierten Ergebnis – alles in unter 10 Minuten.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)" }}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Number circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 font-bold text-2xl"
                  style={{
                    background: index === 1
                      ? "linear-gradient(135deg, #1d6bf3, #00d4aa)"
                      : "var(--surface-2)",
                    border: "2px solid " + (index === 1 ? "transparent" : "var(--border)"),
                    color: index === 1 ? "white" : "var(--primary-light)",
                    boxShadow: index === 1 ? "0 0 30px rgba(29, 107, 243, 0.4)" : "none",
                  }}
                >
                  {step.number}
                </div>

                {/* Card */}
                <div
                  className="w-full p-6 rounded-2xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid " + (index === 1 ? "rgba(29, 107, 243, 0.4)" : "var(--border)"),
                    boxShadow: index === 1 ? "0 0 40px rgba(29, 107, 243, 0.1)" : "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(29, 107, 243, 0.12)", color: "var(--primary-light)" }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center justify-center gap-2 text-sm">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="var(--accent)" strokeWidth="1.2" />
                          <path d="M4.5 7l1.5 1.5 3-3" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ color: "var(--foreground)" }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/mustafafinnentrop-stack/gerki-app/releases"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #1d6bf3, #1557d0)", boxShadow: "0 0 30px rgba(29, 107, 243, 0.3)" }}
          >
            App jetzt herunterladen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v8M4 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
