const plans = [
  {
    name: "Free",
    price: "0",
    period: "/Monat",
    description: "Starte sofort – keine Kreditkarte, kein API-Key nötig.",
    highlight: false,
    badge: null,
    features: [
      "Lokale KI mit Ollama (kostenlos)",
      "Mistral 7B – läuft auf deinem PC",
      "8 Skills inklusive",
      "Memory-System",
      "Datei-Indexierung & Suche",
      "Datei-Upload im Chat",
    ],
    missing: [
      "Claude (Anthropic) *",
      "ChatGPT / GPT-4 *",
    ],
    cta: "Kostenlos starten",
    ctaHref: "#download",
  },
  {
    name: "Pro",
    price: "49",
    period: "/Monat",
    description: "Für Profis, die das Beste aus mehreren KIs herausholen wollen.",
    highlight: true,
    badge: "Empfohlen",
    features: [
      "Alles aus Free",
      "Claude 3.5 Sonnet & Opus *",
      "ChatGPT / GPT-4 *",
      "KI-Agenten-System (Openclaw)",
      "Priorisierter Support",
      "Früher Zugang zu neuen Features",
    ],
    missing: [],
    cta: "Pro starten",
    ctaHref: "#demo",
  },
  {
    name: "Business",
    price: "99",
    period: "/Monat",
    description: "Für Teams und Unternehmen mit erweiterten Anforderungen.",
    highlight: false,
    badge: null,
    features: [
      "Alles aus Pro",
      "Bis 10 Nutzer",
      "Custom Skills auf Anfrage",
      "N8N-Automatisierungen (bald)",
      "Team-Wissensbasis",
      "Dedizierter Ansprechpartner",
      "SLA-Garantie",
      "DSGVO-Auftragsdatenvertrag",
    ],
    missing: [],
    cta: "Business anfragen",
    ctaHref: "#demo",
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
            Kostenlos starten. Pro werden.
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Gerki läuft lokal auf deinem PC – ohne Cloud, ohne API-Key.{" "}
            Claude & GPT-4 sind optional für Pro-Nutzer.
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
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold">{plan.price}€</span>
                  <span className="text-lg mb-1" style={{ color: "var(--muted)" }}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {plan.price === "0" ? "Für immer kostenlos" : "zzgl. MwSt. · Monatlich kündbar"}
                </p>
              </div>

              {/* Features included */}
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
                {/* Features not included */}
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

              {/* CTA */}
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

        {/* API cost disclaimer */}
        <div className="mt-8 px-6 py-4 rounded-xl" style={{ background: "rgba(255, 180, 0, 0.05)", border: "1px solid rgba(255, 180, 0, 0.2)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "rgba(255, 180, 0, 0.9)" }}>* Hinweis zu Claude & ChatGPT:</span>{" "}
            Für die Nutzung von Claude (Anthropic) und ChatGPT (OpenAI) benötigst du eigene API-Zugänge direkt bei den Anbietern.
            Diese Kosten sind <span className="font-semibold">nicht</span> im Gerki-Abo enthalten.
            Typische Kosten:{" "}
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>5–20€/Monat</span> je nach Nutzung.
            Die lokale KI (Ollama) ist hingegen komplett kostenlos und benötigt keinen API-Key.
          </p>
        </div>
      </div>
    </section>
  );
}
