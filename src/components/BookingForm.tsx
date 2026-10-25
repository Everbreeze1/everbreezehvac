"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRight, Moon, Sun, Sunrise } from "lucide-react";
import { services } from "@/lib/services";
import { TIME_WINDOWS } from "@/lib/leads-shared";
import { site } from "@/lib/site";
import { submitLead } from "./submitLead";

function localDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Saturday hours are 9–4, so only the windows that fit inside them.
function windowsFor(day: Date, now: Date) {
  const isToday = localDate(day) === localDate(now);
  return TIME_WINDOWS.filter((w) => {
    if (day.getDay() === 6 && (w.start < 9 || w.start + 2 > 16)) return false;
    if (isToday && w.start <= now.getHours() + 1) return false;
    return true;
  });
}

// The next 14 days we can book, skipping Sundays and today once it's too late.
function bookableDays() {
  const now = new Date();
  const days: Date[] = [];
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  while (days.length < 14) {
    if (d.getDay() !== 0 && windowsFor(d, now).length > 0) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return { now, days };
}

// "8–10 AM", "10 AM–12 PM": short enough for two columns on a phone.
function shortWindow(start: number) {
  const end = start + 2;
  const h = (n: number) => (n % 12 === 0 ? 12 : n % 12);
  const ap = (n: number) => (n < 12 ? "AM" : "PM");
  return ap(start) === ap(end) ? `${h(start)}–${h(end)} ${ap(end)}` : `${h(start)} ${ap(start)}–${h(end)} ${ap(end)}`;
}

const noopSubscribe = () => () => {};

const PART_OF_DAY = (start: number) => (start < 12 ? { label: "Morning", Icon: Sunrise } : start < 16 ? { label: "Afternoon", Icon: Sun } : { label: "Evening", Icon: Moon });

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const router = useRouter();
  const [customerType, setCustomerType] = useState<"Residential" | "Commercial">("Residential");
  const [date, setDate] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Dates depend on the visitor's clock, so build them only in the browser.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const { now, days } = useMemo(() => (mounted ? bookableDays() : { now: new Date(0), days: [] as Date[] }), [mounted]);
  const selectedDay = days.find((d) => localDate(d) === date);
  const windows = selectedDay ? windowsFor(selectedDay, now) : [];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date || !arrival) {
      setError(date ? "Please choose an arrival window." : "Please choose a day.");
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
      appointmentDate: date,
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

      <fieldset className="min-w-0">
        <legend className="label">Pick a day</legend>
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pt-1 pb-3 sm:grid sm:grid-cols-7 sm:overflow-visible">
          {days.map((d) => {
            const value = localDate(d);
            const on = date === value;
            const isToday = value === localDate(now);
            return (
              <label
                key={value}
                className={`relative flex w-[4.5rem] shrink-0 cursor-pointer snap-start flex-col items-center rounded-xl border py-2.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand sm:w-auto ${
                  on ? "border-navy-900 bg-navy-900 text-white shadow-md" : "border-line bg-white hover:border-navy-900/40"
                }`}
              >
                <input
                  type="radio"
                  name="date"
                  value={value}
                  checked={on}
                  onChange={() => {
                    setDate(value);
                    if (!windowsFor(d, now).some((w) => w.label === arrival)) setArrival("");
                  }}
                  className="sr-only"
                />
                <span className={`text-[11px] font-bold tracking-wider uppercase ${on ? "text-brand" : "text-muted"}`}>
                  {isToday ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="font-display text-2xl leading-tight font-extrabold">{d.getDate()}</span>
                <span className={`text-xs ${on ? "text-white/70" : "text-muted"}`}>{d.toLocaleDateString("en-US", { month: "short" })}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Arrival window</legend>
        {selectedDay ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {windows.map((w) => {
              const on = arrival === w.label;
              const { label, Icon } = PART_OF_DAY(w.start);
              return (
                <label
                  key={w.label}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                    on ? "border-brand-dark bg-brand-50 ring-1 ring-brand-dark" : "border-line bg-white hover:border-brand-dark/50"
                  }`}
                >
                  <input type="radio" name="window" value={w.label} checked={on} onChange={() => setArrival(w.label)} className="sr-only" />
                  <Icon className={`h-5 w-5 shrink-0 ${on ? "text-brand-dark" : "text-muted"}`} aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold tracking-wider text-muted uppercase">{label}</span>
                    <span className="block text-sm font-semibold whitespace-nowrap">{shortWindow(w.start)}</span>
                  </span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-line px-4 py-5 text-center text-sm text-muted">Choose a day to see open times.</p>
        )}
      </fieldset>

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
