import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Leads | Everbreeze Heating And Air®",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center gap-3">
          <Logo />
          <span className="font-display text-sm font-bold tracking-wider text-muted uppercase">Leads</span>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
