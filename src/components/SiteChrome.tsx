import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { ReviewsWidget } from "@/components/ReviewsWidget";
import { site } from "@/lib/site";

// Restyles the Ondo chat widget (see the ondo-style script below). Brand green-dark keeps white text readable.
const ondoCss = [
  ".bubble{width:auto!important;height:60px!important;padding:0 24px 0 18px!important;display:flex!important;align-items:center;gap:10px;",
  "bottom:24px!important;right:24px!important;background:#15803d!important;font-size:24px!important;",
  "box-shadow:0 10px 28px rgba(11,31,58,.35)!important;transition:transform .15s ease,background .15s ease}",
  ".bubble::after{content:'Chat with us';font-size:17px;font-weight:700;letter-spacing:.01em;white-space:nowrap}",
  ".bubble::before{content:'';position:absolute;inset:0;border-radius:inherit;animation:ebpulse 2.6s ease-out infinite;pointer-events:none}",
  ".bubble:hover,.bubble:focus-visible{background:#166534!important;transform:translateY(-2px)}",
  "@keyframes ebpulse{0%{box-shadow:0 0 0 0 rgba(46,199,84,.55)}70%,100%{box-shadow:0 0 0 16px rgba(46,199,84,0)}}",
  "@media (prefers-reduced-motion:reduce){.bubble::before{animation:none}}",
  ".panel{bottom:100px!important;right:24px!important;width:380px!important;height:540px!important;max-height:calc(100vh - 130px)!important;",
  "box-shadow:0 18px 48px rgba(11,31,58,.3)!important;overflow:hidden}",
  ".header{background:#0b1f3a!important;font-size:16px!important}",
  ".msg{font-size:15px!important;line-height:1.45}",
  ".msg.user,.inputRow button{background:#15803d!important;color:#fff!important}",
  ".inputRow input{font-size:16px!important}",
  "@media (max-width:1023px){.bubble{bottom:76px!important;right:16px!important;height:54px!important;padding:0 20px 0 16px!important}",
  ".bubble::after{font-size:16px}",
  ".panel{bottom:142px!important;right:16px!important;max-width:calc(100vw - 32px)!important;max-height:calc(100vh - 170px)!important}}",
].join("");

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
      {/* Ondo voice agent chat. The widget draws a small 56px emoji circle inside an open shadow root that page CSS
          can't reach, so we append our own <style> to that root: a larger "Chat with us" pill in brand colours, a
          gentle pulse to draw the eye, a roomier panel, and on phones we lift it above the mobile call bar. */}
      <Script id="ondo-style" strategy="afterInteractive">
        {`(function(){var css=${JSON.stringify(ondoCss)};
function fix(){for(var el of document.body.children){var r=el.shadowRoot;if(r&&r.querySelector('.bubble')&&!r.querySelector('style[data-eb]')){var s=document.createElement('style');s.setAttribute('data-eb','');s.textContent=css;r.appendChild(s);return true;}}return false;}
if(!fix()){var o=new MutationObserver(function(){if(fix())o.disconnect();});o.observe(document.body,{childList:true});}})();`}
      </Script>
      <Script src={site.ondoWidget.src} data-agent-id={site.ondoWidget.agentId} strategy="lazyOnload" />
    </div>
  );
}
