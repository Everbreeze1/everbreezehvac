import type { Metadata } from "next";
import { CtaBand, PageHero, ServiceCard } from "@/components/ui";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "HVAC Services in Sacramento | Everbreeze Heating And Air®",
  description: "AC repair, furnace repair, heat pumps, new system installation, maintenance, indoor air quality and commercial HVAC in Sacramento.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Heating and cooling services for Sacramento" intro="Repairs, replacements and maintenance for every major brand. Upfront pricing on every job." />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
