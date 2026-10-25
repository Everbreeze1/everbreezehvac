"use client";

import { STATUSES, type LeadStatus } from "@/lib/leads-admin";
import { setStatus } from "./actions";

export function StatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  return (
    <form action={setStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        aria-label="Change status"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm font-semibold"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
