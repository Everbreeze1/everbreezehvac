import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Phone, ShieldCheck, Clock } from "lucide-react";
import { nav, site } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { BookButton } from "@/components/BookButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="hidden bg-navy-900 text-white/85 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand" aria-hidden /> 24/7 emergency service
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden /> Licensed &amp; insured · SMUD participating contractor
            </span>
          </div>
          <span>Serving Sacramento &amp; surrounding areas</span>
        </div>
      </div>
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-4 text-[0.95rem] font-semibold whitespace-nowrap text-ink 2xl:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 font-display font-bold whitespace-nowrap text-ink sm:inline-flex">
            <span className="grid h-9 w-9 place-items-center xl:hidden 2xl:grid rounded-full bg-brand-50 text-brand-dark">
              <Phone className="h-4 w-4" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.6875rem] font-semibold tracking-wide text-muted uppercase xl:hidden 2xl:block">Call 24/7</span>
              {site.phone}
            </span>
          </a>
          <BookButton className="btn-primary ml-2 hidden !py-2.5 whitespace-nowrap sm:inline-flex">Book online</BookButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
