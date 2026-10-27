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
      {/* Ondo voice agent chat bubble (fixed bottom-right inside an open shadow root). Below lg it would sit on
          top of the mobile call bar, so we lift the bubble and its panel above it. */}
      <Script id="ondo-offset" strategy="afterInteractive">
        {`(function(){var css='@media (max-width:1023px){.bubble{bottom:76px!important}.panel{bottom:144px!important;max-height:calc(100vh - 180px)!important}}';
function fix(){for(var el of document.body.children){var r=el.shadowRoot;if(r&&r.querySelector('.bubble')&&!r.querySelector('style[data-eb]')){var s=document.createElement('style');s.setAttribute('data-eb','');s.textContent=css;r.appendChild(s);return true;}}return false;}
if(!fix()){var o=new MutationObserver(function(){if(fix())o.disconnect();});o.observe(document.body,{childList:true});}})();`}
      </Script>
      <Script src={site.ondoWidget.src} data-agent-id={site.ondoWidget.agentId} strategy="lazyOnload" />
    </div>
  );
}
