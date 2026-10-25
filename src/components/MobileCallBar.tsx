import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { BookButton } from "@/components/BookButton";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white p-2 shadow-[0_-4px_16px_rgba(11,31,58,0.08)] lg:hidden">
      <a href={site.phoneHref} className="btn-dark !py-3">
        <Phone className="h-4 w-4" aria-hidden /> Call now
      </a>
      <BookButton className="btn-primary !py-3">
        <CalendarCheck className="h-4 w-4" aria-hidden /> Book online
      </BookButton>
    </div>
  );
}
