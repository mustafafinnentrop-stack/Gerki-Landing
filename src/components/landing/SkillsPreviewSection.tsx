"use client";

const skills = [
  {
    icon: "🏛️",
    name: "Behördenpost",
    description: "Behördenbriefe analysieren, passende Nachweise auf dem PC finden und fertige Antwortmails erstellen – automatisch.",
    category: "Alltag",
    badge: "Beliebt",
    badgeColor: "#1d6bf3",
  },
  {
    icon: "📂",
    name: "Dokumenten-Assistent",
    description: "PC-Ordner automatisch durchsuchen, Dateien kategorisieren und das Richtige in Sekunden finden.",
    category: "Dateiverwaltung",
    badge: "Neu",
    badgeColor: "var(--accent)",
  },
  {
    icon: "📧",
    name: "E-Mail-Manager",
    description: "Professionelle Antworten formulieren, Anhänge automatisch zuordnen und Korrespondenz kategorisieren.",
    category: "Kommunikation",
    badge: null,
    badgeColor: null,
  },
  {
    icon: "🏛️",
    name: "Rechtsberater",
    description: "Verträge analysieren, Anwaltsbriefe verstehen, aktuelle Gesetzesänderungen im Blick behalten.",
    category: "Recht",
    badge: null,
    badgeColor: null,
  },
  {
    icon: "📊",
    name: "Buchhaltung",
    description: "Rechnungen, EÜR, Steuertermine, Belegprüfung – Belege aus Ihren Ordnern werden automatisch erkannt.",
    category: "Finanzen",
    badge: null,
    badgeColor: null,
  },
  {
    icon: "👥",
    name: "HR-Assistent",
    description: "Arbeitsverträge, Personalverwaltung, Krankmeldungen und Urlaubsplanung mit Zugriff auf Personalakten.",
    category: "Personal",
    badge: null,
    badgeColor: null,
  },
  {
    icon: "📱",
    name: "Marketing",
    description: "Social Media Content, Werbetexte, Kampagnenplanung und Performance-Analyse auf Knopfdruck.",
    category: "Marketing",
    badge: "Neu",
    badgeColor: "var(--accent)",
  },
  {
    icon: "🎪",
    name: "Eventplanung",
    description: "Kalkulation, Checklisten, Ablaufpläne und Lieferantenkoordination für Veranstaltungen.",
    category: "Planung",
    badge: "Bald verfügbar",
    badgeColor: "var(--muted)",
  },
];

export default function SkillsPreviewSection() {
  return (
    <section className="py-24 px-6" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            Skill-Bibliothek
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills für jede Aufgabe
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-3" style={{ color: "var(--muted)" }}>
            Erweitern Sie Gerki mit spezialisierten Fähigkeiten – von Behördenpost bis Buchhaltung. Wie ein App Store für KI.
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            Einzelne Skills ab 4,99€/Monat zubuchbar
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group p-5 rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29, 107, 243, 0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(29, 107, 243, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Icon & Badge row */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{skill.icon}</span>
                {skill.badge && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: skill.badge === "Bald verfügbar"
                        ? "rgba(122, 139, 168, 0.15)"
                        : skill.badge === "Neu"
                        ? "rgba(0, 212, 170, 0.15)"
                        : "rgba(29, 107, 243, 0.15)",
                      color: skill.badgeColor || "var(--muted)",
                      border: `1px solid ${skill.badge === "Bald verfügbar" ? "rgba(122, 139, 168, 0.3)" : skill.badge === "Neu" ? "rgba(0, 212, 170, 0.3)" : "rgba(29, 107, 243, 0.3)"}`,
                    }}
                  >
                    {skill.badge}
                  </span>
                )}
              </div>

              {/* Category label */}
              <p className="text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                {skill.category}
              </p>

              {/* Name */}
              <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {skill.description}
              </p>

              {/* Link */}
              <a
                href="#pricing"
                className="text-xs font-semibold flex items-center gap-1 transition-colors hover:gap-2"
                style={{ color: skill.badge === "Bald verfügbar" ? "var(--muted)" : "var(--primary-light)" }}
              >
                {skill.badge === "Bald verfügbar" ? "Benachrichtigen" : "Mehr erfahren"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* More skills hint */}
        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Und viele weitere Skills in Entwicklung –{" "}
            <a href="#demo" className="underline" style={{ color: "var(--primary-light)" }}>
              eigenen Skill anfragen
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
