import Header from "@/components/dashboard/Header";

type Skill = {
  id: string;
  name: string;
  icon: string;
  category: string;
  price: number;
  badge: string | null;
  active: boolean;
  disabled?: boolean;
  features: string[];
};

const skills: Skill[] = [
  { id: "1", name: "Rechtsberater", icon: "🏛️", category: "Recht", price: 4900, badge: "BELIEBT", active: true, features: ["Vertragsanalyse", "Gesetzesrecherche", "Anwaltsbriefe"] },
  { id: "2", name: "Buchhaltung", icon: "📊", category: "Finanzen", price: 3900, badge: "NEU", active: true, features: ["Rechnungserstellung", "EÜR-Vorbereitung", "DATEV-Export"] },
  { id: "3", name: "Marketing", icon: "📱", category: "Marketing", price: 3900, badge: "NEU", active: true, features: ["Social Media", "Werbetexte", "SEO-Texte"] },
  { id: "4", name: "HR-Assistent", icon: "👥", category: "Personal", price: 3900, badge: null, active: false, features: ["Arbeitsverträge", "Urlaubsverwaltung", "Onboarding"] },
  { id: "5", name: "Vertrieb", icon: "💰", category: "Vertrieb", price: 4900, badge: "BELIEBT", active: false, features: ["Angebotserstellung", "CRM-Integration", "Pipeline-Analyse"] },
  { id: "6", name: "E-Mail-Manager", icon: "📧", category: "Kommunikation", price: 2900, badge: null, active: false, features: ["Antwortvorschläge", "Vorlagen", "Kategorisierung"] },
  { id: "7", name: "Einkauf & Beschaffung", icon: "🛒", category: "Einkauf", price: 3900, badge: "BALD", active: false, disabled: true, features: ["Lieferantenvergleich", "Bestelloptimierung"] },
  { id: "8", name: "Eventplanung", icon: "🎪", category: "Planung", price: 2900, badge: "BALD", active: false, disabled: true, features: ["Budgetkalkulation", "Checklisten"] },
];

const badgeColors: Record<string, string> = {
  NEU: "bg-accent/20 text-accent border-accent/30",
  BALD: "bg-muted/20 text-muted border-border",
  BELIEBT: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export default function SkillsPage() {
  const active = skills.filter((s) => s.active);
  const available = skills.filter((s) => !s.active && !s.disabled);
  const coming = skills.filter((s) => s.disabled);

  return (
    <div>
      <Header title="Skills" />
      <div className="p-6 max-w-5xl">
        <p className="text-muted text-sm mb-8">
          Erweitern Sie Ihre KI mit domänenspezifischen Fähigkeiten.
        </p>

        <Section title={`Aktive Skills (${active.length})`} skills={active} />
        <Section title="Verfügbare Skills" skills={available} />
        <Section title="Demnächst verfügbar" skills={coming} />
      </div>
    </div>
  );
}

function Section({ title, skills }: { title: string; skills: Skill[] }) {
  if (!skills.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`relative p-5 rounded-xl border ${
              skill.active
                ? "bg-primary/5 border-primary/30"
                : skill.disabled
                ? "bg-surface border-border opacity-60"
                : "bg-surface border-border hover:border-primary/20 transition-colors"
            }`}
          >
            {skill.active && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent font-medium">Aktiv</span>
              </div>
            )}
            {skill.badge && !skill.active && (
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeColors[skill.badge] ?? ""}`}>
                  {skill.badge}
                </span>
              </div>
            )}
            <div className="text-3xl mb-3">{skill.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{skill.name}</h3>
            <ul className="space-y-0.5 mb-3">
              {skill.features.slice(0, 3).map((f) => (
                <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted">{skill.category}</span>
              <span className="text-sm font-semibold text-foreground">
                {(skill.price / 100).toFixed(0)} €/Mo
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
