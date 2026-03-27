"use client";

import { useState } from "react";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  company: {
    id: string;
    name: string;
    legalName: string | null;
    taxId: string | null;
    address: string | null;
    city: string | null;
    postalCode: string | null;
    phone: string | null;
    website: string | null;
    industry: string | null;
    employees: number | null;
  } | null;
}

export default function SettingsForm({ user }: { user: UserData | null }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const [company, setCompany] = useState({
    name: user?.company?.name ?? "",
    legalName: user?.company?.legalName ?? "",
    taxId: user?.company?.taxId ?? "",
    address: user?.company?.address ?? "",
    city: user?.company?.city ?? "",
    postalCode: user?.company?.postalCode ?? "",
    phone: user?.company?.phone ?? "",
    website: user?.company?.website ?? "",
    industry: user?.company?.industry ?? "",
    employees: user?.company?.employees?.toString() ?? "",
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          company: {
            ...company,
            employees: company.employees ? parseInt(company.employees) : null,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Speichern fehlgeschlagen.");
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Profile */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4 pb-3 border-b border-border">
          Mein Profil
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">E-Mail</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-muted text-sm cursor-not-allowed"
            />
            <p className="text-xs text-muted mt-1">E-Mail kann nicht geändert werden.</p>
          </div>
        </div>
      </section>

      {/* Company */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4 pb-3 border-b border-border">
          Firmendaten
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Firmenname *</label>
              <input
                type="text"
                required
                value={company.name}
                onChange={(e) => setCompany((c) => ({ ...c, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Mustermann GmbH"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Rechtsform</label>
              <input
                type="text"
                value={company.legalName}
                onChange={(e) => setCompany((c) => ({ ...c, legalName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="GmbH"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">USt-IdNr.</label>
              <input
                type="text"
                value={company.taxId}
                onChange={(e) => setCompany((c) => ({ ...c, taxId: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="DE123456789"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany((c) => ({ ...c, phone: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="+49 89 123456"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Straße & Hausnummer</label>
            <input
              type="text"
              value={company.address}
              onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="Musterstraße 1"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">PLZ</label>
              <input
                type="text"
                value={company.postalCode}
                onChange={(e) => setCompany((c) => ({ ...c, postalCode: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="80331"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">Stadt</label>
              <input
                type="text"
                value={company.city}
                onChange={(e) => setCompany((c) => ({ ...c, city: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="München"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Branche</label>
              <input
                type="text"
                value={company.industry}
                onChange={(e) => setCompany((c) => ({ ...c, industry: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Maschinenbau"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mitarbeiter</label>
              <input
                type="number"
                min="1"
                value={company.employees}
                onChange={(e) => setCompany((c) => ({ ...c, employees: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Website</label>
            <input
              type="url"
              value={company.website}
              onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="https://www.mustermann.de"
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-light text-white font-medium text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Wird gespeichert…" : "Änderungen speichern"}
        </button>
        {saved && (
          <span className="text-sm text-accent flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Gespeichert
          </span>
        )}
      </div>
    </form>
  );
}
