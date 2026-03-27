export default function ImpressumPage() {
  return (
    <main className="min-h-screen py-24 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        <div className="space-y-6 text-sm" style={{ color: "var(--muted)", lineHeight: "1.8" }}>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Angaben gemäß § 5 TMG</h2>
            <p>Gerki GmbH<br />Musterstraße 1<br />12345 Musterstadt<br />Deutschland</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Kontakt</h2>
            <p>Telefon: +49 (0) 800 000 000<br />E-Mail: info@gerki.de</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Handelsregister</h2>
            <p>Registergericht: Amtsgericht Musterstadt<br />Registernummer: HRB 000000</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE000000000</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>Vertreten durch</h2>
            <p>Geschäftsführer: [Name einsetzen]</p>
          </div>
          <p className="text-xs pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            * Platzhalter – bitte mit echten Daten befüllen.
          </p>
        </div>
      </div>
    </main>
  );
}
