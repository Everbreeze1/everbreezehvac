import { site } from "@/lib/site";
import { areas } from "@/lib/areas";
import { services } from "@/lib/services";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.alternateNames,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: "+1-866-383-7273",
    email: site.email,
    image: `${site.url}/images/og.jpg`,
    logo: `${site.url}/images/logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: "US",
    },
    areaServed: areas.map((a) => ({ "@type": "City", name: `${a.name}, CA` })),
    sameAs: [...Object.values(site.social).filter(Boolean), ...site.citations],
    ...(site.licenseNumber
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: `California CSLB C-20 HVAC contractor license #${site.licenseNumber}`,
            url: `https://www.cslb.ca.gov/${site.licenseNumber}`,
            recognizedBy: { "@type": "GovernmentOrganization", name: "Contractors State License Board" },
          },
        }
      : {}),
    knowsAbout: [
      "Air conditioning repair",
      "Furnace repair",
      "Heat pump installation",
      "Heat pump water heaters",
      "SMUD rebates",
      "HVAC maintenance",
      "Indoor air quality",
      "Commercial rooftop units",
    ],
    paymentAccepted: "Cash, Check, Credit Card, Financing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
      })),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
    ],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
