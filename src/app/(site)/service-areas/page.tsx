import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/ui";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: "Service Areas | Everbreeze Heating And Air® Sacramento",
  description: "Everbreeze serves Sacramento, Elk Grove, Rancho Cordova, Citrus Heights, Carmichael, Roseville, Folsom and West Sacramento.",
  alternates: { canonical: "/service-areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero eyebrow="Service areas" title="Serving the greater Sacramento area" intro="Don't see your city? Call us. If we can get to you, we will." />
      <section className="py-16">
        <ul className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link href={`/service-areas/${a.slug}`} className="flex items-center justify-between rounded-2xl border border-line p-5 font-display font-bold hover:border-brand hover:shadow">
                {a.name} <ArrowRight className="h-4 w-4 text-brand-dark" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
