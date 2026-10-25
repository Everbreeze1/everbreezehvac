// Server-only reads and writes for the leads page, using the service role key.

export const STATUSES = [
  { value: "new", label: "New", badge: "bg-blue-100 text-blue-800" },
  { value: "contacted", label: "Contacted", badge: "bg-amber-100 text-amber-800" },
  { value: "scheduled", label: "Scheduled", badge: "bg-purple-100 text-purple-800" },
  { value: "completed", label: "Completed", badge: "bg-green-100 text-green-800" },
  { value: "lost", label: "Lost", badge: "bg-gray-200 text-gray-700" },
] as const;

export type LeadStatus = (typeof STATUSES)[number]["value"];

export const isStatus = (v: unknown): v is LeadStatus => STATUSES.some((s) => s.value === v);

export type LeadRow = {
  id: string;
  created_at: string;
  status: LeadStatus;
  kind: "quote" | "booking";
  service: string | null;
  customer_type: string | null;
  first_name: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  company: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  message: string | null;
  appointment_date: string | null;
  appointment_window: string | null;
  sms_consent: boolean;
  page_path: string | null;
  utm: Record<string, string> | null;
  notes: string | null;
};

function supabase(path: string, init?: RequestInit) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
}

export async function listLeads(): Promise<LeadRow[]> {
  const res = await supabase("leads?select=*&order=created_at.desc&limit=1000");
  if (!res.ok) throw new Error(`Could not load leads [${res.status}]: ${await res.text()}`);
  return res.json();
}

export async function updateLead(id: string, patch: Partial<Pick<LeadRow, "status" | "notes">>) {
  const res = await supabase(`leads?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
  if (!res.ok) throw new Error(`Could not update lead [${res.status}]: ${await res.text()}`);
}
