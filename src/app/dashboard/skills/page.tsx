import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveplan } from "@/lib/getAuthUser";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

// Which agents are included per plan
const PLAN_AGENTS: Record<string, number> = {
  trial: 2, standard: 2, pro: 5, business: 8, expired: 0,
};

type Agent = {
  id: string;
  name: string;
  icon: string;
  category: string;
  minPlan: "standard" | "pro" | "business";
  features: string[];
  comingSoon?: boolean;
};

const ALL_AGENTS: Agent[] = [
  { id: "behoerdenpost", name: "Behördenpost-Assistent", icon: "🏛️", category: "Verwaltung", minPlan: "standard", features: ["Bescheide verstehen", "Antworten vorbereiten", "Fristen erkennen"] },
  { id: "dokumente",     name: "Dokumenten-Assistent",   icon: "📄", category: "Verwaltung", minPlan: "standard", features: ["Dateien auf PC finden", "Inhalte zusammenfassen", "Vorlagen erstellen"] },
  { id: "email",        name: "E-Mail-Manager",          icon: "📧", category: "Kommunikation", minPlan: "pro",    features: ["Antwortvorschläge", "Vorlagen", "Priorisierung"] },
  { id: "rechtsberater",name: "Rechtsberater",           icon: "⚖️", category: "Recht",      minPlan: "pro",    features: ["Vertragsanalyse", "Gesetzesrecherche", "Anwaltsbriefe"] },
  { id: "hr",           name: "HR-Assistent",            icon: "👥", category: "Personal",   minPlan: "pro",    features: ["Arbeitsverträge", "Onboarding-Prozesse", "Urlaubsverwaltung"] },
  { id: "buchhaltung",  name: "Buchhaltungs-Assistent",  icon: "📊", category: "Finanzen",   minPlan: "business", features: ["Rechnungen erstellen", "EÜR-Vorbereitung", "Ausgaben kategorisieren"] },
  { id: "marketing",    name: "Marketing-Assistent",     icon: "📱", category: "Marketing",  minPlan: "business", features: ["Social-Media-Texte", "Werbetexte", "SEO-Inhalte"] },
  { id: "vertrieb",     name: "Vertriebs-Assistent",     icon: "💰", category: "Vertrieb",   minPlan: "business", features: ["Angebotserstellung", "CRM-Notizen", "Pipeline-Analyse"] },
];

const PLAN_ORDER = ["standard", "pro", "business"];

async function getUserPlan(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { company: { include: { subscription: true } } },
  });
  return resolveplan(user as Parameters<typeof resolveplan>[0]);
}

export default async function SkillsPage() {
  const session = await getServerSession(authOptions);
  const plan = session?.user?.email ? await getUserPlan(session.user.email) : "trial";
  const maxAgents = PLAN_AGENTS[plan] ?? 0;

  const included = ALL_AGENTS.slice(0, maxAgents);
  const locked = ALL_AGENTS.slice(maxAgents);

  const PLAN_LABELS: Record<string, string> = { standard: "Standard", pro: "Pro", business: "Business" };

  return (
    <div>
      <Header title="Agenten & Skills" />
      <div className="p-6 max-w-5xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-muted text-sm">
            Deine KI-Agenten — je nach Plan stehen dir 2, 5 oder alle 8 zur Verfügung.
          </p>
        </div>

        {/* Plan indicator */}
        <div className="mb-8 px-4 py-3 rounded-xl border flex items-center justify-between" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div>
            <span className="text-sm font-semibold text-foreground">Dein Plan: </span>
            <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{PLAN_LABELS[plan] ?? plan}</span>
            <span className="text-sm text-muted ml-2">· {maxAgents} von 8 Agenten aktiv</span>
          </div>
          {plan !== "business" && (
            <Link href="/#pricing" className="text-xs px-3 py-1.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "var(--primary)" }}>
              Upgraden →
            </Link>
          )}
        </div>

        {/* Included agents */}
        {included.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Im Plan enthalten ({included.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {included.map((agent) => (
                <div key={agent.id} className="relative p-5 rounded-xl border" style={{ background: "rgba(29,107,243,0.05)", borderColor: "rgba(29,107,243,0.3)" }}>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Aktiv</span>
                  </div>
                  <div className="text-3xl mb-3">{agent.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
                  <ul className="space-y-0.5 mb-3">
                    {agent.features.map((f) => (
                      <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                        <span style={{ color: "var(--accent)" }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-border">
                    <span className="text-xs text-muted">{agent.category}</span>
                    <span className="ml-2 text-xs font-medium" style={{ color: "var(--accent)" }}>Im Plan enthalten</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Locked agents */}
        {locked.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Mit Upgrade verfügbar ({locked.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locked.map((agent) => {
                const requiredPlan = PLAN_LABELS[agent.minPlan];
                const isNextPlan = PLAN_ORDER.indexOf(agent.minPlan) === PLAN_ORDER.indexOf(plan) + 1;
                return (
                  <div key={agent.id} className="relative p-5 rounded-xl border opacity-60" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2 py-0.5 rounded-full border font-medium" style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--muted)" }}>
                        🔒 {requiredPlan}
                      </span>
                    </div>
                    <div className="text-3xl mb-3 grayscale">{agent.icon}</div>
                    <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
                    <ul className="space-y-0.5 mb-3">
                      {agent.features.map((f) => (
                        <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                          <span>–</span> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted">{agent.category}</span>
                      {isNextPlan && (
                        <Link href="/#pricing" className="text-xs font-medium underline" style={{ color: "var(--primary-light)" }}>
                          Jetzt freischalten
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted mt-4">
              Extra-Agent hinzubuchen: <span className="font-semibold text-foreground">9,90€/Monat</span> pro Agent · jederzeit kündbar
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
