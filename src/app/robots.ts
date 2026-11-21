import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const disallow = ["/api/", "/admin", "/thank-you"];

// AI search and assistant crawlers, named explicitly so it is clear we want to be
// found and cited by ChatGPT, Claude, Gemini, Perplexity, Copilot and Siri.
const aiBots = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "GPTBot", // OpenAI
  "Claude-SearchBot", // Claude search
  "Claude-User", // Claude browsing on a user's behalf
  "ClaudeBot", // Anthropic
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini
  "Bingbot", // Bing index, which also feeds ChatGPT search and Copilot
  "Applebot",
  "Applebot-Extended", // Apple Intelligence / Siri
  "DuckAssistBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
