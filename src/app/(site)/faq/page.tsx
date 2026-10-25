import type { Metadata } from "next";
import { CtaBand, FaqList, PageHero } from "@/components/ui";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { generalFaqs } from "@/lib/faqs";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "HVAC FAQ | Everbreeze Heating And Air® Sacramento",
  description: "Answers to common questions about HVAC service in Sacramento: emergency repair, pricing, financing, SMUD rebates, maintenance and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const all = [...generalFaqs, ...services.flatMap((s) => s.faqs)];
  return (
    <>
      <JsonLd data={faqSchema(all)} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />
      <section className="py-16">
        <div className="container-page max-w-3xl space-y-12">
          <div>
            <h2 className="mb-5 text-2xl font-extrabold">General</h2>
            <FaqList faqs={generalFaqs} />
          </div>
          {services.map((s) => (
            <div key={s.slug}>
              <h2 className="mb-5 text-2xl font-extrabold">{s.name}</h2>
              <FaqList faqs={s.faqs} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Still have a question?" text="Call us. A real person will answer." />
    </>
  );
}
