import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
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
      <body className="pb-16 lg:pb-0">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={localBusinessSchema()} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.analytics.ga4}');gtag('config','${site.analytics.googleAds}');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(a){gtag('event','phone_click',{link_url:a.href});}});`}
        </Script>
      </body>
    </html>
  );
}
