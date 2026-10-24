import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock, ClipboardCheck, PhoneCall, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { CtaBand, FaqList, LogoStrip, SectionHeading, ServiceCard } from "@/components/ui";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { generalFaqs, rebateTiers } from "@/lib/faqs";
import { services } from "@/lib/services";
import { site, workPhotos } from "@/lib/site";

export const revalidate = 21600;

const promises = [
  { icon: BadgeDollarSign, title: "Upfront pricing", text: "You approve the price before any work starts. No surprise line items." },
  { icon: Clock, title: "24/7 emergency service", text: "AC out in a heat wave? Furnace dead on a cold night? Call any time." },
  { icon: ShieldCheck, title: "Licensed & insured", text: "Background-checked technicians who treat your home with respect." },
  { icon: Sparkles, title: "SMUD rebates handled", text: "As a SMUD participating contractor, we file the paperwork for you." },
];

const steps = [
  { icon: PhoneCall, title: "Call or book online", text: "Tell us what's going on and pick a time that works for you." },
  { icon: ClipboardCheck, title: "Get a clear diagnosis", text: "We find the real problem and give you options with upfront prices." },
  { icon: Wrench, title: "Fixed right, cleaned up", text: "We do the work you approved, test everything, and leave your home clean." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(generalFaqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <Image src="/images/sacramento.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="eyebrow !text-brand">Sacramento heating &amp; air conditioning</p>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
              Fast, honest HVAC service for <span className="text-brand">Sacramento</span> homes.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              AC repair, furnace service and heat pump installs from licensed technicians. Upfront prices, 24/7 emergency help, and SMUD rebates handled for you.
            </p>
            <div className="mt-6">
              <RatingBadge dark />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary !px-7 !py-4 text-base">
                <PhoneCall className="h-5 w-5" aria-hidden /> Call {site.phone}
              </a>
              <Link href="/book" className="btn-ghost-light !px-7 !py-4 text-base">
                Book online <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/85">
              {["Upfront pricing", "24/7 emergency service", "SMUD participating contractor", "Financing available"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div id="quote" className="scroll-mt-28">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-b border-line bg-white py-10">
        <div className="container-page">
          <p className="mb-6 text-center text-sm font-semibold text-muted">Trusted by Sacramento homeowners, property managers and businesses</p>
          <LogoStrip kind="clients" />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Services" title="Everything your heating and cooling needs" intro="Repairs, replacements and maintenance for every major brand, for homes and businesses." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
            <Link href="/book" className="flex flex-col justify-between rounded-2xl bg-navy-900 p-6 text-white transition hover:bg-navy-800">
              <div>
                <h3 className="text-lg font-bold">Not sure what you need?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">Describe the problem and we&apos;ll figure it out together.</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                Book a visit <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SMUD rebates */}
      <section className="bg-navy-900 py-16 text-white sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-brand">SMUD heat pump rebates</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Get up to $3,000 back on a new heat pump</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              SMUD pays homeowners to switch to efficient heat pumps. As a participating contractor, we install to SMUD&apos;s specs and submit the rebate for you, so your money isn&apos;t at risk.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/rebates" className="btn-primary">
                See if you qualify <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/financing" className="btn-ghost-light">
                Financing options
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {rebateTiers.map((t) => (
              <div key={t.title} className="flex items-center gap-5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <span className="w-24 shrink-0 font-display text-3xl font-extrabold text-brand">{t.amount}</span>
                <div>
                  <h3 className="font-bold">{t.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{t.text}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-white/60">Rebate amounts are set by SMUD and can change. We confirm your exact amount during your free estimate.</p>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why Everbreeze" title="The HVAC company you'll actually want to call back" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {promises.map((p) => (
                <div key={p.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-dark">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {workPhotos.slice(0, 6).map((p) => (
              <div key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading center eyebrow="How it works" title="Comfortable again in three simple steps" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl bg-white p-6 ring-1 ring-line">
                <span className="absolute -top-3 left-6 rounded-full bg-navy-900 px-3 py-0.5 font-display text-xs font-bold text-white">Step {i + 1}</span>
                <s.icon className="h-7 w-7 text-brand-dark" aria-hidden />
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reviews />

      {/* Areas + brands */}
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Service areas" title="Local to Sacramento" intro="We serve homes and businesses across the Sacramento region." />
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}`} className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold hover:bg-surface">
                    <ArrowRight className="h-4 w-4 text-brand-dark" aria-hidden /> {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Brands" title="We service every major brand" />
            <div className="mt-8 rounded-2xl border border-line p-6">
              <LogoStrip kind="brands" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title="Questions we hear a lot" />
          <div className="mt-10">
            <FaqList faqs={generalFaqs.slice(0, 5)} />
          </div>
          <p className="mt-6 text-center">
            <Link href="/faq" className="font-bold text-brand-dark underline underline-offset-4">See all FAQs</Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
