import type { Metadata } from "next";
import { Clock, Phone, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { RatingBadge } from "@/components/Reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book HVAC Service Online | Everbreeze Heating And Air®",
  description: "Book AC repair, heating service, maintenance or a free replacement estimate online. Pick a date and arrival window and we'll confirm by phone.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return (
    <section className="bg-surface py-10 sm:py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Book a service visit</h1>
          <p className="mt-2 text-muted">Pick a day and arrival window. We&apos;ll call to confirm the same business day.</p>
          <div className="mt-8">
            <BookingForm defaultService={service} />
          </div>
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl bg-navy-900 p-6 text-white">
            <h2 className="text-lg font-bold">Need help right now?</h2>
            <p className="mt-1 text-sm text-white/75">For no heat, no cooling, or anything urgent, call us. We answer 24/7.</p>
            <a href={site.phoneHref} className="btn-primary mt-4 w-full">
              <Phone className="h-4 w-4" aria-hidden /> {site.phone}
            </a>
          </div>
          <ul className="space-y-3 rounded-2xl bg-white p-6 text-sm ring-1 ring-line">
            <li className="flex gap-2"><ShieldCheck className="h-5 w-5 shrink-0 text-brand-dark" aria-hidden /> Licensed &amp; insured technicians</li>
            <li className="flex gap-2"><Clock className="h-5 w-5 shrink-0 text-brand-dark" aria-hidden /> Upfront pricing before any work</li>
          </ul>
          <RatingBadge />
        </aside>
      </div>
    </section>
  );
}
