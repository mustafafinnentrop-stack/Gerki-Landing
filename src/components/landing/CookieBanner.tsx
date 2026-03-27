"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("gerki-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("gerki-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("gerki-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl p-5 shadow-2xl"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl shrink-0">🍪</span>
        <div>
          <h3 className="font-semibold text-sm mb-1">Cookie-Einstellungen</h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und die Website-Nutzung zu analysieren. Gemäß DSGVO benötigen wir Ihre Einwilligung.{" "}
            <a href="/datenschutz" className="underline" style={{ color: "var(--primary-light)" }}>
              Mehr erfahren
            </a>
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={decline}
          className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/10"
          style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
        >
          Ablehnen
        </button>
        <button
          onClick={accept}
          className="flex-1 py-2 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
