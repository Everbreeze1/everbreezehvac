export type Service = {
  slug: string;
  name: string;
  short: string; // one line for cards
  headline: string;
  intro: string;
  icon: "snowflake" | "flame" | "leaf" | "wrench" | "calendar" | "wind" | "building" | "droplet";
  image: string;
  imageAlt?: string;
  offer?: { label: string; amount: string };
  signs: { title: string; signsLead: string; items: string[] };
  includes: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "cooling",
    name: "AC Repair & Cooling",
    short: "Fast air conditioning repair and tune-ups for Sacramento summers.",
    headline: "AC repair in Sacramento, when it's 105° outside",
    intro:
      "When your air conditioner quits in July, you need someone who answers the phone and shows up. Our licensed technicians diagnose the real problem, explain your options in plain language, and give you the price before any work starts.",
    icon: "snowflake",
    image: "/images/work/heat-pump.webp",
    signs: {
      title: "Signs your AC needs service",
      signsLead: "Call us if you notice any of these:",
      items: [
        "Warm or weak airflow from the vents",
        "The system runs constantly but the house never cools down",
        "Ice on the refrigerant lines or outdoor unit",
        "Loud buzzing, grinding or clicking",
        "Water pooling around the indoor unit",
        "A sudden jump in your SMUD or PG&E bill",
      ],
    },
    includes: [
      "Full system diagnosis with an upfront price",
      "Repairs on all major brands",
      "Refrigerant leak checks and recharges",
      "Capacitor, contactor and fan motor replacement",
      "Thermostat troubleshooting and installs",
      "Honest repair-vs-replace advice",
    ],
    faqs: [
      {
        q: "Do you offer emergency AC repair?",
        a: "Yes. We offer 24/7 emergency service. Call us and tell us what's happening, and we'll get a technician to you as quickly as we can.",
      },
      {
        q: "Should I repair or replace my air conditioner?",
        a: "If your system is under about 10 years old and the repair is modest, repairing usually makes sense. If it's older, uses R-22 refrigerant, or needs a major part like a compressor, replacing it can save you money over time, and SMUD rebates can cover a big share of a high-efficiency heat pump. We'll give you both numbers so you can decide.",
      },
      {
        q: "Which brands do you service?",
        a: "We service all major brands, including Trane, Carrier, Lennox, Goodman, Rheem, Daikin, Bryant and Amana.",
      },
    ],
    metaTitle: "AC Repair Sacramento | 24/7 Air Conditioning Service | Everbreeze",
    metaDescription:
      "Licensed AC repair in Sacramento with upfront pricing and 24/7 emergency service. All major brands. Call Everbreeze Heating And Air® or book online.",
  },
  {
    slug: "heating",
    name: "Furnace & Heating Repair",
    short: "Furnace and heating repair to keep your home warm all winter.",
    headline: "Furnace and heating repair you can count on",
    intro:
      "Sacramento winters are short, but a cold house with kids or older family members is no joke. We repair gas furnaces, heat pumps and wall heaters, and we check every system for safety, including carbon monoxide risks, before we leave.",
    icon: "flame",
    image: "/images/work/furnace.webp",
    signs: {
      title: "Signs your heater needs attention",
      signsLead: "Don't wait for a cold snap if you notice:",
      items: [
        "Cold air coming from the vents",
        "The furnace turns on and off every few minutes",
        "A burning or gas smell (leave the house and call the gas company first)",
        "Yellow instead of blue burner flames",
        "Rooms that never warm up evenly",
        "A furnace that's more than 15 years old",
      ],
    },
    includes: [
      "Furnace and heat pump diagnosis and repair",
      "Ignitor, flame sensor and blower motor replacement",
      "Heat exchanger and carbon monoxide safety checks",
      "Thermostat and wiring repairs",
      "Pre-winter tune-ups",
      "Replacement quotes with rebate options",
    ],
    faqs: [
      {
        q: "How often should my furnace be serviced?",
        a: "Once a year, ideally in the fall before you need it. A tune-up catches worn parts early and keeps the system running safely and efficiently.",
      },
      {
        q: "My furnace is old. Should I replace it with a heat pump?",
        a: "Often, yes. A heat pump heats and cools in one system and is two to three times more efficient than a gas furnace. SMUD offers significant rebates for switching. See our rebates page for details.",
      },
      {
        q: "Do you repair wall heaters and older systems?",
        a: "Yes. Call us with the make and model if you have it, and we'll tell you what we can do.",
      },
    ],
    metaTitle: "Furnace Repair Sacramento | Heating Service | Everbreeze",
    metaDescription:
      "Furnace and heating repair in Sacramento by licensed technicians. Safety checks, tune-ups and 24/7 emergency service. Book online or call Everbreeze.",
  },
  {
    slug: "heat-pumps",
    name: "Heat Pumps",
    short: "High-efficiency heating and cooling, with SMUD rebates.",
    headline: "Switch to a heat pump and let SMUD help pay for it",
    intro:
      "A heat pump replaces both your furnace and your air conditioner with one quiet, efficient system. As a SMUD participating contractor, we handle the rebate paperwork for you, so the savings show up on your project, not months later.",
    icon: "leaf",
    image: "/images/ducted-heat-pump.webp",
    offer: { label: "SMUD rebate", amount: "Up to $3,000" },
    signs: {
      title: "Is a heat pump right for you?",
      signsLead: "A heat pump is a great fit if:",
      items: [
        "Your AC or furnace is 12 or more years old",
        "You're facing a major repair on either system",
        "Your summer or winter utility bills are high",
        "You want to stop burning gas inside your home",
        "You have rooms that are always too hot or too cold",
        "You're a SMUD customer and want to use available rebates",
      ],
    },
    includes: [
      "Free in-home assessment and load calculation",
      "Ducted and ductless (mini-split) options",
      "SMUD rebate paperwork handled for you",
      "Permits, installation and final inspection",
      "Old equipment removal and disposal",
      "Financing options through Avvance",
    ],
    faqs: [
      {
        q: "Do heat pumps work in Sacramento winters?",
        a: "Yes. Modern heat pumps heat efficiently well below freezing, and Sacramento rarely gets that cold. They're one of the best fits for our climate.",
      },
      {
        q: "How much are the SMUD rebates?",
        a: "Rebate amounts depend on the equipment and whether you're replacing gas heat. We'll tell you exactly what you qualify for during your free estimate. See the rebates page for current programs.",
      },
      {
        q: "Ducted or ductless?",
        a: "If your home already has ducts in good shape, a ducted heat pump is usually the most cost-effective choice. Ductless mini-splits are great for additions, garages and homes without ducts.",
      },
    ],
    metaTitle: "Heat Pump Installation Sacramento | SMUD Rebates | Everbreeze",
    metaDescription:
      "Heat pump installation in Sacramento from a SMUD participating contractor. We handle the rebate paperwork. Free estimates and financing available.",
  },
  {
    slug: "heat-pump-water-heaters",
    name: "Heat Pump Water Heaters",
    short: "Efficient heat pump water heater installs, with up to $4,000 back from SMUD.",
    headline: "Heat pump water heaters, installed right, with SMUD rebates",
    intro:
      "A heat pump water heater pulls heat from the air around it instead of burning gas, so it uses a fraction of the energy of a standard tank. We size it for your household, handle the electrical and venting details, and file the SMUD rebate paperwork for you.",
    icon: "droplet",
    image: "/images/bradford-white-heat-pump-water-heater.webp",
    imageAlt: "Bradford White AeroTherm heat pump water heater",
    offer: { label: "SMUD rebate", amount: "Up to $4,000" },
    signs: {
      title: "Is it time for a heat pump water heater?",
      signsLead: "It's a great fit if:",
      items: [
        "Your water heater is 10 or more years old",
        "The tank is leaking, rusty or making popping sounds",
        "You run out of hot water more often than you used to",
        "You want to move your home off gas",
        "Your gas or electric bill keeps climbing",
        "You're a SMUD customer and want to use the rebate",
      ],
    },
    includes: [
      "Free in-home assessment and sizing",
      "Gas-to-electric conversions and electric tank replacements",
      "Electrical circuit, condensate drain and venting handled",
      "SMUD rebate paperwork filed for you",
      "Permits, installation and final inspection",
      "Old tank removal and disposal",
    ],
    faqs: [
      {
        q: "How much is the SMUD rebate for a heat pump water heater?",
        a: "SMUD currently offers up to $4,000 when you replace a gas water heater with a heat pump water heater, and $1,000 when you replace an electric water heater. Amounts are set by SMUD and can change, so we confirm what you qualify for at your estimate.",
      },
      {
        q: "Will a heat pump water heater keep up with my family?",
        a: "Yes, when it's sized correctly. Most homes do well with a 50 to 80 gallon unit, and many models have a backup element for high-demand days. We'll recommend a size based on how many people live in your home.",
      },
      {
        q: "Where does it go?",
        a: "Usually in the same spot as your current water heater, most often the garage. It needs some air space around it and a drain for condensation, which we take care of during the install.",
      },
    ],
    metaTitle: "Heat Pump Water Heater Installation Sacramento | SMUD Rebates | Everbreeze",
    metaDescription:
      "Heat pump water heater installation in Sacramento with up to $4,000 in SMUD rebates for gas-to-electric conversions. We handle the paperwork. Book a free estimate.",
  },
  {
    slug: "installation",
    name: "New System Installation",
    short: "Right-sized AC, furnace and heat pump installs with clear pricing.",
    headline: "A new HVAC system, sized right and installed right",
    intro:
      "A new system is a big decision. We measure your home, explain the options at a few price points, and put every quote in writing. Then we install it, pull the permit, and clean up after.",
    icon: "wrench",
    image: "/images/work/mix.webp",
    signs: {
      title: "When replacement makes sense",
      signsLead: "It's usually time to replace when:",
      items: [
        "Your system is 12 to 15 years old or more",
        "Repairs are adding up year after year",
        "It still uses R-22 refrigerant",
        "Your energy bills keep rising",
        "Some rooms are always uncomfortable",
        "You're remodeling or adding square footage",
      ],
    },
    includes: [
      "Free in-home estimate with written options",
      "Load calculation so the system is sized correctly",
      "Air conditioners, furnaces, heat pumps and package units",
      "Permits and inspections",
      "Rebate and financing help",
      "Removal and disposal of old equipment",
    ],
    faqs: [
      {
        q: "How long does an installation take?",
        a: "Most replacements take one day. Larger jobs, like adding ductwork, can take two or three.",
      },
      {
        q: "Are estimates free?",
        a: "Yes. Replacement estimates are free and come with written options so you can compare.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes, through Avvance. Checking your options doesn't affect your credit score.",
      },
    ],
    metaTitle: "HVAC Installation Sacramento | New AC & Furnace | Everbreeze",
    metaDescription:
      "New AC, furnace and heat pump installation in Sacramento. Free written estimates, permits handled, SMUD rebates and financing available.",
  },
  {
    slug: "maintenance",
    name: "Maintenance & Tune-Ups",
    short: "Seasonal tune-ups that prevent breakdowns and lower bills.",
    headline: "Tune-ups that keep small problems from becoming big ones",
    intro:
      "Most breakdowns we see could have been caught early. A tune-up before summer and another before winter keeps your system efficient, safe and under warranty.",
    icon: "calendar",
    image: "/images/work/rtu.webp",
    signs: {
      title: "Why regular maintenance pays off",
      signsLead: "A yearly tune-up helps you:",
      items: [
        "Avoid breakdowns on the hottest and coldest days",
        "Lower your energy bills",
        "Extend the life of your equipment",
        "Keep manufacturer warranties valid",
        "Catch safety issues like gas leaks early",
        "Breathe cleaner air",
      ],
    },
    includes: [
      "Cooling tune-up: coils, refrigerant, electrical and drain checks",
      "Heating tune-up: burners, ignition, heat exchanger and safety checks",
      "Filter check and replacement",
      "Thermostat calibration",
      "A written report on your system's condition",
      "Commercial preventive maintenance contracts",
    ],
    faqs: [
      {
        q: "How often should I schedule maintenance?",
        a: "Twice a year: once in spring for cooling and once in fall for heating.",
      },
      {
        q: "Do you offer maintenance plans?",
        a: "Yes. Ask us about our maintenance plan when you book, which includes seasonal tune-ups and priority scheduling.",
      },
    ],
    metaTitle: "HVAC Maintenance & Tune-Ups Sacramento | Everbreeze",
    metaDescription:
      "AC and furnace tune-ups in Sacramento. Prevent breakdowns, lower your bills and keep your warranty valid. Book seasonal maintenance with Everbreeze.",
  },
  {
    slug: "indoor-air-quality",
    name: "Indoor Air Quality",
    short: "Filtration, duct cleaning and purification for healthier air.",
    headline: "Cleaner air for wildfire season and allergy season",
    intro:
      "Between wildfire smoke, valley dust and pollen, Sacramento air is tough on lungs. We'll help you choose the right filtration, purification and duct cleaning for your home, without upselling you on gadgets you don't need.",
    icon: "wind",
    image: "/images/blog/air-duct-cleaning.webp",
    signs: {
      title: "Signs your indoor air needs help",
      signsLead: "Look into your air quality if you notice:",
      items: [
        "Dust building up quickly after cleaning",
        "Allergy or asthma symptoms that are worse indoors",
        "Musty smells when the system turns on",
        "Smoke smell inside during fire season",
        "Visible dust or debris around vents",
        "Very dry or very humid air",
      ],
    },
    includes: [
      "High-MERV and media filter upgrades",
      "Whole-home air purifiers",
      "Air duct cleaning and sanitization",
      "Duct sealing and repair",
      "Humidifiers and dehumidifiers",
      "Fresh-air ventilation",
    ],
    faqs: [
      {
        q: "How often should ducts be cleaned?",
        a: "Every three to five years for most homes, or sooner if you have pets, recent renovation dust, or musty smells.",
      },
      {
        q: "Will a better filter help with wildfire smoke?",
        a: "Yes. A MERV 13 filter, if your system can handle it, catches most smoke particles. We'll check your system's airflow before recommending one.",
      },
    ],
    metaTitle: "Indoor Air Quality & Duct Cleaning Sacramento | Everbreeze",
    metaDescription:
      "Air purifiers, filtration upgrades and duct cleaning in Sacramento. Breathe easier during wildfire and allergy season. Book with Everbreeze.",
  },
  {
    slug: "commercial",
    name: "Commercial HVAC",
    short: "Rooftop units and maintenance contracts for businesses.",
    headline: "Commercial HVAC for Sacramento businesses",
    intro:
      "Property managers and businesses across the region trust us with rooftop units, split systems and ongoing maintenance. We work around your hours, keep you updated, and document every visit.",
    icon: "building",
    image: "/images/work/jony.webp",
    signs: {
      title: "Who we work with",
      signsLead: "We serve:",
      items: [
        "Property managers and HOAs",
        "Offices and retail",
        "Restaurants",
        "Warehouses and light industrial",
        "Public agencies",
        "Multi-family and rental properties",
      ],
    },
    includes: [
      "Rooftop package unit repair and replacement",
      "Preventive maintenance contracts",
      "Emergency service",
      "Tenant improvement HVAC",
      "Detailed service reports",
      "Multi-site and portfolio service",
    ],
    faqs: [
      {
        q: "Do you offer maintenance contracts?",
        a: "Yes. We'll build a schedule around your equipment and budget, with a report after every visit.",
      },
      {
        q: "Can you work after hours?",
        a: "Yes. We can schedule work outside business hours to avoid disrupting your operations.",
      },
    ],
    metaTitle: "Commercial HVAC Sacramento | Rooftop Units & Maintenance | Everbreeze",
    metaDescription:
      "Commercial HVAC repair, rooftop unit replacement and maintenance contracts in Sacramento. Trusted by property managers and businesses.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
