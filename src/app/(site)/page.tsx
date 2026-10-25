import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Tag,
  Wrench,
} from "lucide-react";
import { Accreditations } from "@/components/Accreditations";
import { HeroVideo } from "@/components/HeroVideo";
import { QuoteForm } from "@/components/QuoteForm";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { CtaBand, FaqList, LogoStrip, SectionHeading, ServiceCard } from "@/components/ui";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { generalFaqs, rebateTiers } from "@/lib/faqs";
import { services } from "@/lib/services";
import { site, workPhotos } from "@/lib/site";

export const revalidate = 21600;

const highlights = [
  { icon: ShieldCheck, title: "Licensed & insured", text: "Background-checked technicians" },
  { icon: Clock, title: "24/7 emergency service", text: "Real people answer, day or night" },
  { icon: BadgeDollarSign, title: "Up to $3,000 back", text: "SMUD heat pump rebates, filed for you" },
  { icon: Award, title: "Satisfaction guaranteed", text: "We're not done until you're comfortable" },
];

const offers = [
  {
    icon: Tag,
    tag: "Seasonal special",
    title: "AC & furnace tune-up",
    text: "Get your system ready for the season with a discounted tune-up. Fewer breakdowns, lower bills.",
    cta: "Book a tune-up",
    href: "/book?service=Maintenance%20%26%20Tune-Ups",
  },
  {
    icon: CalendarCheck,
    tag: "Members save",
    title: "Maintenance plan savings",
    text: "Two visits a year, priority scheduling, and savings on parts and labor when you need a repair.",
    cta: "Ask about plans",
    href: "/book?service=Maintenance%20%26%20Tune-Ups",
  },
  {
    icon: BadgeDollarSign,
    tag: "SMUD rebate",
    title: "Up to $3,000 on a heat pump",
    text: "Switch from gas to an efficient heat pump and SMUD pays you back. We handle the paperwork.",
    cta: "See if you qualify",
    href: "/rebates",
  },
];

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
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <HeroVideo />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/45" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/70 to-transparent" />
        <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(46,199,84,0.25)]" /> Sacramento heating &amp; air
            </p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-[4rem]">
              HVAC pros you can <span className="text-brand">trust</span>, right here in Sacramento.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              AC repair, furnace service and heat pump installs from licensed technicians. Upfront prices, 24/7 emergency help, and SMUD rebates handled for you.
            </p>
            <div className="mt-6">
              <RatingBadge dark />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary !px-7 !py-4 text-base shadow-lg shadow-brand/25">
                <PhoneCall className="h-5 w-5" aria-hidden /> Call {site.phone}
              </a>
              <Link href="/book" className="btn-ghost-light !px-7 !py-4 text-base backdrop-blur">
                Book online <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <Accreditations size="md" className="mt-10" />
          </div>
          <div id="quote" className="animate-rise scroll-mt-28 [animation-delay:120ms]">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 bg-white shadow-[0_1px_0_var(--color-line)]">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-dark">
                <h.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-bold sm:text-base">{h.title}</p>
                <p className="mt-0.5 text-xs text-muted sm:text-sm">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Services" title="Everything your heating and cooling needs" intro="Repairs, replacements and maintenance for every major brand, for homes and businesses." />
            <Link href="/services" className="inline-flex shrink-0 items-center gap-1 font-bold text-brand-dark hover:underline">
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
            <Link
              href="/book"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy-900 p-6 text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/25 blur-2xl" />
              <div className="relative">
                <h3 className="text-lg font-bold">Not sure what you need?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">Describe the problem and we&apos;ll figure it out together.</p>
              </div>
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                Book a visit <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_10%_0%,rgba(46,199,84,0.10),transparent),radial-gradient(40rem_20rem_at_100%_100%,rgba(11,31,58,0.08),transparent)]" />
        <div className="container-page relative">
          <SectionHeading center eyebrow="Special offers" title="Promotions & rebates" intro="Seasonal deals and energy rebates that put money back in your pocket." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offers.map((o, i) => (
              <article
                key={o.title}
                className={`reveal group relative flex flex-col overflow-hidden rounded-3xl p-7 shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                  i === 2 ? "bg-navy-900 text-white ring-navy-800" : "bg-white ring-line"
                }`}
              >
                <div aria-hidden className={`absolute inset-x-0 top-0 h-1.5 ${i === 2 ? "bg-brand" : "bg-gradient-to-r from-brand to-brand-dark"}`} />
                <div className="flex items-center justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 2 ? "bg-brand text-navy-950" : "bg-brand-50 text-brand-dark"}`}>
                    <o.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 2 ? "bg-white/10 text-brand" : "bg-surface text-brand-dark"}`}>{o.tag}</span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{o.title}</h3>
                <p className={`mt-2 flex-1 leading-relaxed ${i === 2 ? "text-white/75" : "text-muted"}`}>{o.text}</p>
                <Link href={o.href} className={`mt-6 ${i === 2 ? "btn-primary" : "btn-dark"} self-start`}>
                  {o.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">Ask us for current pricing. Offers can change; rebate amounts are set by SMUD.</p>
        </div>
      </section>

      {/* SMUD rebates */}
      <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_25rem_at_0%_100%,rgba(46,199,84,0.18),transparent)]" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-block rounded-xl bg-white px-3 py-2">
              <Image src="/images/badges/smud.webp" alt="SMUD Participating Contractor" width={500} height={279} className="h-14 w-auto" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">Get up to $3,000 back on a new heat pump</h2>
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
              <div key={t.title} className="reveal flex items-center gap-5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10">
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
                <div key={p.title} className="reveal">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-dark">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              ))}
            </div>
            <Accreditations size="sm" className="mt-10" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {workPhotos.slice(0, 6).map((p, i) => (
              <div key={p.src} className={`reveal relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm ${i % 3 === 1 ? "translate-y-6" : ""}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 15vw, 33vw" className="object-cover transition duration-500 hover:scale-105" />
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
              <li key={s.title} className="reveal relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-line">
                <span className="absolute -top-4 left-7 grid h-8 w-8 place-items-center rounded-full bg-brand font-display text-sm font-extrabold text-navy-950 shadow-md">
                  {i + 1}
                </span>
                <s.icon className="mt-2 h-7 w-7 text-brand-dark" aria-hidden />
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
                  <Link href={`/service-areas/${a.slug}`} className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold transition hover:bg-surface hover:text-brand-dark">
                    <CheckCircle2 className="h-4 w-4 text-brand-dark" aria-hidden /> {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Brands" title="We service every major brand" />
            <div className="mt-8 rounded-2xl border border-line p-6">
              <LogoStrip />
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
