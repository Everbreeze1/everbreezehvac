"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { TIME_WINDOWS } from "@/lib/leads-shared";
import { site } from "@/lib/site";
import { submitLead } from "./submitLead";

function localDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const router = useRouter();
  const [customerType, setCustomerType] = useState<"Residential" | "Commercial">("Residential");
  const [arrival, setArrival] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { minDate, maxDate } = useMemo(() => {
    const now = new Date();
    const max = new Date(now);
    max.setDate(max.getDate() + 60);
    return { minDate: localDate(now), maxDate: localDate(max) };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!arrival) {
      setError("Please choose an arrival window.");
      return;
    }
    setBusy(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const err = await submitLead({
      kind: "booking",
      customerType,
      company: customerType === "Commercial" ? f.get("company") : undefined,
      firstName: f.get("firstName"),
      lastName: f.get("lastName"),
      phone: f.get("phone"),
      email: f.get("email"),
      address: f.get("address"),
      city: f.get("city"),
      zip: f.get("zip"),
      service: f.get("service"),
      message: f.get("message") || undefined,
      appointmentDate: f.get("date"),
      appointmentWindow: arrival,
      smsConsent: f.get("smsConsent") === "on",
      website: f.get("website"),
    });
    if (err) {
      setError(err);
      setBusy(false);
      return;
    }
    router.push("/thank-you?booked=1");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset>
        <legend className="label">This is for a</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["Residential", "Commercial"] as const).map((t) => (
            <label key={t} className={`cursor-pointer rounded-lg border px-4 py-3 text-center font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${customerType === t ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white"}`}>
              <input type="radio" name="customerType" value={t} checked={customerType === t} onChange={() => setCustomerType(t)} className="sr-only" />
              {t === "Residential" ? "Home" : "Business"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        {customerType === "Commercial" && (
          <div className="sm:col-span-2">
            <label htmlFor="b-company" className="label">Business name</label>
            <input id="b-company" name="company" required autoComplete="organization" className="field" />
          </div>
        )}
        <div>
          <label htmlFor="b-first" className="label">First name</label>
          <input id="b-first" name="firstName" required autoComplete="given-name" className="field" />
        </div>
        <div>
          <label htmlFor="b-last" className="label">Last name</label>
          <input id="b-last" name="lastName" required autoComplete="family-name" className="field" />
        </div>
        <div>
          <label htmlFor="b-phone" className="label">Phone</label>
          <input id="b-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="field" />
        </div>
        <div>
          <label htmlFor="b-email" className="label">Email</label>
          <input id="b-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-address" className="label">Service address</label>
          <input id="b-address" name="address" required autoComplete="street-address" className="field" />
        </div>
        <div>
          <label htmlFor="b-city" className="label">City</label>
          <input id="b-city" name="city" required autoComplete="address-level2" className="field" defaultValue="Sacramento" />
        </div>
        <div>
          <label htmlFor="b-zip" className="label">ZIP</label>
          <input id="b-zip" name="zip" required autoComplete="postal-code" inputMode="numeric" pattern="\d{5}" maxLength={5} className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-service" className="label">Service needed</label>
          <select id="b-service" name="service" required defaultValue={defaultService ?? ""} className="field">
            <option value="" disabled>Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Not sure">Not sure / something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-message" className="label">
            What&apos;s going on? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id="b-message" name="message" rows={3} className="field" placeholder="System age, symptoms, anything we should know" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[14rem_1fr]">
        <div>
          <label htmlFor="b-date" className="label">Preferred date</label>
          <input id="b-date" name="date" type="date" required min={minDate} max={maxDate} className="field" />
        </div>
        <fieldset>
          <legend className="label">Arrival window</legend>
          <div className="flex flex-wrap gap-2">
            {TIME_WINDOWS.map((w) => (
              <label key={w.label} className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${arrival === w.label ? "border-brand-dark bg-brand-50 text-brand-dark" : "border-line bg-white"}`}>
                <input type="radio" name="window" value={w.label} checked={arrival === w.label} onChange={() => setArrival(w.label)} className="sr-only" />
                {w.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input type="checkbox" name="smsConsent" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand-dark)]" />
        <span>
          I agree to receive communications from {site.name} about my inquiry, appointment scheduling, reminders, and service updates. Message
          frequency may vary. Message and data rates may apply. Reply HELP for help or STOP to cancel. Consent is not a condition of purchase. See our{" "}
          <Link href="/privacy-policy.html" className="font-semibold text-brand-dark underline">Privacy Policy</Link> and{" "}
          <Link href="/terms-and-conditions.html" className="font-semibold text-brand-dark underline">Terms &amp; Conditions</Link>.
        </span>
      </label>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="b-website">Website</label>
        <input id="b-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full !py-4 text-base disabled:opacity-60 sm:w-auto sm:px-10">
        {busy ? "Sending…" : "Request this appointment"} {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
      </button>
      <p className="text-xs text-muted">We&apos;ll call to confirm your time. Need help sooner? Call {site.phone}.</p>
    </form>
  );
}
