export default function DatenschutzPage() {
  return (
    <main className="min-h-screen py-24 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="space-y-6 text-sm" style={{ color: "var(--muted)", lineHeight: "1.8" }}>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>1. Datenschutz auf einen Blick</h2>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>2. Verantwortliche Stelle</h2>
            <p>Gerki GmbH, Musterstraße 1, 12345 Musterstadt. E-Mail: datenschutz@gerki.de</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>3. Datenerfassung auf dieser Website</h2>
            <p>Wir erfassen nur die Daten, die Sie uns aktiv mitteilen (z.B. über das Demo-Anforderungsformular). Wir verwenden keine Tracking-Cookies ohne Ihre Einwilligung.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>4. Ihre Rechte</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an: datenschutz@gerki.de</p>
          </div>
          <p className="text-xs pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            * Platzhalter – bitte durch vollständige DSGVO-konforme Datenschutzerklärung ersetzen.
          </p>
        </div>
      </div>
    </main>
  );
}
