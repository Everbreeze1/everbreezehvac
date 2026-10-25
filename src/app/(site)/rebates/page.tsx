import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { CheckList, CtaBand, FaqList, SectionHeading } from "@/components/ui";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { rebateTiers, waterHeaterRebates } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMUD Heat Pump Rebates up to $3,000 | Everbreeze Heating And Air®",
  description: "Get up to $3,000 back from SMUD on a new heat pump. Everbreeze is a SMUD participating contractor and submits your rebate for you.",
  alternates: { canonical: "/rebates" },
};

const steps = [
  { title: "Free in-home consult", text: "We measure your home, check your ducts and electrical panel, and confirm which SMUD tier your project qualifies for." },
  { title: "Install to SMUD's spec", text: "We install qualifying high-efficiency equipment, sized correctly, so your rebate isn't denied on a technicality." },
  { title: "Paperwork prepared", text: "Invoices, model and serial numbers, permits and program forms are put together for you." },
  { title: "Rebate submitted and tracked", text: "We submit your application and follow it through to approval." },
];

const faqs = [
  { q: "Do I have to fill out any paperwork myself?", a: "No. As a SMUD participating contractor, we complete and submit your rebate application for you." },
  { q: "What if my system doesn't qualify?", a: "SMUD requires a two-stage (15.2 SEER2 minimum) or variable-speed heat pump. We'll tell you before any work begins whether your planned system qualifies." },
  { q: "Can I combine SMUD rebates with other incentives?", a: "Often, yes. SMUD rebates can usually be combined with other state and federal programs. We'll walk you through what applies to you." },
  { q: "Do rebate amounts change?", a: "Yes. SMUD updates rebate levels and funding from time to time. We'll confirm the current amount for your project during your consult." },
];

export default function RebatesPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgba(46,199,84,0.22),transparent)]" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow !text-brand">SMUD heat pump rebates</p>
            <h1 className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">Up to $3,000 back on a new heat pump</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              SMUD pays homeowners to switch to efficient, all-electric heat pumps. We&apos;re a SMUD participating contractor, so we install to spec and file the rebate for you.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <div className="rounded-lg bg-white p-2">
                <Image src="/images/badges/smud.webp" alt="SMUD participating contractor" width={500} height={279} className="h-14 w-auto" />
              </div>
              <Link href="/financing" className="text-sm font-bold text-brand underline underline-offset-4">Pair it with financing</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            <p className="eyebrow">What SMUD pays back</p>
            <ul className="mt-4 divide-y divide-line">
              {[
                { amount: "$3,000", what: "Gas furnace and AC to a heat pump" },
                { amount: "$1,600", what: "Gas to heat pump water heater" },
                { amount: "$1,000", what: "Electric to heat pump upgrades" },
              ].map((r) => (
                <li key={r.what} className="flex items-baseline gap-4 py-3">
                  <span className="w-24 shrink-0 font-display text-2xl font-extrabold text-brand-dark">{r.amount}</span>
                  <span className="text-sm font-semibold">{r.what}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">Maximum amounts. We confirm exactly what your home qualifies for at a free consult.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookButton service="Heat Pumps" className="btn-primary flex-1 !py-3.5 whitespace-nowrap">
                Check my rebate <ArrowRight className="h-4 w-4" aria-hidden />
              </BookButton>
              <a href={site.phoneHref} className="btn-outline flex-1 !py-3.5 whitespace-nowrap">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading center eyebrow="Rebate tiers" title="How much you can get back" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {rebateTiers.map((t) => (
              <div key={t.title} className="rounded-2xl border border-line p-7 text-center">
                <p className="font-display text-5xl font-extrabold text-brand-dark">{t.amount}</p>
                <h3 className="mt-3 font-bold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-3xl bg-navy-900 p-7 text-white sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow !text-brand">Heat pump water heaters</p>
              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">Up to $1,600 back on your water heater too</h3>
              <p className="mt-3 text-white/75">SMUD&apos;s biggest rebate right now is for swapping a gas water heater for a heat pump model. We install it and file the paperwork.</p>
              <Link href="/services/heat-pump-water-heaters" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
                About heat pump water heaters <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {waterHeaterRebates.map((t) => (
                <div key={t.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="font-display text-4xl font-extrabold text-brand">{t.amount}</p>
                  <h4 className="mt-2 font-bold">{t.title}</h4>
                  <p className="mt-1 text-sm text-white/70">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">Rebate amounts are set by SMUD and can change. We confirm the exact amount for your project before you commit.</p>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Ducted or ductless" title="Two ways to go electric" />
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-bold">Ducted heat pump</h3>
                <p className="mt-1 text-muted">One central system using your existing ductwork. Best for homes with ducts in good condition.</p>
              </div>
              <div>
                <h3 className="font-bold">Ductless mini-split</h3>
                <p className="mt-1 text-muted">Wall-mounted units with no ductwork. Great for additions, older homes and rooms that are always too hot or cold.</p>
              </div>
            </div>
            <CheckList className="mt-6" items={["2 to 3 times more efficient than a gas furnace", "Heating and cooling in one system", "No combustion, so no carbon monoxide risk", "Quiet, steady comfort"]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src="/images/ducted-heat-pump.webp" alt="Ducted heat pump with outdoor condenser and attic air handler" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src="/images/ductless-heat-pump.webp" alt="Wall-mounted ductless mini-split heat pump" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading center eyebrow="How it works" title="Four steps, and we do the paperwork" />
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 font-display font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading center title="Rebate questions, answered" />
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
          <p className="mt-6 text-center">
            <Link href="/services/heat-pumps" className="inline-flex items-center gap-1 font-bold text-brand-dark">
              More about heat pumps <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
      <CtaBand title="Ready to see what you qualify for?" text="Book a free in-home consult. No pressure, just real numbers." />
    </>
  );
}
