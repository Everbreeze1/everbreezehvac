import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { SectionHeading } from "./ui";

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= Math.round(rating) ? "fill-star text-star" : "fill-line text-line"}`} aria-hidden />
      ))}
    </span>
  );
}

export async function RatingBadge({ dark = false }: { dark?: boolean }) {
  const data = await getGoogleReviews();
  if (!data) return null;
  return (
    <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-sm ${dark ? "text-white" : "text-ink"}`}>
      <Stars rating={data.rating} />
      <span className="font-bold">{data.rating.toFixed(1)}</span>
      <span className={dark ? "text-white/70" : "text-muted"}>from {data.count} Google reviews</span>
    </a>
  );
}

export async function Reviews() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading center eyebrow="Reviews" title="What Sacramento homeowners say" />
        <p className="mt-4 flex items-center justify-center gap-2">
          <Stars rating={data.rating} className="h-5 w-5" />
          <span className="font-bold">{data.rating.toFixed(1)}</span>
          <span className="text-muted">· {data.count} reviews on Google</span>
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.reviews.slice(0, 3).map((r) => (
            <figure key={r.author + r.when} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 line-clamp-6 flex-1 leading-relaxed text-[#2c3e55]">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-bold">{r.author}</span>
                {r.when && <span className="text-muted"> · {r.when}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-center">
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-dark underline underline-offset-4">
            Read all reviews on Google
          </a>
        </p>
      </div>
    </section>
  );
}
