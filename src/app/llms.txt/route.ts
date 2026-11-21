export const dynamic = "force-static";

import { areas } from "@/lib/areas";
import { generalFaqs, rebateTiers, waterHeaterRebates } from "@/lib/faqs";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

// Plain-text summary for AI search tools (ChatGPT, Perplexity, Google AI answers).
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Location: ${site.city}, ${site.region} ${site.postalCode}`,
    `- Hours: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}`,
    `- Book online: ${site.url}/book`,
    `- Also known as: ${site.alternateNames.join(", ")}`,
    "",
    "## Key facts",
    ...(site.licenseNumber ? [`- Licensed California HVAC contractor, CSLB license #${site.licenseNumber} (https://www.cslb.ca.gov/${site.licenseNumber})`] : []),
    ...(site.yearsInBusiness ? [`- ${site.yearsInBusiness} years in business, locally owned in Sacramento`] : []),
    "- SMUD participating contractor: installs qualifying heat pumps and heat pump water heaters and files the SMUD rebate paperwork for customers",
    "- 24/7 emergency service; online requests get a call back the same business day",
    "- Up-front pricing: the price is approved before any work starts",
    "- Services all major brands: Trane, Carrier, Lennox, Goodman, Rheem, Daikin, Bryant, Amana",
    "- Financing available through Avvance",
    "- Residential and commercial",
    "",
    "## SMUD rebates (amounts set by SMUD and can change)",
    ...[...rebateTiers, ...waterHeaterRebates].map((r) => `- ${r.amount}: ${r.title}. ${r.text}`),
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.short}`),
    "",
    "## Service areas",
    ...areas.map((a) => `- [${a.name}, CA](${site.url}/service-areas/${a.slug})`),
    "",
    "## Frequently asked questions",
    ...generalFaqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## More",
    `- [SMUD rebates](${site.url}/rebates)`,
    `- [Financing](${site.url}/financing)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Blog](${site.url}/blog)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
