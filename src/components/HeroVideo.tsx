"use client";

import { useEffect, useRef, useState } from "react";

const CLIPS = ["/video/rooftops.mp4", "/video/hvac-install.mp4", "/video/hvac-ductwork.mp4", "/video/hvac-vents.mp4", "/video/hvac-office.mp4"];
const POSTER = "/video/rooftops-poster.webp";

// Background clips that crossfade in a loop. Two stacked <video> elements take turns so the switch is seamless.
// Video starts only after the page has loaded (so it never slows the first paint), and never for reduced-motion users.
export function HeroVideo() {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [active, setActive] = useState(0);
  const [clip, setClip] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setEnabled(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(start, 300);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Load the current clip into the visible element and the next clip into the hidden one.
  useEffect(() => {
    if (!enabled) return;
    const current = refs[active].current;
    const next = refs[1 - active].current;
    if (current && !current.src.endsWith(CLIPS[clip])) {
      current.src = CLIPS[clip];
      current.load();
    }
    current?.play().catch(() => {});
    if (next) {
      const t = window.setTimeout(() => {
        next.src = CLIPS[(clip + 1) % CLIPS.length];
        next.load();
      }, 1500);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, active, clip]);

  const advance = () => {
    const next = refs[1 - active].current;
    if (!next) return;
    next.currentTime = 0;
    next.play().catch(() => {});
    setActive(1 - active);
    setClip((clip + 1) % CLIPS.length);
  };

  return (
    <div aria-hidden className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      {refs.map((ref, i) => (
        <video
          key={i}
          ref={ref}
          muted
          playsInline
          preload="none"
          onEnded={i === active ? advance : undefined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${enabled && i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
