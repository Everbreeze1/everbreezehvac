import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeDollarSign, Clock, Phone, ShieldCheck } from "lucide-react";
import { Accreditations } from "@/components/Accreditations";
import { BookButton } from "@/components/BookButton";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { CheckList, CtaBand, FaqList, LogoStrip, ServiceCard } from "@/components/ui";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const revalidate = 21600;

const promises = [
  { Icon: BadgeDollarSign, text: "Upfront price first" },
  { Icon: ShieldCheck, text: "Licensed & insured" },
  { Icon: Clock, text: "Callback same business day" },
];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.metaDescription,
            provider: { "@id": `${site.url}/#business` },
            areaServed: "Sacramento, CA",
          },
        ]}
      />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgba(46,199,84,0.22),transparent)]" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link href="/services" className="hover:text-white">Services</Link> / <span className="text-white/90">{service.name}</span>
            </nav>
            <h1 className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">{service.headline}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{service.intro}</p>
            <div className="mt-6">
              <RatingBadge dark />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary !px-7 !py-4">
                <Phone className="h-5 w-5" aria-hidden /> Call {site.phone}
              </a>
              <BookButton service={service.name} className="btn-ghost-light !px-7 !py-4">
                Book online <ArrowRight className="h-5 w-5" aria-hidden />
              </BookButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              {promises.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden /> {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative pb-6 lg:pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/10">
              <Image
                src={service.image}
                alt={service.imageAlt ?? `${service.name} by Everbreeze Heating And Air`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {service.offer ? (
              <div className="absolute -bottom-1 left-4 rounded-xl bg-brand px-5 py-3 text-navy-950 shadow-xl sm:left-6 lg:-bottom-6">
                <p className="text-[11px] font-bold tracking-wider uppercase">{service.offer.label}</p>
                <p className="font-display text-2xl font-extrabold">{service.offer.amount}</p>
              </div>
            ) : (
              <Accreditations size="sm" className="absolute -bottom-1 left-4 sm:left-6 lg:-bottom-5" />
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">{service.signs.title}</h2>
            <p className="mt-3 text-muted">{service.signs.signsLead}</p>
            <CheckList items={service.signs.items} className="mt-6" />
          </div>
          <div className="relative self-start overflow-hidden rounded-2xl bg-navy-900 p-8 text-white shadow-xl">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
            <p className="eyebrow relative !text-brand">Sound familiar?</p>
            <h3 className="relative mt-2 text-2xl font-extrabold">Let a licensed tech take a look</h3>
            <p className="relative mt-3 leading-relaxed text-white/75">
              Pick a day and arrival window online, or call and talk to a real person. You&apos;ll get a clear price before any work starts.
            </p>
            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <BookButton service={service.name} className="btn-primary !px-6 !py-3.5">
                Book online <ArrowRight className="h-4 w-4" aria-hidden />
              </BookButton>
              <a href={site.phoneHref} className="btn-ghost-light !px-6 !py-3.5">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
            </div>
            <Accreditations size="sm" className="relative mt-6" />
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">What we do</h2>
            <CheckList items={service.includes} className="mt-6 sm:grid-cols-1" />
            {service.slug !== "heat-pumps" && (
              <div className="mt-8 rounded-2xl bg-navy-900 p-6 text-white">
                <h3 className="text-lg font-bold">Thinking about replacing your system?</h3>
                <p className="mt-1 text-sm text-white/75">SMUD customers can get up to $3,000 back on a qualifying heat pump.</p>
                <Link href="/rebates" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                  See SMUD rebates <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold">Common questions</h2>
            <div className="mt-6">
              <FaqList faqs={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      <section className="py-14">
        <div className="container-page">
          <p className="mb-6 text-center text-sm font-semibold text-muted">We work on every major brand</p>
          <LogoStrip />
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold">Other services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
