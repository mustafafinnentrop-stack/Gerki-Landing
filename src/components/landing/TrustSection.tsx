const trustBadges = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="26" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 15l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Desktop-App",
    description: "Installieren wie Word oder Chrome – kein Server, kein IT-Aufwand",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.51 7.51l2.83 2.83M21.66 21.66l2.83 2.83M7.51 24.49l2.83-2.83M21.66 10.34l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Claude + ChatGPT",
    description: "Alle führenden KI-Modelle in einer einzigen App vereint",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="26" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11V8a8 8 0 0116 0v3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="20" r="2" />
        <path d="M16 22v2" strokeLinecap="round" />
      </svg>
    ),
    title: "100% Datensouveränität",
    description: "Dateien bleiben auf Ihrem PC – nur Sie entscheiden was gesendet wird",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 3l11 5v9c0 6-5 11-11 14C10 28 5 23 5 17V8l11-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 16l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Made in Germany",
    description: "Entwickelt in Deutschland – für den deutschen Mittelstand",
  },
];

const testimonials = [
  {
    quote: "Ich musste nie wieder stundenlang Ordner durchsuchen. Gerki findet alles in Sekunden – und erklärt mir sofort was ich brauche.",
    author: "Klaus M.",
    role: "Rentner, Nürnberg",
    initials: "KM",
  },
  {
    quote: "Endlich muss ich nicht mehr zwischen ChatGPT und Claude wechseln. Gerki hat beides – und kennt meine Dateien.",
    author: "Sandra B.",
    role: "Selbstständige Designerin",
    initials: "SB",
  },
  {
    quote: "Der Behördenpost-Skill hat mir so viel Zeit gespart. Brief kommt rein, Gerki findet die Nachweise, Antwort ist fertig.",
    author: "Thomas K.",
    role: "Handwerksmeister, München",
    initials: "TK",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-6" id="trust">
      <div className="max-w-7xl mx-auto">
        {/* Trust Badges */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            Vertrauen & Sicherheit
          </p>
          <h2 className="text-4xl font-bold mb-4">
            Warum Menschen Gerki vertrauen
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(0, 212, 170, 0.1)", color: "var(--accent)" }}
              >
                {badge.icon}
              </div>
              <h3 className="font-bold mb-2">{badge.title}</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Kundenlogos Placeholder */}
        <div
          className="rounded-2xl p-8 mb-16 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-semibold mb-6" style={{ color: "var(--muted)" }}>
            Nutzen Gerki täglich:
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {["Privatpersonen", "Selbstständige", "Handwerksbetriebe", "Steuerberater", "Kleine Teams"].map((company) => (
              <div
                key={company}
                className="px-5 py-2.5 rounded-lg text-sm font-medium"
                style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                {company}
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
            * Kundennamen geändert
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                    <path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.7l4-.6L8 1.5z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
