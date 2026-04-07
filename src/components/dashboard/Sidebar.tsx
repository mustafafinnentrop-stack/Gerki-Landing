"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Übersicht", href: "/dashboard", icon: "🏠" },
  { label: "KI-Chat", href: "/chat", icon: "💬" },
  { label: "Skills", href: "/dashboard/skills", icon: "⚡" },
  { label: "Agenten", href: "/dashboard/agenten", icon: "🤖" },
  { label: "Einstellungen", href: "/dashboard/einstellungen", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-surface border-r border-border h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-lg" />
          <span className="font-bold text-foreground">Gerki</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-surface-2"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
        >
          <span>🚪</span>
          Abmelden
        </button>
      </div>
    </aside>
  );
}
