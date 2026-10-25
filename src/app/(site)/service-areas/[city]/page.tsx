import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { MapEmbed } from "@/components/MapEmbed";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { CtaBand, ServiceCard } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { areas, getArea } from "@/lib/areas";
import { getServiceGuide } from "@/lib/service-guides";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const revalidate = 21600;

export function generateStaticParams() {
  return areas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const area = getArea((await params).city);
  if (!area) return {};
  const title = `AC Repair, Heating & HVAC in ${area.name}, CA | Everbreeze`;
  const description = `AC repair, furnace repair and heat pump installation in ${area.name}, CA. Licensed technicians, upfront pricing and 24/7 emergency service from Everbreeze Heating And Air®.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: { type: "website", siteName: site.name, title, description, url: `/service-areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ city: string }> }) {
  const area = getArea((await params).city);
  if (!area) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service areas", path: "/service-areas" },
            { name: area.name, path: `/service-areas/${area.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Heating and air conditioning in ${area.name}, CA`,
            serviceType: "HVAC repair, installation and maintenance",
            url: `${site.url}/service-areas/${area.slug}`,
            provider: { "@id": `${site.url}/#business` },
            areaServed: { "@type": "City", name: `${area.name}, CA` },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `HVAC services in ${area.name}`,
              itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
              })),
            },
          },
        ]}
      />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgba(46,199,84,0.22),transparent)]" />
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5 !text-brand">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> {area.name}, CA
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">Heating &amp; air conditioning in {area.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{area.blurb}</p>
            <p className="mt-6 text-sm text-white/70">Neighborhoods we serve include {area.neighborhoods.join(", ")}.</p>
            <div className="mt-6">
              <RatingBadge dark />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary !px-7 !py-4">
                <Phone className="h-5 w-5" aria-hidden /> Call {site.phone}
              </a>
              <BookButton className="btn-ghost-light !px-7 !py-4">
                Book online <ArrowRight className="h-5 w-5" aria-hidden />
              </BookButton>
            </div>
          </div>
          <MapEmbed query={`${area.name}, CA`} zoom={12} title={`Map of ${area.name}, CA`} className="h-72 ring-1 ring-white/10 sm:h-96" />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold">Our services in {area.name}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {services.map((s) => {
              const keyword = getServiceGuide(s.slug)?.keyword ?? s.name;
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-semibold text-brand-dark hover:underline">
                    {keyword.charAt(0).toUpperCase() + keyword.slice(1)} in {area.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-extrabold">Rebates for {area.name} homeowners</h2>
          {area.utility === "SMUD" ? (
            <p className="mt-3 leading-relaxed text-muted">
              Most {area.name} homes get their electricity from SMUD, which offers up to $3,000 back on a qualifying heat pump. As a SMUD participating contractor, we handle the rebate for you.
            </p>
          ) : (
            <p className="mt-3 leading-relaxed text-muted">
              Most {area.name} homes are served by {area.utility}, which runs its own efficiency programs. Federal and state incentives can also apply. We&apos;ll tell you what you qualify for during your estimate.
            </p>
          )}
          <Link href="/rebates" className="mt-5 inline-flex items-center gap-1 font-bold text-brand-dark">
            Learn about rebates <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <Reviews />
      <CtaBand title={`Need HVAC help in ${area.name}?`} />
    </>
  );
}
