import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { ReviewsWidget } from "@/components/ReviewsWidget";
import { site } from "@/lib/site";

// Public site chrome and analytics. The /admin pages sit outside this group so they get neither.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16 lg:pb-0">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileCallBar />
      <ReviewsWidget />
      <JsonLd data={localBusinessSchema()} />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.analytics.ga4}');gtag('config','${site.analytics.googleAds}');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(a){gtag('event','phone_click',{link_url:a.href});}});`}
      </Script>
    </div>
  );
}
