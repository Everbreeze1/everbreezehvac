import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-page max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-extrabold">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-muted">It may have moved when we updated our site.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-dark">Go to the homepage</Link>
          <a href={site.phoneHref} className="btn-primary">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
