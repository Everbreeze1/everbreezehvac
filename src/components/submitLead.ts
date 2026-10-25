"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import { site } from "@/lib/site";

function utmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"]) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  return utm;
}

export async function submitLead(payload: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, pagePath: window.location.pathname, utm: utmParams() }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return data.error ?? `Something went wrong. Please call us at ${site.phone}.`;
    }
    window.gtag?.("event", "conversion", { send_to: site.analytics.leadConversion });
    window.gtag?.("event", "generate_lead", { lead_type: payload.kind });
    return null;
  } catch {
    return `Something went wrong. Please call us at ${site.phone}.`;
  }
}
