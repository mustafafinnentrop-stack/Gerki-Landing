import { PrismaClient, SkillCategory, SkillBadge } from "@prisma/client";

const prisma = new PrismaClient();

const skills = [
  {
    slug: "behoerdenpost",
    name: "Behördenpost",
    icon: "🏛️",
    category: SkillCategory.KOMMUNIKATION,
    price: 499,
    badge: SkillBadge.BELIEBT,
    isActive: true,
    isFeatured: true,
    description: "Behördenbriefe analysieren, passende Nachweise auf dem PC finden und fertige Antwortmails erstellen – automatisch.",
    longDescription: "Der Behördenpost-Skill liest eingehende Schreiben von Ämtern und Behörden, erkennt was gefordert wird, durchsucht Ihren PC nach passenden Dokumenten und erstellt eine fertige Antwortmail mit den richtigen Anhängen.",
    features: JSON.stringify(["Behördenbrief-Analyse", "Automatische Dokumentensuche", "Fertige Antwortmail", "PDF-Brief erstellen", "Checkliste fehlender Nachweise"]),
    sortOrder: 1,
  },
  {
    slug: "dokumenten-assistent",
    name: "Dokumenten-Assistent",
    icon: "📂",
    category: SkillCategory.SONSTIGES,
    price: 499,
    badge: SkillBadge.NEU,
    isActive: true,
    isFeatured: true,
    description: "PC-Ordner automatisch durchsuchen, Dateien kategorisieren und das Richtige in Sekunden finden.",
    longDescription: "Der Dokumenten-Assistent indexiert Ihre Ordner, kategorisiert Dateien automatisch nach Typ und Inhalt und findet das Gesuchte in Sekunden – egal ob PDF, Word oder Bild.",
    features: JSON.stringify(["Ordner-Indexierung", "Automatische Kategorisierung", "Schnelle Suche", "Duplikate erkennen", "Inhalts-Vorschau"]),
    sortOrder: 2,
  },
  {
    slug: "rechtsberater",
    name: "Rechtsberater",
    icon: "⚖️",
    category: SkillCategory.RECHT,
    price: 4900,
    badge: SkillBadge.BELIEBT,
    isActive: true,
    isFeatured: true,
    description: "KI-gestützte Rechtsberatung – Vertragsanalyse, aktuelle Gesetzesänderungen und Anwaltsbriefe.",
    longDescription: "Der Rechtsberater-Skill gibt Ihrer KI umfangreiches Rechtswissen. Analysieren Sie Verträge, erhalten Sie Einschätzungen zu aktuellen Gesetzen und lassen Sie professionelle Anwaltsbriefe erstellen – rund um die Uhr.",
    features: JSON.stringify(["Vertragsanalyse", "Gesetzesrecherche", "Anwaltsbriefe erstellen", "DSGVO-Checks", "Arbeitsrechtliche Fragen"]),
    sortOrder: 3,
  },
  {
    slug: "buchhaltung",
    name: "Buchhaltung",
    icon: "📊",
    category: SkillCategory.FINANZEN,
    price: 3900,
    badge: SkillBadge.NEU,
    isActive: true,
    isFeatured: true,
    description: "Rechnungen, EÜR, Steuertermine, Belegprüfung – Belege aus Ihren Ordnern werden automatisch erkannt.",
    longDescription: "Automatisieren Sie Ihre Buchhaltungsprozesse mit KI. Erstellen Sie Rechnungen, prüfen Sie Belege, behalten Sie Steuertermine im Blick und exportieren Sie Daten für DATEV.",
    features: JSON.stringify(["Rechnungserstellung", "EÜR-Vorbereitung", "Belegprüfung", "Steuertermin-Erinnerungen", "DATEV-Export"]),
    sortOrder: 4,
  },
  {
    slug: "email-manager",
    name: "E-Mail-Manager",
    icon: "📧",
    category: SkillCategory.KOMMUNIKATION,
    price: 2900,
    badge: null,
    isActive: true,
    isFeatured: false,
    description: "Professionelle Antworten formulieren, Anhänge automatisch zuordnen und Korrespondenz kategorisieren.",
    longDescription: "Schreiben Sie professionelle E-Mails in Sekunden. Der E-Mail-Manager analysiert eingehende Nachrichten, schlägt passende Antworten vor und kategorisiert Ihre Korrespondenz automatisch.",
    features: JSON.stringify(["Antwortvorschläge", "Professionelle Formulierungen", "E-Mail-Kategorisierung", "Vorlagen-Bibliothek", "Mehrsprachig"]),
    sortOrder: 5,
  },
  {
    slug: "hr-assistent",
    name: "HR-Assistent",
    icon: "👥",
    category: SkillCategory.HR,
    price: 3900,
    badge: null,
    isActive: true,
    isFeatured: false,
    description: "Arbeitsverträge, Personalverwaltung, Krankmeldungen und Urlaubsplanung.",
    longDescription: "Optimieren Sie Ihre Personalverwaltung mit KI-Unterstützung. Von Arbeitsverträgen über Urlaubsplanung bis hin zur Krankmeldungsverwaltung.",
    features: JSON.stringify(["Arbeitsverträge", "Urlaubsverwaltung", "Krankmeldungen", "Onboarding-Checklisten", "Stellenausschreibungen"]),
    sortOrder: 6,
  },
  {
    slug: "marketing",
    name: "Marketing",
    icon: "📱",
    category: SkillCategory.MARKETING,
    price: 3900,
    badge: SkillBadge.NEU,
    isActive: true,
    isFeatured: true,
    description: "Social Media Content, Werbetexte, Kampagnenplanung und Performance-Analyse.",
    longDescription: "Erstellen Sie ansprechende Marketing-Inhalte mit KI-Unterstützung. Von Social Media Posts über Werbetexte bis hin zur kompletten Kampagnenplanung.",
    features: JSON.stringify(["Social Media Content", "Werbetexte", "SEO-Texte", "Kampagnenplanung", "Performance-Berichte"]),
    sortOrder: 7,
  },
  {
    slug: "eventplanung",
    name: "Eventplanung",
    icon: "🎪",
    category: SkillCategory.PLANUNG,
    price: 2900,
    badge: SkillBadge.BALD_VERFUEGBAR,
    isActive: false,
    isFeatured: false,
    description: "Kalkulation, Checklisten, Ablaufpläne und Lieferantenkoordination für Veranstaltungen.",
    longDescription: "Planen Sie Events effizienter mit KI-Unterstützung. Von der ersten Kalkulation über Checklisten bis hin zur Koordination aller Beteiligten.",
    features: JSON.stringify(["Budgetkalkulation", "Checklisten", "Ablaufpläne", "Lieferantenkoordination", "Nachbereitung"]),
    sortOrder: 8,
  },
];

async function main() {
  console.log("Seed-Daten werden eingefügt...");

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { slug: skill.slug },
      update: skill,
      create: skill,
    });
    console.log(`✓ Skill '${skill.name}' angelegt`);
  }

  console.log("\nSeed erfolgreich abgeschlossen!");
  console.log(`${skills.length} Skills eingefügt.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed-Fehler:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
