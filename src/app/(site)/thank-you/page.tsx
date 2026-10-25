import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you | Everbreeze Heating And Air®",
  robots: { index: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ booked?: string }> }) {
  const booked = (await searchParams).booked === "1";
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-dark" aria-hidden />
        <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">{booked ? "Your request is in" : "Thanks, we got it"}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {booked
            ? "We'll call you shortly to confirm your appointment time. Check your email for a copy of your request."
            : "We'll call you back shortly to talk through what you need."}
        </p>
        <p className="mt-6 text-muted">If it&apos;s urgent, call us now:</p>
        <a href={site.phoneHref} className="btn-primary mt-3 !px-8 !py-4">
          <Phone className="h-5 w-5" aria-hidden /> {site.phone}
        </a>
        <p className="mt-10">
          <Link href="/rebates" className="font-bold text-brand-dark underline underline-offset-4">
            While you wait: see if you qualify for SMUD rebates
          </Link>
        </p>
      </div>
    </section>
  );
}
