const plans = [
  {
    name: "Standard",
    price: "39,90",
    period: "/Monat",
    description: "Dein persönlicher KI-Assistent — für Behördenpost, Dokumente und Alltagsfragen.",
    highlight: false,
    badge: null,
    features: [
      "2 spezialisierte KI-Agenten",
      "Behördenpost verstehen & beantworten",
      "Dokumente auf deinem PC finden",
      "Desktop-Automatisierung (OpenClaw)",
      "Standard Support",
    ],
    missing: [
      "E-Mail-Manager",
      "Cloud-Sync",
      "Top-KI-Modelle (Claude, GPT-4)",
    ],
    cta: "14 Tage kostenlos testen",
    ctaHref: "/register?plan=standard",
  },
  {
    name: "Pro",
    price: "59,90",
    period: "/Monat",
    description: "Wie ein Bürokollege, der nie Urlaub nimmt — für Selbstständige die wachsen wollen.",
    highlight: true,
    badge: "Empfohlen",
    features: [
      "5 spezialisierte KI-Agenten",
      "Alles aus Standard",
      "E-Mail-Manager",
      "Rechtsberater- & HR-Assistent",
      "Cloud-Sync (mehrere Geräte)",
      "E-Mail Support (48h)",
    ],
    missing: [
      "Top-KI-Modelle (Claude, GPT-4)",
      "Priority Support",
    ],
    cta: "14 Tage kostenlos testen",
    ctaHref: "/register?plan=pro",
  },
  {
    name: "Business",
    price: "89,90",
    period: "/Monat",
    description: "Das vollständige KI-Team für dein Unternehmen — Recht, HR, Buchhaltung, Marketing.",
    highlight: false,
    badge: null,
    features: [
      "Alle 8 KI-Agenten",
      "Alles aus Pro",
      "Top-KI-Modelle zuschaltbar (Claude, GPT-4)",
      "Buchhaltungs- & Marketing-Assistent",
      "Multi-User / Team-Accounts",
      "Priority Support (24h)",
    ],
    missing: [],
    cta: "14 Tage kostenlos testen",
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

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
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
                  <span className="text-5xl font-bold">{plan.price}€</span>
                  <span className="text-lg mb-1" style={{ color: "var(--muted)" }}>{plan.period}</span>
                </div>
                <p className="text-xs mt-1 font-medium" style={{ color: "var(--accent)" }}>
                  14 Tage kostenlos testen
                </p>
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

        {/* Add-on */}
        <div className="mt-6 px-6 py-4 rounded-xl text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>Add-on: 9,90€</span>{" "}
            pro extra Agent · monatlich kündbar
          </p>
        </div>

        <div className="mt-4 px-6 py-4 rounded-xl" style={{ background: "rgba(0, 212, 170, 0.05)", border: "1px solid rgba(0, 212, 170, 0.2)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--accent)" }}>Top-KI-Modelle im Business-Plan:</span>{" "}
            Claude & GPT-4 sind über Gerkis geteilten API-Zugang inklusive — kein eigenes Konto bei OpenAI oder Anthropic nötig. Token-Limits gelten pro Monat.
          </p>
        </div>
      </div>
    </section>
  );
}
