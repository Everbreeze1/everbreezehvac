import { createSign } from "node:crypto";
import { z } from "zod";
import { site } from "@/lib/site";
import { TIME_WINDOWS } from "@/lib/leads-shared";

export { TIME_WINDOWS };

const text = (max: number) => z.string().trim().max(max);

export const leadSchema = z
  .object({
    kind: z.enum(["quote", "booking"]),
    firstName: text(80).min(1, "Please enter your name"),
    lastName: text(80).optional(),
    phone: text(30).refine((v) => v.replace(/\D/g, "").length >= 10, "Please enter a valid phone number"),
    email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(200)]).optional(),
    service: text(80).optional(),
    customerType: z.enum(["Residential", "Commercial"]).optional(),
    company: text(120).optional(),
    address: text(200).optional(),
    city: text(80).optional(),
    zip: text(10).optional(),
    message: text(2000).optional(),
    appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    appointmentWindow: z.enum(TIME_WINDOWS.map((w) => w.label) as [string, ...string[]]).optional(),
    smsConsent: z.boolean().optional(),
    pagePath: text(300).optional(),
    utm: z.record(z.string(), text(200)).optional(),
    // Honeypot: real visitors never see or fill this field.
    website: z.string().max(200).optional(),
  })
  .refine((d) => d.kind !== "booking" || (d.appointmentDate && d.appointmentWindow && d.address), {
    message: "Please choose a date, arrival window and service address",
  });

export type Lead = z.infer<typeof leadSchema>;

export async function saveLead(lead: Lead): Promise<string | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  const res = await fetch(`${url}/rest/v1/leads?select=id`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      kind: lead.kind,
      service: lead.service || null,
      customer_type: lead.customerType || null,
      first_name: lead.firstName,
      last_name: lead.lastName || null,
      phone: lead.phone,
      email: lead.email || null,
      company: lead.company || null,
      address: lead.address || null,
      city: lead.city || null,
      zip: lead.zip || null,
      message: lead.message || null,
      appointment_date: lead.appointmentDate || null,
      appointment_window: lead.appointmentWindow || null,
      sms_consent: Boolean(lead.smsConsent),
      page_path: lead.pagePath || null,
      utm: lead.utm && Object.keys(lead.utm).length ? lead.utm : null,
    }),
  });
  if (!res.ok) throw new Error(`Supabase insert failed [${res.status}]: ${await res.text()}`);
  const rows = (await res.json()) as { id: string }[];
  return rows[0]?.id ?? null;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function fullName(lead: Lead) {
  return [lead.firstName, lead.lastName].filter(Boolean).join(" ");
}

// Accepts "Name <address>" or a bare address.
function parseAddress(value: string) {
  const m = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return m ? { email: m[2], ...(m[1] ? { name: m[1].replace(/^"|"$/g, "") } : {}) } : { email: value.trim() };
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.SENDGRID_API_KEY;
  // Defaults to the business address, which is a verified sender in SendGrid.
  const from = process.env.LEAD_FROM_EMAIL || `${site.shortName} Heating and Air <${site.email}>`;
  if (!key) throw new Error(`SendGrid is not configured: SENDGRID_API_KEY not set for this ${process.env.VERCEL_ENV ?? "local"} deployment`);
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: parseAddress(from),
      ...(replyTo ? { reply_to: { email: replyTo } } : {}),
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
  if (!res.ok) throw new Error(`SendGrid failed [${res.status}]: ${await res.text()}`);
}

export async function sendLeadAlert(lead: Lead) {
  const rows: [string, string | undefined][] = [
    ["Type", lead.kind === "booking" ? "Booking request" : "Quote request"],
    ["Name", fullName(lead)],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service", lead.service],
    ["Customer", [lead.customerType, lead.company].filter(Boolean).join(" · ")],
    ["Address", [lead.address, lead.city, lead.zip].filter(Boolean).join(", ")],
    ["Requested", [lead.appointmentDate, lead.appointmentWindow].filter(Boolean).join(", ")],
    ["Details", lead.message],
    ["SMS consent", lead.smsConsent ? "Yes" : "No"],
    ["Page", lead.pagePath],
  ];
  const table = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 10px;background:#f5f7fb;font-weight:bold">${k}</td><td style="padding:6px 10px">${esc(v!)}</td></tr>`)
    .join("");
  const subject = `New ${lead.kind === "booking" ? "booking" : "lead"}: ${fullName(lead)}${lead.service ? ` (${lead.service})` : ""}`;
  const html = `<div style="font-family:Arial,sans-serif;color:#0b1f3a;max-width:600px">
<h2 style="margin:0 0 12px">${esc(subject)}</h2>
<p><a href="tel:${esc(lead.phone)}" style="display:inline-block;background:#2ec754;color:#061224;padding:10px 16px;border-radius:8px;font-weight:bold;text-decoration:none">Call ${esc(lead.phone)}</a></p>
<table cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #dde4ee">${table}</table></div>`;
  await sendEmail(process.env.LEAD_ALERT_EMAIL || site.email, subject, html, lead.email || undefined);
}

export async function sendCustomerConfirmation(lead: Lead) {
  if (!lead.email) return;
  const when =
    lead.kind === "booking"
      ? `<p>You asked for <strong>${esc(lead.appointmentDate!)}</strong>, arriving <strong>${esc(lead.appointmentWindow!)}</strong>. We'll call you to confirm that time.</p>`
      : "<p>We'll call you shortly to talk through what you need.</p>";
  const html = `<div style="font-family:Arial,sans-serif;color:#0b1f3a;max-width:560px">
<p>Hi ${esc(lead.firstName)},</p>
<p>Thanks for reaching out to ${site.name}. We received your request.</p>${when}
<p>If it's urgent, call us any time at <a href="${site.phoneHref}">${site.phone}</a>.</p>
<p>The Everbreeze team</p></div>`;
  await sendEmail(lead.email, "We received your request", html, process.env.LEAD_ALERT_EMAIL || site.email);
}

// Adds a booking to the Google Calendar that Markate syncs from, using a service account.
export async function addToCalendar(lead: Lead) {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const calendarId = process.env.LEADS_CALENDAR_ID;
  if (!raw || !calendarId || lead.kind !== "booking") return;
  const sa = JSON.parse(raw) as { client_email: string; private_key: string };

  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  if (!tokenRes.ok) throw new Error(`Google token failed [${tokenRes.status}]`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const window = TIME_WINDOWS.find((w) => w.label === lead.appointmentWindow)!;
  const pad = (n: number) => String(n).padStart(2, "0");
  const event = {
    summary: `HVAC ${lead.service ? `${lead.service} ` : ""}— ${fullName(lead)}`,
    location: [lead.address, lead.city, lead.zip].filter(Boolean).join(", "),
    description: [
      `Phone: ${lead.phone}`,
      lead.email && `Email: ${lead.email}`,
      lead.customerType && `Type: ${lead.customerType}${lead.company ? ` (${lead.company})` : ""}`,
      `Arrival window: ${lead.appointmentWindow}`,
      lead.message && `Details: ${lead.message}`,
      "Booked on everbreezehvac.com",
    ]
      .filter(Boolean)
      .join("\n"),
    start: { dateTime: `${lead.appointmentDate}T${pad(window.start)}:00:00`, timeZone: "America/Los_Angeles" },
    end: { dateTime: `${lead.appointmentDate}T${pad(window.start + 2)}:00:00`, timeZone: "America/Los_Angeles" },
  };
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error(`Calendar insert failed [${res.status}]: ${await res.text()}`);
}
