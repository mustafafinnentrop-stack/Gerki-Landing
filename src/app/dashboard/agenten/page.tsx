import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/dashboard/Header";

const agentTypeLabels: Record<string, string> = {
  ALLGEMEIN: "Allgemein",
  RECHTSBERATER: "Rechtsberater",
  BUCHHALTER: "Buchhalter",
  HR: "Personalwesen",
  MARKETING: "Marketing",
  VERTRIEB: "Vertrieb",
  EINKAUF: "Einkauf",
  SUPPORT: "Support",
  CUSTOM: "Individuell",
};

const agentTypeIcons: Record<string, string> = {
  ALLGEMEIN: "🤖",
  RECHTSBERATER: "🏛️",
  BUCHHALTER: "📊",
  HR: "👥",
  MARKETING: "📱",
  VERTRIEB: "💰",
  EINKAUF: "🛒",
  SUPPORT: "🎫",
  CUSTOM: "⚙️",
};

async function getAgents(userId: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { userId },
      include: { agents: { orderBy: { createdAt: "desc" } } },
    });
    return company?.agents ?? [];
  } catch {
    return [];
  }
}

export default async function AgentenPage() {
  const session = await getServerSession(authOptions);
  const agents = session?.user?.id ? await getAgents(session.user.id) : [];

  return (
    <div>
      <Header title="Agenten" />

      <div className="p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted text-sm">
            KI-Agenten arbeiten autonom in Ihrem Namen – spezialisiert auf Ihre
            Geschäftsprozesse.
          </p>
          <button
            disabled
            title="Kommt in der nächsten Version"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium opacity-50 cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Neuer Agent
          </button>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-xl">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="font-semibold text-foreground mb-2">Noch keine Agenten</h3>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Konfigurieren Sie KI-Agenten, die automatisch Aufgaben in Ihrem
              Unternehmen übernehmen.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto">
              {["RECHTSBERATER", "BUCHHALTER", "HR"].map((type) => (
                <div
                  key={type}
                  className="p-3 rounded-lg bg-surface-2 border border-border text-center"
                >
                  <div className="text-2xl mb-1">{agentTypeIcons[type]}</div>
                  <div className="text-xs text-muted">{agentTypeLabels[type]}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center text-xl flex-shrink-0">
                  {agentTypeIcons[agent.type] ?? "🤖"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">{agent.name}</div>
                  {agent.description && (
                    <div className="text-xs text-muted truncate">{agent.description}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {agentTypeLabels[agent.type] ?? agent.type}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      agent.status === "ACTIVE"
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-muted/10 text-muted border-border"
                    }`}
                  >
                    {agent.status === "ACTIVE" ? "Aktiv" : "Inaktiv"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info box */}
        <div className="mt-8 p-4 rounded-xl bg-surface border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Was sind Gerki-Agenten?</h4>
          <p className="text-xs text-muted leading-relaxed">
            Agenten sind spezialisierte KI-Instanzen, die auf Ihre Firmendaten und aktivierten
            Skills zugreifen. Sie können Aufgaben wie Vertragsanalyse, Rechnungsstellung oder
            Kundenkommunikation eigenständig übernehmen.
          </p>
        </div>
      </div>
    </div>
  );
}
