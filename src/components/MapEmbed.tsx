// Keyless Google Maps embed; loads lazily so it never slows the page down.
export function MapEmbed({ query, zoom = 10, title, className = "" }: { query: string; zoom?: number; title: string; className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-sm ${className}`}>
      <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
    </div>
  );
}
