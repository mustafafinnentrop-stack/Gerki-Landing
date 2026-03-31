"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was ist Gerki?",
    answer: "Gerki ist Ihr persönlicher KI-Assistent für den Büroalltag — mit 8 spezialisierten Agenten für Recht, Buchhaltung, HR, E-Mail, Marketing und mehr. Sie installieren Gerki einmal auf Ihrem Desktop und haben sofort Zugriff auf Assistenten, die Behördenpost verstehen, Verträge prüfen, Dokumente finden und Antworten vorbereiten."
  },
  {
    question: "Welche KI-Agenten sind in Gerki enthalten?",
    answer: "Je nach Plan stehen 2, 5 oder alle 8 Agenten zur Verfügung: Behördenpost-Assistent, Dokumente-Assistent, Rechtsberater, HR-Assistent, Buchhaltungs-Assistent, E-Mail-Manager, Marketing-Assistent und Vertriebsassistent. Jeder Agent ist auf seinen Bereich spezialisiert — kein generischer Chatbot."
  },
  {
    question: "Was unterscheidet Standard, Pro und Business?",
    answer: "Standard (39,90€) gibt Ihnen 2 Agenten für Behördenpost und Dokumente — ideal für Privatpersonen und Freelancer. Pro (59,90€) bringt 5 Agenten inkl. E-Mail-Manager, Rechtsberater, HR und Cloud-Sync — für Selbstständige und kleine Teams. Business (89,90€) schaltet alle 8 Agenten frei, erlaubt Top-KI-Modelle und unterstützt Teams."
  },
  {
    question: "Kann Gerki meine Dateien auf dem PC finden?",
    answer: "Ja — das ist eine der Kernfunktionen. Sie geben Gerki Zugriff auf bestimmte Ordner (z. B. Dokumente, Downloads). Gerki durchsucht diese Ordner, liest relevante Dateien und nutzt sie im Gespräch. Beispiel: 'Wo ist die Rechnung von der Hausverwaltung?' — Gerki findet sie."
  },
  {
    question: "Brauche ich Programmierkenntnisse?",
    answer: "Nein. Gerki ist für alle gemacht — nicht nur für Techniker. Sie installieren die App, richten Ihre Agenten per Klick ein und legen los. Keine Konfiguration, keine Kommandozeile, keine technischen Vorkenntnisse nötig."
  },
  {
    question: "Was sind Top-KI-Modelle und brauche ich die?",
    answer: "Im Standard- und Pro-Plan läuft Gerki ohne externe KI-Dienste — kein weiteres Abo nötig. Im Business-Plan können Sie optional Top-Modelle wie Claude (Anthropic) oder GPT-4 (OpenAI) für besonders komplexe Aufgaben zuschalten. Dafür benötigen Sie eigene API-Keys direkt beim Anbieter. Typische Kosten: 5–20€/Monat je nach Nutzung."
  },
  {
    question: "Was ist Desktop-Automatisierung (OpenClaw)?",
    answer: "OpenClaw ist Gerkis Automatisierungs-Engine: Sie kann Ihren Bildschirm lesen, Formulare ausfüllen, in Programmen klicken und Aufgaben selbstständig erledigen. Beispiel: Gerki füllt Ihr Elster-Formular automatisch aus — Sie müssen es nur noch absenden."
  },
  {
    question: "Was ist N8N und wann kommt die Integration?",
    answer: "N8N ist ein Automatisierungstool, das über 400 Apps verbindet. Die Gerki-Integration ermöglicht Automatisierungen per Sprache: 'Wenn ich eine neue Kundenanfrage per E-Mail bekomme, füge sie ins CRM ein.' Die Integration ist für Q3 2026 geplant und für alle Pläne verfügbar."
  },
  {
    question: "Welche Hardware brauche ich?",
    answer: "Gerki läuft auf jedem normalen Windows- oder Mac-Computer. Kein Server, keine spezielle Hardware. Als Richtwert: 8 GB RAM und eine moderne CPU reichen vollständig aus."
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer: "Ja. Alle Pläne sind monatlich kündbar — ohne Mindestlaufzeit. Nach dem 14-tägigen Trial läuft Ihr Abo monatlich, bis Sie es über das Dashboard kündigen. Einzelne Agenten können Sie auch ohne Kündigung des Gesamtplans deaktivieren."
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
