import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Gerki – KI-Agenten für dein Büro | Made in Germany",
  description:
    "8 spezialisierte KI-Agenten für den deutschen Mittelstand. Verträge prüfen, Behördenpost verstehen, Rechnungen erstellen – kein eigener API-Key nötig. 14 Tage kostenlos testen.",
  keywords: [
    "KI Agenten",
    "KI Büro",
    "KI Mittelstand",
    "deutsche KI",
    "KI Assistent",
    "künstliche Intelligenz Firma",
    "KI Software Deutschland",
  ],
  openGraph: {
    title: "Gerki – KI-Agenten für dein Büro",
    description: "8 spezialisierte KI-Agenten für den deutschen Mittelstand. 14 Tage kostenlos testen.",
    type: "website",
    locale: "de_DE",
    siteName: "Gerki",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/gerki-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/gerki-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Gerki",
              applicationCategory: "BusinessApplication",
              description: "8 spezialisierte KI-Agenten für den deutschen Mittelstand. Kein eigener API-Key nötig.",
              operatingSystem: "Web, macOS, Windows",
              offers: [
                { "@type": "Offer", name: "Standard", price: "39.90", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Pro", price: "59.90", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Business", price: "89.90", priceCurrency: "EUR" },
              ],
              provider: { "@type": "Organization", name: "Gerki GmbH", addressCountry: "DE" },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
