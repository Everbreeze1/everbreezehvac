import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Leads | Everbreeze Heating And Air®",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center gap-3">
          <Image src="/images/logo.png" alt="Everbreeze" width={800} height={172} className="h-8 w-auto" priority />
          <span className="font-display text-sm font-bold tracking-wider text-muted uppercase">Leads</span>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
