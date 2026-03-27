"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was ist Gerki?",
    answer: "Gerki ist eine Desktop-App, die Claude (Anthropic), ChatGPT (OpenAI) und lokalen Dateizugriff in einer einzigen Oberfläche vereint. Sie installieren Gerki wie jede andere App, verbinden Ihre KI-Konten und können sofort loslegen – mit Zugriff auf Ihre Dateien, Ordner und spezialisierten Skills."
  },
  {
    question: "Welche KI-Modelle unterstützt Gerki?",
    answer: "Gerki unterstützt aktuell Claude von Anthropic und ChatGPT von OpenAI. Sie benötigen eigene API-Schlüssel für die jeweiligen Dienste. Der Vorteil: Sie wählen für jede Aufgabe das beste Modell – und behalten volle Kontrolle über Kosten und Nutzung."
  },
  {
    question: "Kann Gerki meine Dateien auf dem PC lesen?",
    answer: "Ja – das ist eine der Kernfunktionen. Sie geben Gerki Zugriff auf bestimmte Ordner (z. B. Dokumente, Downloads). Gerki durchsucht diese Ordner, liest relevante Dateien und nutzt sie im Gespräch. Beispiel: Sie erhalten einen Behördenbrief, und Gerki findet automatisch die benötigten Nachweise auf Ihrem PC."
  },
  {
    question: "Wie sicher sind meine Daten?",
    answer: "Gerki läuft lokal auf Ihrem PC. Ihre Dateien werden nicht in die Cloud hochgeladen. Nur die Texte, die Sie aktiv an Claude oder ChatGPT schicken, verlassen Ihren PC – verschlüsselt über die offiziellen APIs der Anbieter. Sie entscheiden immer, was gesendet wird."
  },
  {
    question: "Brauche ich Programmierkenntnisse?",
    answer: "Nein. Gerki ist für alle gemacht – nicht nur für Techniker. Sie installieren die App, geben Ihre API-Schlüssel ein und legen los. Skills aktivieren Sie per Klick. Keine Konfiguration, keine Kommandozeile."
  },
  {
    question: "Was ist ein API-Schlüssel und wo bekomme ich ihn?",
    answer: "Ein API-Schlüssel ist ein persönliches Passwort, das Sie bei Anthropic (für Claude) oder OpenAI (für ChatGPT) kostenlos erstellen können. Gerki führt Sie beim ersten Start durch den Prozess. Kosten entstehen nur durch Ihre direkte Nutzung der KI-Dienste."
  },
  {
    question: "Was kostet die Nutzung von Claude und ChatGPT – ist das im Abo enthalten?",
    answer: "Nein – das Gerki-Abo deckt die App selbst, die Skills und den Support ab. Die KI-Modelle (Claude von Anthropic, ChatGPT von OpenAI) werden über Ihre eigenen API-Zugänge direkt beim jeweiligen Anbieter abgerechnet. Typische Kosten: 5–20€/Monat je nach Nutzungsintensität. Bei leichter Nutzung oft unter 5€. Gerki vermittelt keine KI-Zugänge und erhält keine Provision. Dieser Hinweis findet sich auch bei allen Preisplänen mit einem *."
  },
  {
    question: "Was ist N8N und wann kommt die Integration?",
    answer: "N8N ist ein Open-Source-Automatisierungstool, das über 400 Apps und Dienste verbindet – ähnlich wie Zapier, aber lokal auf Ihrem PC. Die Gerki-N8N-Integration (in Entwicklung) ermöglicht es Ihnen, per Sprache Automatisierungen zu erstellen: z.B. 'Wenn ich eine neue Kundenanfrage per E-Mail bekomme, füge sie automatisch in mein CRM ein.' Da N8N lokal läuft, bleiben alle Daten auf Ihrem PC. Die Integration ist für Q3 2026 geplant und wird für Pro- und Business-Kunden verfügbar sein."
  },
  {
    question: "Welche Hardware brauche ich?",
    answer: "Gerki läuft auf jedem normalen Windows- oder Mac-Computer. Keine Server, keine spezielle Hardware. Als Richtwert: ein PC mit 8 GB RAM und moderner CPU reicht vollständig aus. Gerki ist als leichte Desktop-App konzipiert."
  },
  {
    question: "Kann ich Skills jederzeit dazu- oder abbuchen?",
    answer: "Ja. Skills können Sie jederzeit über das Gerki-Dashboard aktivieren oder deaktivieren – ohne Neuinstallation. Die Abrechnung erfolgt monatlich und wird automatisch angepasst. Keine Mindestlaufzeit für einzelne Skills."
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Häufige Fragen
          </h2>
          <p className="text-xl" style={{ color: "var(--muted)" }}>
            Alles was Sie über Gerki und die Desktop-App wissen müssen.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: openIndex === index ? "1px solid rgba(29, 107, 243, 0.4)" : "1px solid var(--border)",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/5"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium pr-4" style={{ color: "var(--foreground)" }}>
                  {faq.question}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 transition-transform duration-200"
                  style={{
                    color: "var(--muted)",
                    transform: openIndex === index ? "rotate(180deg)" : "none",
                  }}
                >
                  <path d="M4 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Weitere Fragen?{" "}
            <a href="#demo" className="underline transition-colors" style={{ color: "var(--primary-light)" }}>
              Kontaktieren Sie uns direkt
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
