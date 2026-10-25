"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { BookButton } from "@/components/BookButton";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-t border-line bg-white shadow-lg">
          <nav aria-label="Mobile" className="container-page py-3">
            <ul className="divide-y divide-line">
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 text-base font-semibold text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 py-4">
              <a href={site.phoneHref} className="btn-outline">
                Call {site.phone}
              </a>
              <BookButton className="btn-primary">Book online</BookButton>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
