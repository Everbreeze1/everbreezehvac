"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { services } from "@/lib/services";
import { submitLead } from "./submitLead";

export function QuoteForm({ defaultService, title = "Get help today", subtitle }: { defaultService?: string; title?: string; subtitle?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const [firstName, ...rest] = String(f.get("name") ?? "").trim().split(/\s+/);
    const err = await submitLead({
      kind: "quote",
      firstName,
      lastName: rest.join(" ") || undefined,
      phone: f.get("phone"),
      zip: f.get("zip"),
      service: f.get("service"),
      message: f.get("message") || undefined,
      website: f.get("website"),
    });
    if (err) {
      setError(err);
      setBusy(false);
      return;
    }
    router.push("/thank-you");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 text-ink shadow-xl ring-1 ring-line sm:p-7">
      <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-muted">{subtitle ?? "Tell us what's going on. We'll call you back fast, usually within the hour during business hours."}</p>
      <div className="mt-5 grid gap-3">
        <div>
          <label htmlFor="q-name" className="label">Your name</label>
          <input id="q-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <div>
            <label htmlFor="q-phone" className="label">Phone</label>
            <input id="q-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
          </div>
          <div>
            <label htmlFor="q-zip" className="label">ZIP</label>
            <input id="q-zip" name="zip" required autoComplete="postal-code" inputMode="numeric" pattern="\d{5}" maxLength={5} className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="q-service" className="label">What do you need?</label>
          <select id="q-service" name="service" defaultValue={defaultService ?? ""} required className="field">
            <option value="" disabled>Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Not sure">Not sure / something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="q-message" className="label">
            Details <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id="q-message" name="message" rows={2} className="field" placeholder="e.g. AC is blowing warm air" />
        </div>
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="q-website">Website</label>
          <input id="q-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary mt-1 w-full !py-3.5 disabled:opacity-60">
          {busy ? "Sending…" : "Request a call back"} {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <Lock className="h-3 w-3" aria-hidden /> No spam. We only use this to contact you about your request.
        </p>
      </div>
    </form>
  );
}
