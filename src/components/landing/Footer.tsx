import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/gerki-icon.svg" alt="Gerki" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-xl">Gerki</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Lokal. Privat. Intelligent. Kein Abo, keine Cloud, kein Tracking.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { name: "Twitter/X", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                  aria-label={social.name}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={social.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Produkt */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Produkt</h4>
            <ul className="space-y-2">
              {[
                { label: "Funktionen", href: "#features" },
                { label: "Skill-Bibliothek", href: "#skills" },
                { label: "Preise", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Demo anfordern", href: "#demo" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Unternehmen</h4>
            <ul className="space-y-2">
              {[
                { label: "Über uns", href: "/ueber-uns" },
                { label: "Blog", href: "/blog" },
                { label: "Karriere", href: "/karriere" },
                { label: "Partner werden", href: "/partner" },
                { label: "Presse", href: "/presse" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches & Kontakt */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Rechtliches & Kontakt</h4>
            <ul className="space-y-2">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB", href: "/agb" },
                { label: "Cookie-Einstellungen", href: "#cookies" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <a href="mailto:info@gerki.app" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="12" height="9" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 4l6 4 6-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                info@gerki.app
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            © {currentYear} Gerki – KI-Agenten für dein Büro.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              Alle Systeme betriebsbereit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
