import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveplan } from "@/lib/getAuthUser";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

const PLAN_LABELS: Record<string, string> = {
  trial:    "Trial (14 Tage)",
  standard: "Standard",
  pro:      "Pro",
  business: "Business",
  expired:  "Abgelaufen",
};

async function getDashboardData(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      company: {
        include: { subscription: true },
      },
    },
  });
  return user;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email ? await getDashboardData(session.user.email) : null;

  const firstName = user?.name?.split(" ")[0] ?? "dort";
  const companyName = user?.company?.name ?? "Mein Unternehmen";
  const plan = resolveplan(user as Parameters<typeof resolveplan>[0]);
  const planLabel = PLAN_LABELS[plan] ?? plan;

  const isExpired = plan === "expired";

  const quickActions = [
    {
      label: "KI-Chat öffnen",
      description: "Direkt mit Gerki chatten",
      href: "/chat",
      icon: "💬",
      color: "from-accent/10 to-accent/5 border-accent/20",
    },
    {
      label: "Agenten ansehen",
      description: "Deine KI-Agenten verwalten",
      href: "/dashboard/agenten",
      icon: "🤖",
      color: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
    },
    {
      label: "Skills verwalten",
      description: "Agenten & Fähigkeiten",
      href: "/dashboard/skills",
      icon: "⚡",
      color: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
    },
    {
      label: "Einstellungen",
      description: "Profil & Firmendaten",
      href: "/dashboard/einstellungen",
      icon: "⚙️",
      color: "from-gray-500/10 to-gray-600/5 border-gray-500/20",
    },
  ];

  return (
    <div>
      <Header title="Übersicht" />
      <div className="p-6 max-w-5xl">

        {isExpired && (
          <div className="mb-6 px-5 py-4 rounded-xl border" style={{ background: "rgba(255,80,80,0.08)", borderColor: "rgba(255,80,80,0.3)" }}>
            <p className="text-sm font-semibold" style={{ color: "#ff5050" }}>Dein Trial ist abgelaufen.</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Wähle einen Plan um Gerki weiter zu nutzen.{" "}
              <Link href="/#pricing" className="underline" style={{ color: "var(--primary-light)" }}>Pläne ansehen →</Link>
            </p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Willkommen, {firstName} 👋
          </h2>
          <p className="text-muted mt-1">{companyName} · Plan: <span className="font-medium" style={{ color: "var(--accent)" }}>{planLabel}</span></p>
        </div>

        {/* Quick Actions */}
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
          Schnellzugriff
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`p-5 rounded-xl border bg-gradient-to-br ${action.color} hover:scale-[1.02] transition-transform`}
            >
              <div className="text-2xl mb-3">{action.icon}</div>
              <div className="font-semibold text-foreground text-sm">{action.label}</div>
              <div className="text-xs text-muted mt-1">{action.description}</div>
            </Link>
          ))}
        </div>

        {/* Plan info */}
        <div className="mt-8 p-5 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Dein aktueller Plan: {planLabel}</p>
              <p className="text-xs text-muted mt-0.5">
                {plan === "trial" && "14-Tage Trial — alle Basis-Funktionen inklusive"}
                {plan === "standard" && "2 KI-Agenten · Behördenpost & Dokumente"}
                {plan === "pro" && "5 KI-Agenten · inkl. E-Mail-Manager, Rechtsberater, HR · Cloud-Sync"}
                {plan === "business" && "Alle 8 KI-Agenten · Top-KI-Modelle · Priority Support"}
                {plan === "expired" && "Kein aktiver Plan — jetzt upgraden"}
              </p>
            </div>
            <Link
              href="/#pricing"
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ background: "var(--primary)", color: "white" }}
            >
              {plan === "business" ? "Plan verwalten" : "Upgraden"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
