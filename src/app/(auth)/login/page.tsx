"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-Mail oder Passwort falsch.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Anmelden</h1>
      <p className="text-muted text-sm mb-8">
        Willkommen zurück – melden Sie sich an.
      </p>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            placeholder="max@mustermann.de"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Passwort
            </label>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-light text-white font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Wird angemeldet…" : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Noch kein Konto?{" "}
        <Link href="/register" className="text-primary hover:text-primary-light transition-colors font-medium">
          Jetzt registrieren
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="bg-surface border border-border rounded-2xl p-8 animate-pulse h-96" />}>
      <LoginForm />
    </Suspense>
  );
}
