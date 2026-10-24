import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, CreditCard, Percent, ShieldCheck } from "lucide-react";
import { CtaBand, FaqList, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HVAC Financing in Sacramento | Everbreeze Heating And Air®",
  description: "Flexible HVAC financing through Avvance. Apply in minutes, check your options without affecting your credit, and pay monthly.",
  alternates: { canonical: "/financing" },
};

const perks = [
  { icon: CreditCard, title: "Affordable monthly payments", text: "Spread the cost of a new system into payments that fit your budget." },
  { icon: Clock, title: "Apply in minutes", text: "A quick online application from your phone. No paperwork." },
  { icon: ShieldCheck, title: "No impact to check", text: "Checking your options won't affect your credit score." },
  { icon: Percent, title: "Competitive rates", text: "Flexible terms through our lending partner, Avvance." },
];

export default function FinancingPage() {
  return (
    <>
      <PageHero eyebrow="Financing" title="A new system now, easy payments over time" intro="Don't wait through another summer with a struggling AC. Combine financing with SMUD rebates to make the switch affordable.">
        <a href={site.financingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 !px-7 !py-4">
          Check your options with Avvance <ArrowUpRight className="h-5 w-5" aria-hidden />
        </a>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line p-6">
              <p.icon className="h-7 w-7 text-brand-dark" aria-hidden />
              <h2 className="mt-3 text-lg font-bold">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="container-page mt-10 flex flex-col items-center gap-3 text-center">
          <Image src="/images/brands/avvance.svg" alt="Avvance" width={160} height={40} className="h-10 w-auto" />
          <p className="max-w-xl text-sm text-muted">Financing is provided by Avvance and subject to credit approval. Ask us during your estimate and we&apos;ll walk you through it.</p>
        </div>
      </section>
      <section className="bg-surface py-16">
        <div className="container-page max-w-3xl">
          <FaqList
            faqs={[
              { q: "Can I use financing with SMUD rebates?", a: "Yes. Your SMUD rebate lowers the project cost, and you can finance the rest." },
              { q: "What can I finance?", a: "New systems, heat pumps, and larger repairs. Ask us about your project." },
              { q: "How do I apply?", a: "Use the Avvance link above, or ask your technician during your estimate and we'll help you apply." },
            ]}
          />
        </div>
      </section>
      <CtaBand title="Get a free estimate" text="We'll give you written options, with rebates and monthly payments included." />
    </>
  );
}
