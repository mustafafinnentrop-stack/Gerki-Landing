import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Gerki – Lokale KI für den deutschen Mittelstand | DSGVO-konform",
  description:
    "Die deutsche KI-Plattform für den Mittelstand – DSGVO-konform, modular erweiterbar, auf Ihre Firmendaten trainiert. Lokale Installation, 100% Datensouveränität.",
  keywords: [
    "lokale KI",
    "DSGVO KI",
    "KI Mittelstand",
    "deutsche KI",
    "KI Unternehmen",
    "künstliche Intelligenz Firma",
  ],
  openGraph: {
    title: "Gerki – Lokale KI für den deutschen Mittelstand",
    description: "DSGVO-konforme KI-Plattform für den Mittelstand.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Gerki",
              applicationCategory: "BusinessApplication",
              description: "Modulare deutsche KI-Plattform für den Mittelstand – DSGVO-konform.",
              operatingSystem: "Web",
              offers: [
                { "@type": "Offer", name: "Basic", price: "299", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Pro", price: "799", priceCurrency: "EUR" },
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
