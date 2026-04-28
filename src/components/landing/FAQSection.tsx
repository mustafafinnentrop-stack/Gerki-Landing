"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was ist Gerki?",
    answer: "Gerki ist Ihr persönlicher KI-Assistent für den PC — lokal, privat, kein Cloud-Zwang. Er enthält 8 spezialisierte Agenten für Behördenpost, Dokumente, Recht, HR, Buchhaltung, E-Mail und Marketing. Zusätzlich gibt es einen Sprachassistenten (Jarvis Mode), eine Morgen-Routine (Wetter, News, Kalender), Dateizugriff auf Ihren PC und OS-Vollzugriff zum Steuern von Apps und Dateien — alles ohne Internet-Pflicht.",
  },
  {
    question: "Welche KI-Agenten sind in Gerki enthalten?",
    answer: "Gerki hat 8 spezialisierte Agenten: Allgemein-Assistent, Behördenpost-Assistent, Dokumenten-Assistent, Rechtsberater, Buchhaltungs-Assistent, E-Mail-Manager, HR-Assistent und Marketing-Assistent. Jeder Agent ist auf seinen Bereich spezialisiert — kein generischer Chatbot.",
  },
  {
    question: "Was unterscheidet Trial, Standard, Pro und Business?",
    answer: "Der 14-tägige Trial enthält alle Features mit Ollama lokal — kostenlos und ohne Einschränkungen. Standard schaltet erweiterte Skills und Priorität-Support frei. Pro fügt alle Skills sowie die Cloud-Konnektoren (Google Drive, OneDrive, Dropbox) hinzu. Business bringt Team-Features mit mehreren Nutzer-Accounts und einem Admin-Panel. Konkrete Preise werden in Kürze bekannt gegeben.",
  },
  {
    question: "Kann Gerki meine Dateien auf dem PC finden?",
    answer: "Ja — das ist eine der Kernfunktionen. Sie geben Gerki Zugriff auf bestimmte Ordner (z. B. Dokumente, Downloads). Gerki durchsucht diese Ordner, liest relevante Dateien und nutzt sie im Gespräch. Beispiel: 'Wo ist die Rechnung von der Hausverwaltung?' — Gerki findet sie.",
  },
  {
    question: "Brauche ich Programmierkenntnisse?",
    answer: "Nein. Gerki ist für alle gemacht — nicht nur für Techniker. Sie installieren die App, richten Ihre Agenten per Klick ein und legen los. Keine Konfiguration, keine Kommandozeile, keine technischen Vorkenntnisse nötig.",
  },
  {
    question: "Welche KI-Modelle unterstützt Gerki?",
    answer: "Gerki nutzt Ollama als KI-Engine — lokal auf Ihrem Rechner, kein Internet nötig, kein API-Key erforderlich. Unterstützte Modelle: Mistral 7B (4,1 GB, 8 GB RAM — Standard, schnell), Qwen 2.5 14B (8,7 GB, 16 GB RAM — gut für Deutsch & Dokumente), Phi-4 14B (8,9 GB, 16 GB RAM — komplexe Aufgaben), Llama 3.3 70B (43 GB, 32 GB RAM — beste Qualität). Beim ersten Start empfiehlt Gerki automatisch das passende Modell für Ihren Rechner.",
  },
  {
    question: "Was kann Gerki auf meinem PC alles steuern?",
    answer: "Gerki hat OS-Vollzugriff: Er kann Apps öffnen, URLs starten, Dateien und Ordner anlegen, verschieben, umbenennen und löschen sowie beliebige Shell-Befehle ausführen. Dabei gibt es ein 3-stufiges Sicherheitssystem: sichere Aktionen laufen ohne Dialog, mittlere Aktionen erfordern 1-Klick-Bestätigung, destruktive Aktionen (z. B. Löschen) zeigen einen Warn-Dialog — Sie haben immer die Kontrolle.",
  },
  {
    question: "Was ist der Sprachassistent (Jarvis Mode)?",
    answer: "Der Jarvis Mode ist ein Vollbild Voice-Interface mit animierter Gerki-Orb. Sie sprechen, Gerki versteht und antwortet per Stimme. TTS (Text-to-Sprache) läuft komplett lokal, deutsche und andere Stimmen sind wählbar. STT (Sprache-zu-Text) nutzt die Web Speech API des Browsers — Sie geben einmalig eine DSGVO-Einwilligung. Zwischen Voice Mode und Text Mode können Sie jederzeit wechseln.",
  },
  {
    question: "Was ist die Morgen-Routine?",
    answer: "Gerki begrüßt Sie jeden Morgen und liest automatisch vor: aktuelles Wetter (Temperatur, Bedingungen, Min/Max — via Open-Meteo, kein API-Key nötig), aktuelle Nachrichten (via RSS-Feeds, Standard: Tagesschau, eigene Feeds hinzufügbar) und Ihre heutigen Termine aus dem Kalender. Das Zeitfenster ist konfigurierbar (z. B. 6–11 Uhr) und läuft einmal pro Tag.",
  },
  {
    question: "Was ist N8N und wann kommt die Integration?",
    answer: "N8N ist ein Automatisierungstool, das über 400 Apps verbindet. Die Gerki-Integration ermöglicht Automatisierungen per Sprache: 'Wenn ich eine neue Kundenanfrage per E-Mail bekomme, füge sie ins CRM ein.' Die Integration ist für Q3 2026 geplant und für alle Pläne verfügbar.",
  },
  {
    question: "Welche Hardware brauche ich?",
    answer: "Gerki läuft auf jedem normalen Windows- oder Mac-Computer. Als Richtwert für die KI-Modelle: Mistral 7B benötigt 8 GB RAM und reicht für die meisten Aufgaben. Qwen 2.5 14B und Phi-4 14B brauchen 16 GB RAM für bessere Qualität bei Dokumenten und komplexen Fragen. Llama 3.3 70B liefert die beste Qualität, braucht aber 32 GB RAM. Kein Server, keine spezielle GPU nötig.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer: "Ja. Alle bezahlten Pläne sind monatlich kündbar — ohne Mindestlaufzeit. Nach dem 14-tägigen Trial läuft Ihr Abo monatlich, bis Sie es über das Dashboard kündigen.",
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
