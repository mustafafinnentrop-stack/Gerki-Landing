export default function AGBPage() {
  return (
    <main className="min-h-screen py-24 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        <div className="space-y-6 text-sm" style={{ color: "var(--muted)", lineHeight: "1.8" }}>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>§ 1 Geltungsbereich</h2>
            <p>Diese Allgemeinen Geschäftsbedingungen (AGB) der Gerki GmbH gelten für alle Verträge über die Nutzung der Gerki-Plattform.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>§ 2 Vertragsgegenstand</h2>
            <p>Gerki stellt eine KI-Plattform als Software-as-a-Service (SaaS) zur Verfügung. Der Leistungsumfang richtet sich nach dem gewählten Tarif.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>§ 3 Laufzeit und Kündigung</h2>
            <p>Verträge werden auf unbestimmte Zeit geschlossen und können monatlich zum Ende des jeweiligen Kalendermonats gekündigt werden.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>§ 4 Preise und Zahlung</h2>
            <p>Die Preise richten sich nach dem aktuellen Preisverzeichnis. Die Abrechnung erfolgt monatlich im Voraus via Stripe.</p>
          </div>
          <p className="text-xs pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            * Platzhalter – bitte durch vollständige, rechtlich geprüfte AGB ersetzen.
          </p>
        </div>
      </div>
    </main>
  );
}
