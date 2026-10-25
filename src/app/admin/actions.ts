"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, createSession, currentAdmin } from "@/lib/admin-auth";
import { isStatus, updateLead } from "@/lib/leads-admin";

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return "Enter your email and password.";
  const admin = await checkPassword(email, password);
  if (!admin) return "That email and password didn't work.";
  const session = createSession(admin);
  (await cookies()).set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: session.maxAge,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!(await currentAdmin())) redirect("/admin/login");
}

export async function setStatus(form: FormData) {
  await requireAdmin();
  const status = form.get("status");
  if (!isStatus(status)) return;
  await updateLead(String(form.get("id")), { status });
  revalidatePath("/admin");
}

export async function saveNotes(form: FormData) {
  await requireAdmin();
  const notes = String(form.get("notes") ?? "").slice(0, 5000);
  await updateLead(String(form.get("id")), { notes: notes || null });
  revalidatePath("/admin");
}
