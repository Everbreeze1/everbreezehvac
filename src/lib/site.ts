// Business facts used across the site. Fields set to null are hidden until filled in.
export const site = {
  name: "Everbreeze Heating And Air®",
  shortName: "Everbreeze",
  url: "https://www.everbreezehvac.com",
  tagline: "Your Indoor Weather Experts",
  description:
    "Licensed Sacramento HVAC contractor for AC repair, furnace and heat pump service, new system installs and maintenance. SMUD participating contractor. Call or book online.",
  phone: "(866) 383-7273",
  phoneHref: "tel:+18663837273",
  email: "contact@everbreezehvac.com",
  licenseNumber: "1114490" as string | null, // CSLB license, shown in the footer only
  streetAddress: null as string | null, // Jon: keep the street address off the site
  yearsInBusiness: 4 as number | null,
  city: "Sacramento",
  region: "CA",
  postalCode: "95829",
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM" },
    { days: "Emergencies", time: "24/7" },
  ],
  financingUrl: "https://www.avvance.com/flexible-financing.html?id=783171c6",
  // TODO(Jon): swap in the direct link to the BBB profile page.
  bbbUrl: "https://www.bbb.org/search?find_text=Everbreeze%20Heating%20and%20Air&find_loc=Sacramento%2C%20CA",
  // Profiles Google uses to connect the site to the business. TODO(Jon): paste the real links.
  social: {
    googleBusiness: null as string | null, // the "Share" link from your Google Business Profile
    facebook: null as string | null,
    instagram: null as string | null,
    yelp: null as string | null,
    nextdoor: null as string | null,
  },
  googleReviewsUrl: "https://www.google.com/search?q=Everbreeze+Heating+and+Air+Reviews",
  analytics: {
    ga4: "G-B2NML1G80R",
    googleAds: "AW-16775885852",
    leadConversion: "AW-16775885852/oT63CJ_6_tIcEJzorr8-",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Rebates", href: "/rebates" },
  { label: "Financing", href: "/financing" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const brands = [
  { name: "Trane", logo: "/images/brands/trane.svg" },
  { name: "Carrier", logo: "/images/brands/carrier.webp" },
  { name: "Lennox", logo: "/images/brands/lennox.webp" },
  { name: "Goodman", logo: "/images/brands/goodman.webp" },
  { name: "Rheem", logo: "/images/brands/rheem.webp" },
  { name: "Daikin", logo: "/images/brands/daikin.webp" },
  { name: "Bryant", logo: "/images/brands/bryant.webp" },
  { name: "Amana", logo: "/images/brands/amana.webp" },
];

export const workPhotos = [
  { src: "/images/work/furnace.webp", alt: "Goodman furnace installed in a Sacramento attic" },
  { src: "/images/work/mix.webp", alt: "Rooftop package unit installed on a home" },
  { src: "/images/work/heat-pump.webp", alt: "Goodman heat pump condenser installed beside a home" },
  { src: "/images/work/jony.webp", alt: "Package unit installed on a flat roof" },
  { src: "/images/work/rtu.webp", alt: "Rooftop package unit on a residential roof" },
  { src: "/images/work/roti.webp", alt: "Rooftop condenser mounted on a stand" },
];
