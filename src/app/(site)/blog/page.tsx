import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { sortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "HVAC Tips & News for Sacramento Homeowners | Everbreeze Blog",
  description: "Practical heating, cooling and indoor air quality advice for Sacramento homes, from the Everbreeze Heating And Air® team.",
  alternates: { canonical: "/blog" },
};

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPage() {
  const posts = sortedPosts();
  return (
    <>
      <PageHero eyebrow="Blog" title="HVAC tips for Sacramento homeowners" />
      <section className="py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image src={p.featuredImage} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-muted">{fmt(p.date)}</p>
                <h2 className="mt-2 text-lg leading-snug font-bold group-hover:text-brand-dark">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
