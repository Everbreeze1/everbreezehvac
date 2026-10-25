import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// BBB accreditation and SMUD participating contractor badges, shown on white chips so they read on any background.
export function Accreditations({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const h = { sm: "h-9", md: "h-12", lg: "h-14" }[size];
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={site.bbbUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="BBB Accredited Business: view our BBB profile"
        className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <Image src="/images/badges/bbb.png" alt="BBB Accredited Business" width={600} height={227} className={`${h} w-auto`} />
      </a>
      <Link
        href="/rebates"
        aria-label="SMUD Participating Contractor: learn about SMUD rebates"
        className="rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <Image src="/images/badges/smud.webp" alt="SMUD Participating Contractor" width={500} height={279} className={`${h} w-auto`} />
      </Link>
    </div>
  );
}
