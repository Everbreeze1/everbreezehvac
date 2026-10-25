"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";

// Opens the booking form in a modal so visitors never leave the page they're on.
export function BookButton({ service, className, children }: { service?: string; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        {children}
      </button>
      {open && (
        <dialog
          ref={dialog}
          aria-labelledby="book-title"
          onClose={() => setOpen(false)}
          onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
          className="m-auto max-h-[calc(100dvh-1.5rem)] w-[min(44rem,calc(100%-1.5rem))] overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-8">
            <div>
              <h2 id="book-title" className="text-xl font-extrabold sm:text-2xl">Book a service visit</h2>
              <p className="mt-0.5 text-sm text-muted">Pick a day and arrival window. We&apos;ll call to confirm the same business day.</p>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} className="-mr-2 rounded-lg p-2 text-muted hover:bg-surface hover:text-ink" aria-label="Close">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="px-5 py-6 sm:px-8">
            <BookingForm defaultService={service} />
          </div>
        </dialog>
      )}
    </>
  );
}
