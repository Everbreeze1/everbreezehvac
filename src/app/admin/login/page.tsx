import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await currentAdmin()) redirect("/admin");
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-line bg-white p-8">
      <h1 className="text-2xl font-extrabold">Sign in</h1>
      <p className="mt-1 text-sm text-muted">Use the email and password from your Supabase user.</p>
      <LoginForm />
    </div>
  );
}
