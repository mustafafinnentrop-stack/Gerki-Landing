"use client";

import { useEffect } from "react";

export default function AppAuthRedirect({ token }: { token: string }) {
  useEffect(() => {
    window.location.href = `gerki-app://auth?token=${token}`;
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-foreground mb-2">Zurück zur App…</h1>
        <p className="text-sm text-muted">Gerki wird geöffnet. Bitte warten.</p>
      </div>
    </div>
  );
}
