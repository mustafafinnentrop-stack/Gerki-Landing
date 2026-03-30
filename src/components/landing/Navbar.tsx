"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 8, 15, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #1d6bf3, #00d4aa)" }}
          >
            G
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--foreground)" }}>
            Gerki
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Funktionen", href: "#features" },
            { label: "Skills", href: "#skills" },
            { label: "Preise", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "var(--muted)" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg transition-colors hover:text-white"
            style={{ color: "var(--muted)" }}
          >
            Anmelden
          </Link>
          <a
            href="https://github.com/mustafafinnentrop-stack/gerki-app/releases"
            className="text-sm px-5 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 flex items-center gap-1.5"
            style={{ background: "var(--primary)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm2.146-4.354a.5.5 0 01.708 0L7 8.293l2.146-2.147a.5.5 0 01.708.708l-2.5 2.5a.5.5 0 01-.708 0l-2.5-2.5a.5.5 0 010-.708z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M7 2a.5.5 0 01.5.5v6a.5.5 0 01-1 0v-6A.5.5 0 017 2z" clipRule="evenodd" />
            </svg>
            App herunterladen
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--muted)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          {[
            { label: "Funktionen", href: "#features" },
            { label: "Skills", href: "#skills" },
            { label: "Preise", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a key={item.href} href={item.href} className="py-2 text-sm" style={{ color: "var(--muted)" }} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/mustafafinnentrop-stack/gerki-app/releases"
            className="text-center text-sm px-5 py-2 rounded-lg font-medium text-white"
            style={{ background: "var(--primary)" }}
            onClick={() => setMobileOpen(false)}
          >
            App herunterladen
          </a>
        </div>
      )}
    </nav>
  );
}
