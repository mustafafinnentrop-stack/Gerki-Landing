const plans = [
  {
    name: "Trial",
    price: null,
    priceLine: "14 Tage kostenlos",
    period: "",
    description: "Alle Features testen — ohne Einschränkungen, ohne Kreditkarte.",
    highlight: false,
    badge: null,
    features: [
      "Alle 8 KI-Agenten",
      "Sprachassistent (Jarvis Mode)",
      "Morgen-Routine (Wetter, News, Kalender)",
      "OS-Vollzugriff (Apps, Dateien, Shell)",
      "Dateizugriff auf deinen PC",
      "100% lokal mit Ollama — offline & privat",
    ],
    missing: [],
    cta: "Jetzt kostenlos testen",
    ctaHref: "/register?plan=trial",
  },
  {
    name: "Standard",
    price: null,
    priceLine: "Demnächst",
    period: "",
    description: "Für Einzelunternehmer und Freelancer — mit erweitertem Support.",
    highlight: false,
    badge: null,
    features: [
      "Alles aus dem Trial",
      "Erweiterte Skills",
      "Priorität-Support",
      "100% lokal — keine Cloud",
    ],
    missing: [
      "Cloud-Konnektoren",
      "Team-Accounts",
    ],
    cta: "Auf Warteliste",
    ctaHref: "/register?plan=standard",
  },
  {
    name: "Pro",
    price: null,
    priceLine: "Demnächst",
    period: "",
    description: "Für wachsende Teams — alle Skills plus Cloud-Speicher-Anbindung.",
    highlight: true,
    badge: "Empfohlen",
    features: [
      "Alles aus Standard",
      "Alle Skills freigeschaltet",
      "Cloud-Konnektoren (Google Drive, OneDrive, Dropbox)",
      "Freiwilliges Opt-In — Sie entscheiden was synchronisiert wird",
    ],
    missing: [
      "Team-Accounts & Admin-Panel",
    ],
    cta: "Auf Warteliste",
    ctaHref: "/register?plan=pro",
  },
  {
    name: "Business",
    price: null,
    priceLine: "Demnächst",
    period: "",
    description: "Für Unternehmen mit mehreren Nutzern — Team-Features und Admin-Panel.",
    highlight: false,
    badge: null,
    features: [
      "Alles aus Pro",
      "Mehrere Nutzer-Accounts",
      "Admin-Panel & Rechteverwaltung",
      "Priority Support (24h)",
    ],
    missing: [],
    cta: "Auf Warteliste",
    ctaHref: "/register?plan=business",
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            Preise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            14 Tage kostenlos testen.
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Keine Einschränkungen im Trial. Danach automatisch zum gewählten Plan — jederzeit kündbar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-8 transition-all duration-300"
              style={{
                background: plan.highlight ? "var(--surface-2)" : "var(--surface)",
                border: plan.highlight
                  ? "2px solid var(--primary)"
                  : "1px solid var(--border)",
                boxShadow: plan.highlight ? "0 0 60px rgba(29, 107, 243, 0.2)" : "none",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className={`font-bold ${plan.price === null ? "text-2xl" : "text-5xl"}`}
                    style={{ color: plan.priceLine === "Demnächst" ? "var(--muted)" : "var(--foreground)" }}>
                    {plan.priceLine}
                  </span>
                </div>
                {plan.price === null && plan.priceLine !== "14 Tage kostenlos" && (
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    Monatlich abgerechnet · jederzeit kündbar
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm" style={{ color: "var(--foreground)" }}>{feature}</span>
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 opacity-40">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6L6 10M6 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm" style={{ color: "var(--muted)" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, #1d6bf3, #1557d0)",
                        color: "white",
                        boxShadow: "0 0 20px rgba(29, 107, 243, 0.3)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust-Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm" style={{ color: "var(--muted)" }}>
          {[
            { icon: "📅", text: "Monatlich kündbar" },
            { icon: "🔒", text: "Keine Mindestlaufzeit" },
            { icon: "💳", text: "Kündigung zum Monatsende" },
            { icon: "✅", text: "Keine versteckten Kosten" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 px-6 py-4 rounded-xl" style={{ background: "rgba(0, 212, 170, 0.05)", border: "1px solid rgba(0, 212, 170, 0.2)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--accent)" }}>100% lokal — deine Sicherheit:</span>{" "}
            Alle Pläne laufen auf deinem Rechner mit Ollama. Kein API-Key nötig, kein Cloud-Zwang. Deine Daten bleiben auf deinem Rechner — offline, sicher, schnell.
          </p>
        </div>
      </div>
    </section>
  );
}
