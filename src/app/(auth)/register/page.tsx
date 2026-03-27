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
