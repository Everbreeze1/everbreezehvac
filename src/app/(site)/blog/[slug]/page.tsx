import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { blogPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.metaDescription, images: [post.featuredImage], publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            image: `${site.url}${post.featuredImage}`,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@id": `${site.url}/#business` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/blog" className="hover:text-ink">Blog</Link>
            </nav>
            <h1 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-sm text-muted">
              {new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.featuredImage} alt="" fill priority sizes="(min-width: 1024px) 48rem, 100vw" className="object-cover" />
            </div>
            <div className="prose-blog mt-10 text-[17px]" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <QuoteForm title="Need a hand?" subtitle="Our technicians can take care of it. Leave your number and we'll call you." />
          </aside>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
