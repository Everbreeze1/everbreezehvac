export const dynamic = "force-static";

import { areas } from "@/lib/areas";
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
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.short}`),
    "",
    "## Service areas",
    ...areas.map((a) => `- [${a.name}, CA](${site.url}/service-areas/${a.slug})`),
    "",
    "## More",
    `- [SMUD rebates](${site.url}/rebates)`,
    `- [Financing](${site.url}/financing)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Blog](${site.url}/blog)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
