const problems = [
  "Ständig zwischen ChatGPT, Claude & Co. wechseln",
  "Kein KI-Tool kennt Ihre lokalen Dateien",
  "Sensible Daten gehen in die Cloud – DSGVO-Risiko",
  "Behördenbriefe, Formulare, Nachweise – alles manuell",
  "Jedes Gespräch beginnt wieder von vorne",
  "Keine Automatisierung ohne Programmierkenntnisse",
];

const solutions = [
  "Eine App für alle KI-Modelle – Claude, ChatGPT und mehr",
  "Greift direkt auf Ihre Ordner & Dateien zu",
  "Läuft lokal auf Ihrem PC – Ihre Daten bleiben bei Ihnen",
  "Findet Dokumente automatisch und schreibt Antworten",
  "Dauerhaftes Gedächtnis für all Ihre Informationen",
  "Einfach installieren wie jede andere App – in 2 Minuten",
];

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 px-6" id="problem-solution">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary-light)" }}>
            Warum Gerki?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            KI, die wirklich für Sie handelt
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Problem */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239, 68, 68, 0.15)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#ef4444" }}>
                Das Problem
              </h3>
            </div>
            <p className="mb-6" style={{ color: "var(--muted)" }}>
              KI-Tools sind überall – aber sie arbeiten alle gegeneinander statt zusammen:
            </p>
            <ul className="space-y-3">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm" style={{ color: "var(--foreground)" }}>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(29, 107, 243, 0.4)",
              boxShadow: "0 0 40px rgba(29, 107, 243, 0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0, 212, 170, 0.15)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="var(--accent)" strokeWidth="1.5" />
                  <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold gradient-text">
                Die Lösung – Gerki
              </h3>
            </div>
            <p className="mb-6" style={{ color: "var(--muted)" }}>
              Gerki ist eine Desktop-App, die alle KIs vereint und direkt mit Ihrem PC zusammenarbeitet:
            </p>
            <ul className="space-y-3">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                    <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm" style={{ color: "var(--foreground)" }}>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
