import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { site } from "@/lib/site";

// The leads page signs in with a Supabase Auth email + password, then keeps its own signed cookie.
// Only addresses in ADMIN_EMAILS (default: the business email) are let in.
export const ADMIN_COOKIE = "eb_admin";
const SESSION_DAYS = 30;

const secret = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Supabase is not configured");
  return key;
};

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function adminEmails() {
  return (process.env.ADMIN_EMAILS || site.email)
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function createSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ e: email, x: Date.now() + SESSION_DAYS * 86_400_000 })).toString("base64url");
  return { value: `${payload}.${sign(payload)}`, maxAge: SESSION_DAYS * 86_400 };
}

function readSession(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; x: number };
    return Date.now() < x && adminEmails().includes(e) ? e : null;
  } catch {
    return null;
  }
}

export async function currentAdmin() {
  return readSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

// Checks the email and password against Supabase Auth. Returns the email on success.
export async function checkPassword(email: string, password: string): Promise<string | null> {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Supabase is not configured");
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anon, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { user?: { email?: string } };
  const signedIn = data.user?.email?.toLowerCase();
  return signedIn && adminEmails().includes(signedIn) ? signedIn : null;
}
