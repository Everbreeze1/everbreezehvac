import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Accreditations } from "@/components/Accreditations";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/75">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-relaxed">{site.tagline}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold text-white hover:text-brand">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-brand">
                <Mail className="h-4 w-4" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            {site.city}, {site.region} {site.postalCode}
          </p>
          {site.licenseNumber && <p className="mt-4 text-xs">CA License #{site.licenseNumber}</p>}
          <Accreditations size="sm" className="mt-6" />
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-brand uppercase">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-brand uppercase">Service areas</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/service-areas/${a.slug}`} className="hover:text-white">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-brand uppercase">Hours</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="text-white">{h.days}:</span> {h.time}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-sm font-bold tracking-wider text-brand uppercase">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/rebates" className="hover:text-white">SMUD rebates</Link></li>
            <li><Link href="/financing" className="hover:text-white">Financing</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy-policy.html" className="hover:text-white">Privacy Policy</a>
            <a href="/terms-and-conditions.html" className="hover:text-white">Terms &amp; Conditions</a>
            <a href="/sms-opt-in.html" className="hover:text-white">SMS Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
