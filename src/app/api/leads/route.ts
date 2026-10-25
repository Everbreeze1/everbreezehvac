import { NextResponse } from "next/server";
import { addToCalendar, leadSchema, saveLead, sendCustomerConfirmation, sendLeadAlert } from "@/lib/leads";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form" }, { status: 400 });
  }
  const lead = parsed.data;
  // Bots fill the hidden field; pretend it worked so they move on.
  if (lead.website) return NextResponse.json({ ok: true });

  // Saving and alerting run independently: a lead is kept as long as either one succeeds.
  const [saved, alerted] = await Promise.allSettled([saveLead(lead), sendLeadAlert(lead)]);
  const extras = await Promise.allSettled([sendCustomerConfirmation(lead), addToCalendar(lead)]);

  for (const [step, r] of [["save", saved], ["alert", alerted], ["confirm", extras[0]], ["calendar", extras[1]]] as const) {
    if (r.status === "rejected") console.error(`lead ${step} failed:`, r.reason instanceof Error ? r.reason.message : r.reason);
  }

  if (saved.status === "rejected" && alerted.status === "rejected") {
    return NextResponse.json({ error: "We couldn't send your request. Please call us instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
