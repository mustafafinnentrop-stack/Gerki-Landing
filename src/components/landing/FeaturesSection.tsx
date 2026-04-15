"use client";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8m-4-4v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 10l2 2 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Desktop-App",
    description: "Gerki wird als natives Programm installiert – wie Word oder Chrome. Kein Browser, kein Server, keine Technik-Kenntnisse nötig.",
    highlight: "Windows & Mac",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "100% lokal — DSGVO-konform",
    description: "Die KI läuft komplett auf Ihrem Rechner. Ihre Kundendaten verlassen den PC nie — nicht zum Training, nicht zur Analyse, überhaupt nicht.",
    highlight: "Kein Cloud-Vendor",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11v6M9 14l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Dateizugriff",
    description: "Gerki durchsucht Ihre Ordner, liest Dokumente und findet das Richtige automatisch. Alle Dateien bleiben lokal — keine Übermittlung.",
    highlight: "Lokale Dateien",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8m-4-4v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Spezialisierte Agenten",
    description: "Behördenpost, HR, Recht, Buchhaltung — 8 Agenten für die häufigsten Aufgaben. Keine Cloud-APIs nötig, alles lokal.",
    highlight: "8 Agenten",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 21a8 8 0 10-16 0" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 14v7m3-4l-3 4-3-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Für Selbstständige & KMU",
    description: "Endlich eine KI, die Sie für Kundendaten bedenkenlos einsetzen können. Keine Betriebsgeheimnisse in fremden Servern — alles bleibt Ihres.",
    highlight: "Geschätsgeheimnis sicher",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Ollama — offline KI",
    description: "Effiziente KI-Modelle, die auf normalen PCs laufen. Kein GPU-Monster nötig — auch ältere Rechner schaffen es.",
    highlight: "Offline-ready",
    comingSoon: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="6" height="10" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="4" width="6" height="13" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="9" width="6" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7V5M12 4V2M19 9V7" strokeLinecap="round" />
      </svg>
    ),
    title: "N8N-Automatisierungen",
    description: "Verbinden Sie Gerki mit 400+ Apps: Gmail, Slack, Notion, CRM und mehr. Automatisierungen per Sprache erstellen – keine Programmierkenntnisse nötig.",
    highlight: "Coming Soon",
    comingSoon: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            Warum Gerki anders ist
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Die erste DSGVO-konforme Lösung.
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Gerki läuft komplett auf Ihrem Rechner. Keine Cloud, keine API-Kosten, keine Datenschutzbeauftragten nötig.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-default relative"
              style={{
                background: feature.comingSoon ? "rgba(29, 107, 243, 0.03)" : "var(--surface)",
                border: feature.comingSoon ? "1px dashed rgba(29, 107, 243, 0.3)" : "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29, 107, 243, 0.5)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(29, 107, 243, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = feature.comingSoon ? "rgba(29, 107, 243, 0.3)" : "var(--border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Coming Soon ribbon */}
              {feature.comingSoon && (
                <div
                  className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(29, 107, 243, 0.15)", color: "var(--primary-light)", border: "1px solid rgba(29, 107, 243, 0.3)" }}
                >
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(29, 107, 243, 0.12)", color: "var(--primary-light)" }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {feature.description}
              </p>

              {/* Highlight badge */}
              {!feature.comingSoon && (
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0, 212, 170, 0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(0, 212, 170, 0.2)",
                  }}
                >
                  {feature.highlight}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
