import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Branded social-share card (Facebook, Google, text messages) for a page.
export function ogImage({ eyebrow, title, badge }: { eyebrow: string; title: string; badge?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #061224 0%, #0b1f3a 55%, #12305a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>
            Ever<span style={{ color: "#2ec754" }}>breeze</span>
            <span style={{ marginLeft: 12, fontWeight: 600, opacity: 0.85 }}>Heating And Air®</span>
          </div>
          {badge ? (
            <div style={{ display: "flex", background: "#2ec754", color: "#061224", padding: "12px 24px", borderRadius: 16, fontSize: 30, fontWeight: 800 }}>
              {badge}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#2ec754", fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, opacity: 0.9 }}>
          <span>{site.tagline}</span>
          <span style={{ fontWeight: 700 }}>{site.phone}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
