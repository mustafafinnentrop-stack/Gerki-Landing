import Header from "@/components/dashboard/Header";
import Link from "next/link";

const stats = [
  { label: "Aktive Skills", value: 3, icon: "⚡", href: "/dashboard/skills" },
  { label: "Agenten", value: 2, icon: "🤖", href: "/dashboard/agenten" },
  { label: "Dokumente", value: 12, icon: "📄", href: "#" },
  { label: "Offene Tickets", value: 0, icon: "🎫", href: "#" },
];

const quickActions = [
  {
    label: "Skills aktivieren",
    description: "Erweitern Sie Ihre KI-Fähigkeiten",
    href: "/dashboard/skills",
    icon: "⚡",
    color: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
  },
  {
    label: "Agenten konfigurieren",
    description: "KI-Agenten für Ihre Prozesse",
    href: "/dashboard/agenten",
    icon: "🤖",
    color: "from-accent/10 to-accent/5 border-accent/20",
  },
  {
    label: "Einstellungen",
    description: "Firmenprofil vervollständigen",
    href: "/dashboard/einstellungen",
    icon: "⚙️",
    color: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Header title="Übersicht" />

      <div className="p-6 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Willkommen, Max 👋
          </h2>
          <p className="text-muted mt-1">Mustermann GmbH · Plan: Pro</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
          Schnellzugriff
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}
