import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

// Bump when page copy changes so Google knows to recrawl.
const contentUpdated = "2026-10-25";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/rebates", "/financing", "/service-areas", "/about", "/faq", "/blog", "/book"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: contentUpdated, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: contentUpdated, priority: 0.9 })),
    ...areas.map((a) => ({ url: `${site.url}/service-areas/${a.slug}`, lastModified: contentUpdated, priority: 0.7 })),
    ...blogPosts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
