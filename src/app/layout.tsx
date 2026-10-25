import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sacramento HVAC: AC Repair, Heating & Heat Pumps | Everbreeze Heating And Air®",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  verification: { google: "WiKD-karspVVLdlwRKktGmZ9nbzVTllPgRsd4wnzCU8" },
};

export const viewport: Viewport = { themeColor: "#0b1f3a" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
