import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, Mail, MapPin, Phone, Search } from "lucide-react";
import { currentAdmin } from "@/lib/admin-auth";
import { isStatus, listLeads, STATUSES, type LeadRow, type LeadStatus } from "@/lib/leads-admin";
import { logout, saveNotes } from "./actions";
import { StatusSelect } from "./StatusSelect";

export const dynamic = "force-dynamic";

const TZ = "America/Los_Angeles";
const when = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const day = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" });

function ago(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)} hr ago`;
  return when.format(new Date(iso));
}

function matches(lead: LeadRow, q: string) {
  return [lead.first_name, lead.last_name, lead.phone, lead.email, lead.company, lead.address, lead.city, lead.zip, lead.service, lead.message, lead.notes]
    .filter(Boolean)
    .some((v) => v!.toLowerCase().includes(q));
}

function LeadCard({ lead }: { lead: LeadRow }) {
  const status = STATUSES.find((s) => s.value === lead.status)!;
  const address = [lead.address, lead.city, lead.zip].filter(Boolean).join(", ");
  const utm = lead.utm ? Object.entries(lead.utm).map(([k, v]) => `${k.replace("utm_", "")}: ${v}`).join(" · ") : null;
  return (
    <article className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">
            {lead.first_name} {lead.last_name}
            {lead.company && <span className="font-normal text-muted"> · {lead.company}</span>}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {ago(lead.created_at)} · {lead.kind === "booking" ? "Booking" : "Quote request"}
            {lead.service && ` · ${lead.service}`}
            {lead.customer_type && ` · ${lead.customer_type}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${status.badge}`}>{status.label}</span>
          <StatusSelect id={lead.id} status={lead.status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 font-semibold text-brand-dark hover:underline">
          <Phone className="h-4 w-4" aria-hidden /> {lead.phone}
        </a>
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-brand-dark hover:underline">
            <Mail className="h-4 w-4" aria-hidden /> {lead.email}
          </a>
        )}
        {address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted hover:underline"
          >
            <MapPin className="h-4 w-4" aria-hidden /> {address}
          </a>
        )}
      </div>

      {lead.appointment_date && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-semibold">
          <CalendarDays className="h-4 w-4 text-brand-dark" aria-hidden />
          Wants {day.format(new Date(`${lead.appointment_date}T12:00:00Z`))}
          {lead.appointment_window && `, ${lead.appointment_window}`}
        </p>
      )}
      {lead.message && <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-muted">{lead.message}</p>}
      {(utm || lead.page_path) && (
        <p className="mt-3 text-xs text-muted">
          From {!lead.page_path || lead.page_path === "/" ? "the homepage" : lead.page_path}
          {utm && ` · ${utm}`}
          {lead.sms_consent && " · OK to text"}
        </p>
      )}

      <form action={saveNotes} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start">
        <input type="hidden" name="id" value={lead.id} />
        <textarea
          name="notes"
          defaultValue={lead.notes ?? ""}
          rows={2}
          placeholder="Notes: called back, quoted price, booked in Markate…"
          className="field !py-2 text-sm"
        />
        <button type="submit" className="btn-outline !py-2 text-sm whitespace-nowrap">
          Save notes
        </button>
      </form>
    </article>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  if (!(await currentAdmin())) redirect("/admin/login");
  const params = await searchParams;
  const filter: LeadStatus | "all" = isStatus(params.status) ? params.status : params.status === "all" ? "all" : "new";
  const q = (params.q ?? "").trim().toLowerCase();

  const leads = await listLeads();
  const counts: Record<string, number> = { all: leads.length };
  for (const l of leads) counts[l.status] = (counts[l.status] ?? 0) + 1;
  const visible = leads.filter((l) => (filter === "all" || l.status === filter) && (!q || matches(l, q)));

  const tab = (value: string, label: string) => {
    const href = `/admin?status=${value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
    const active = filter === value;
    return (
      <Link
        key={value}
        href={href}
        className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${active ? "bg-navy-900 text-white" : "bg-white text-ink ring-1 ring-line hover:ring-navy-700"}`}
      >
        {label} <span className={active ? "text-white/70" : "text-muted"}>{counts[value] ?? 0}</span>
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Leads</h1>
        <form action={logout}>
          <button type="submit" className="text-sm font-semibold text-muted hover:text-ink">
            Sign out
          </button>
        </form>
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="Filter by status">
        {STATUSES.map((s) => tab(s.value, s.label))}
        {tab("all", "All")}
      </nav>
      <form className="relative">
        <input type="hidden" name="status" value={filter} />
        <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <input name="q" defaultValue={params.q ?? ""} placeholder="Search name, phone, email, address…" className="field !pl-10" />
      </form>
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-muted">No leads here.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
