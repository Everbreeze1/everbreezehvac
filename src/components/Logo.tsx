import { site } from "@/lib/site";

// The current Everbreeze wordmark: "Everbreeze®" over a ruled "Heating and Air".
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const accent = tone === "dark" ? "text-brand-dark" : "text-brand";
  const rule = tone === "dark" ? "bg-brand-dark" : "bg-brand";
  return (
    <span role="img" aria-label={site.name} className={`inline-flex flex-col items-center ${className}`}>
      <span aria-hidden className={`flex items-start font-display text-[1.65rem] leading-[0.9] font-extrabold tracking-tighter lg:text-3xl ${tone === "dark" ? "text-navy-900" : "text-white"}`}>
        Everbreeze
        <span className={`ml-0.5 text-[0.625rem] leading-none tracking-normal lg:text-xs ${accent}`}>®</span>
      </span>
      <span aria-hidden className="mt-1.5 flex items-center">
        <span className={`h-[2px] w-4 rounded-full ${rule}`} />
        <span className={`px-2 font-display text-[0.625rem] font-bold tracking-[0.26em] whitespace-nowrap uppercase lg:text-[0.6875rem] ${accent}`}>Heating and Air</span>
        <span className={`h-[2px] w-4 rounded-full ${rule}`} />
      </span>
    </span>
  );
}
