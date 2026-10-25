import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, CheckCircle2, ChevronDown, Flame, Leaf, Phone, Snowflake, Wind, Wrench } from "lucide-react";
import type { Service } from "@/lib/services";
import { brands, clients, site } from "@/lib/site";

const icons = { snowflake: Snowflake, flame: Flame, leaf: Leaf, wrench: Wrench, calendar: CalendarCheck, wind: Wind, building: Building2 };

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-dark transition group-hover:bg-brand group-hover:text-navy-950">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{service.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-dark">
        Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" aria-hidden />
          <span className="text-[15px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgba(46,199,84,0.22),transparent)]" />
      <div className="container-page relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow !text-brand">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Need heating or cooling help?", text = "Talk to a real person. We'll get you on the schedule fast." }: { title?: string; text?: string }) {
  return (
    <section className="bg-brand">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">{title}</h2>
          <p className="mt-2 text-navy-900/80">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={site.phoneHref} className="btn-dark !px-6">
            <Phone className="h-4 w-4" aria-hidden /> {site.phone}
          </a>
          <Link href="/book" className="btn bg-white !px-6 text-navy-950 hover:bg-navy-100">
            Book online <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LogoStrip({ kind }: { kind: "clients" | "brands" }) {
  const items = kind === "clients" ? clients : brands;
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {items.map((it) => (
        <li key={it.name} className="relative h-10 w-28 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
          <Image src={it.logo} alt={it.name} fill sizes="112px" className="object-contain" />
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
