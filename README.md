# Gerki – Deutsche KI-Plattform für den Mittelstand

Gerki ist eine modulare, DSGVO-konforme KI-Plattform für den deutschen Mittelstand.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + **PostgreSQL**
- **Stripe** (Abonnements & Skill-Käufe)
- **NextAuth.js** (Authentifizierung)

## Schnellstart

### 1. Dependencies installieren

```bash
npm install
```

### 2. Umgebungsvariablen konfigurieren

```bash
cp .env.example .env
```

Passen Sie die folgenden Variablen an:

| Variable | Beschreibung |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL-Verbindungsstring |
| `NEXTAUTH_SECRET` | Zufälliger String für NextAuth |
| `NEXTAUTH_URL` | App-URL (lokal: `http://localhost:3000`) |
| `STRIPE_SECRET_KEY` | Stripe Secret Key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret |

### 3. Datenbank einrichten

```bash
# Migrationen ausführen
npx prisma migrate dev --name init

# Beispiel-Daten einlesen
npx prisma db seed
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser.

## Projektstruktur

```
gerki/
├── prisma/
│   ├── schema.prisma          # Datenbankschema
│   └── seed.ts                # Beispieldaten (Skills)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landingpage
│   │   ├── layout.tsx         # Root Layout + SEO
│   │   ├── impressum/         # Impressum (Platzhalter)
│   │   ├── datenschutz/       # Datenschutz (Platzhalter)
│   │   └── agb/               # AGB (Platzhalter)
│   ├── components/
│   │   └── landing/           # Landingpage-Komponenten
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── ProblemSolutionSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── SkillsPreviewSection.tsx
│   │       ├── PricingSection.tsx
│   │       ├── TrustSection.tsx
│   │       ├── FAQSection.tsx
│   │       ├── DemoSection.tsx
│   │       ├── Footer.tsx
│   │       └── CookieBanner.tsx
│   └── lib/
│       └── utils.ts           # Hilfsfunktionen
└── .env                       # Umgebungsvariablen
```

## Datenbank-Schema

Das Schema enthält folgende Hauptmodelle:

- **User** – Kunden-Logins
- **Company** – Firmendaten, Plan, Setup-Status
- **Subscription** – Stripe-Abonnements
- **Skill** – Skills in der Bibliothek
- **CompanySkill** – Aktivierte Skills pro Firma
- **Document** – Hochgeladene Firmendokumente
- **Agent** – KI-Agenten pro Firma
- **SupportTicket** – Support-Tickets
- **Invoice** – Rechnungen via Stripe

## Nächste Schritte (Teil 2)

Nach Abnahme der Landingpage können folgende Bereiche implementiert werden:

1. **Kunden-Dashboard** – Self-Service Portal
2. **Skill-Bibliothek** – Marketplace im Dashboard
3. **Admin-Dashboard** – Betreiber-Verwaltung
4. **Stripe-Integration** – Echte Zahlungen
5. **NextAuth** – Login-System

## Produktionshinweise

- Ersetzen Sie alle Platzhalter-Daten (Impressum, Datenschutz, AGB)
- Generieren Sie ein sicheres `NEXTAUTH_SECRET`
- Konfigurieren Sie Stripe Webhooks
- Setzen Sie `NEXTAUTH_URL` auf Ihre Produktions-URL
- Aktivieren Sie HTTPS

---

© 2026 Gerki – Deutsche KI für den Mittelstand
