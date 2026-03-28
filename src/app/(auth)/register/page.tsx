"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        companyName: form.companyName,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registrierung fehlgeschlagen.");
      setLoading(false);
      return;
    }

    // Auto-login after registration
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    router.push("/dashboard");
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Konto erstellen</h1>
      <p className="text-muted text-sm mb-8">
        Starten Sie Ihre 14-tägige kostenlose Testphase.
      </p>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Ihr Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="Max Mustermann"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-1.5">
              Firmenname
            </label>
            <input
              id="companyName"
              type="text"
              required
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="Mustermann GmbH"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Geschäfts-E-Mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            placeholder="max@mustermann.de"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            placeholder="Mindestens 8 Zeichen"
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-foreground mb-1.5">
            Passwort bestätigen
          </label>
          <input
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            required
            value={form.passwordConfirm}
            onChange={(e) => update("passwordConfirm", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-light text-white font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Konto wird erstellt…" : "Kostenlos starten"}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted">oder</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mt-4 w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-border bg-surface-2 hover:bg-surface text-foreground font-medium text-sm transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.5z" fill="#4285F4"/>
          <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.3-8 2.3-6.1 0-11.3-4.1-13.1-9.7H2.7v6.2C6.7 42.8 14.8 48 24 48z" fill="#34A853"/>
          <path d="M10.9 28.8A14.4 14.4 0 0 1 10.9 19.2v-6.2H2.7A23.9 23.9 0 0 0 .5 24c0 3.9.9 7.5 2.2 10.8l8.2-6z" fill="#FBBC05"/>
          <path d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.5 30.4 0 24 0 14.8 0 6.7 5.2 2.7 13.2l8.2 6.2C12.7 13.6 17.9 9.5 24 9.5z" fill="#EA4335"/>
        </svg>
        Mit Google registrieren
      </button>

      <p className="mt-4 text-center text-xs text-muted">
        Mit der Registrierung stimmen Sie unseren{" "}
        <Link href="/agb" className="text-primary hover:text-primary-light transition-colors">AGB</Link>{" "}
        und der{" "}
        <Link href="/datenschutz" className="text-primary hover:text-primary-light transition-colors">Datenschutzerklärung</Link>{" "}
        zu.
      </p>

      <p className="mt-4 text-center text-sm text-muted">
        Bereits registriert?{" "}
        <Link href="/login" className="text-primary hover:text-primary-light transition-colors font-medium">
          Anmelden
        </Link>
      </p>
    </div>
  );
}
