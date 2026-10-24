import type { Metadata } from "next";
import Image from "next/image";
import { CheckList, CtaBand, LogoStrip, PageHero, SectionHeading } from "@/components/ui";
import { site, workPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Everbreeze Heating And Air® | Sacramento HVAC Company",
  description: "Everbreeze is a licensed Sacramento HVAC contractor serving homes and businesses with honest, upfront pricing and 24/7 emergency service.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* TODO(Jon): add your story: who started Everbreeze, when, and why. Real names and a team photo convert better than anything else here. */}
      <PageHero eyebrow="About us" title="A Sacramento HVAC company that does it right" intro="We're a local, licensed heating and air conditioning company serving homes and businesses across the Sacramento region." />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="How we work" />
            <p className="mt-4 leading-relaxed text-muted">
              Most people call an HVAC company on a bad day. Something stopped working, it&apos;s too hot or too cold, and they don&apos;t know who to trust. We try to make that day easier: answer the phone, show up when we say we will, explain the problem in plain language, and give you a price before we touch anything.
            </p>
            <CheckList
              className="mt-6"
              items={[
                "Licensed, insured and background-checked technicians",
                "Upfront pricing on every job",
                "24/7 emergency service",
                "SMUD participating contractor",
                "Residential and commercial service",
                site.licenseNumber ? `CA License #${site.licenseNumber}` : "Every major brand serviced",
              ]}
            />
          </div>
          <div className="rounded-2xl bg-surface p-8">
            <h2 className="text-xl font-extrabold">Trusted by local businesses</h2>
            <p className="mt-2 text-sm text-muted">Property managers, businesses and public agencies rely on us for their heating and cooling.</p>
            <div className="mt-8">
              <LogoStrip kind="clients" />
            </div>
          </div>
        </div>
      </section>
      <section id="our-work" className="scroll-mt-24 bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our work" title="Recent installs" />
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {workPhotos.map((p) => (
              <figure key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
