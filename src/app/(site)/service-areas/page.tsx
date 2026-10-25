import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";
import { CtaBand, PageHero } from "@/components/ui";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Everbreeze Heating And Air® Sacramento",
  description: "Everbreeze serves Sacramento, Elk Grove, Rancho Cordova, Citrus Heights, Carmichael, Roseville, Folsom, West Sacramento and Davis.",
  alternates: { canonical: "/service-areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero eyebrow="Service areas" title="Serving the greater Sacramento area" intro="Don't see your city? Call us. If we can get to you, we will." />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Local techs across Sacramento, Placer and Yolo counties</h2>
            <p className="mt-3 text-muted">We&apos;re based in {site.city}, so most of these cities are a short drive. Pick yours to see local details and rebates.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="group flex h-full items-center gap-3 rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-dark">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-bold">{a.name}</span>
                      <span className="block text-xs text-muted">{a.utility}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand-dark transition group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="mt-6 flex items-center gap-3 rounded-xl bg-navy-900 p-4 text-sm text-white/80 hover:bg-navy-950">
              <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>
                Don&apos;t see your city? <span className="font-semibold text-white">Call {site.phone}</span> and we&apos;ll tell you if we can get there.
              </span>
            </a>
          </div>
          <MapEmbed query="Sacramento, CA" zoom={9} title="Everbreeze service area around Sacramento" className="h-80 sm:h-[28rem] lg:h-full lg:min-h-[32rem]" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
