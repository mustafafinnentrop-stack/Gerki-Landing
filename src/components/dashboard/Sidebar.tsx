"use client";

import { useState } from "react";
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

function NavItems({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
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
            onClick={onNavigate}
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
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ── Mobile top bar ───────────────────────────────── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 flex items-center px-4 gap-3 bg-surface border-b border-border">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
          aria-label="Menü öffnen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-lg" />
          <span className="font-bold text-foreground">Gerki</span>
        </Link>
      </div>

      {/* ── Mobile overlay backdrop ───────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────────── */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-surface border-r border-border transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <Link href="/" onClick={close} className="flex items-center gap-2.5">
            <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-foreground">Gerki</span>
          </Link>
          <button
            onClick={close}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
            aria-label="Menü schließen"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <NavItems pathname={pathname} onNavigate={close} />

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

      {/* ── Desktop sidebar ───────────────────────────────── */}
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col bg-surface border-r border-border h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/gerki-icon.svg" alt="Gerki" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-foreground">Gerki</span>
          </Link>
        </div>

        <NavItems pathname={pathname} />

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
    </>
  );
}
