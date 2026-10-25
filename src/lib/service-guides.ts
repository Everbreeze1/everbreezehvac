// Longer, search-focused copy for each service page. Kept apart from services.ts so the
// card and hero copy stays short. Each guide answers what people actually type into Google.
export type ServiceGuide = {
  keyword: string; // main search phrase, used for city links like "AC repair in Elk Grove"
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[]; // added to the service's own FAQs
};

export const serviceGuides: Record<string, ServiceGuide> = {
  cooling: {
    keyword: "AC repair",
    sections: [
      {
        heading: "What happens on an AC repair visit",
        paragraphs: [
          "Your technician starts by asking what you've noticed, then checks the thermostat, the indoor coil and blower, the outdoor condenser, the electrical parts and the refrigerant pressures. Most air conditioner problems in Sacramento come down to a handful of causes: a failed capacitor or contactor, a clogged drain line, a dirty coil, a refrigerant leak or a worn fan motor.",
          "Once we find the cause, we explain it in plain language and give you a written price before we touch anything. If a repair doesn't make sense for an older system, we'll tell you that too, and show you what a replacement would cost after SMUD rebates.",
        ],
      },
      {
        heading: "Why Sacramento air conditioners fail in summer",
        paragraphs: [
          "Long stretches over 100°F make an AC run for hours without a break. That's when weak capacitors, low refrigerant and dirty condenser coils finally give out, usually on the hottest afternoon of the year. A spring tune-up catches most of these before the heat arrives.",
          "If your AC stops cooling, check that the thermostat is set to cool, replace a dirty filter and make sure the breaker hasn't tripped. If it still isn't cooling, turn the system off so a small problem doesn't turn into a compressor failure, and give us a call.",
        ],
      },
      {
        heading: "Emergency AC repair, 24/7",
        paragraphs: [
          "When the house is heating up and you have kids, pets or older family members at home, waiting until Monday isn't an option. We offer 24/7 emergency service across the Sacramento area, and you'll talk to a real person when you call.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my AC running but not cooling?",
        a: "The most common causes are a dirty air filter, a frozen evaporator coil, low refrigerant from a leak, or a failed capacitor in the outdoor unit. Replace the filter and check the breaker first. If it still isn't cooling, turn it off and call us so the compressor isn't damaged.",
      },
      {
        q: "How much does AC repair cost in Sacramento?",
        a: "It depends on what failed. A capacitor or contactor replacement is a small repair, while a refrigerant leak or compressor is a much bigger one. We diagnose first and give you a written price before any work starts, so there are no surprises.",
      },
    ],
  },
  heating: {
    keyword: "furnace repair",
    sections: [
      {
        heading: "What we check on every furnace repair",
        paragraphs: [
          "We test the ignitor and flame sensor, inspect the burners and heat exchanger, check the blower motor, filter and wiring, and confirm the furnace is venting safely. Every heating call includes a carbon monoxide safety check before we leave.",
          "The most common furnace repairs we make in Sacramento are dirty flame sensors, cracked ignitors, failed inducer or blower motors, and clogged filters that cause the furnace to overheat and shut itself off. You'll get a written price before we start.",
        ],
      },
      {
        heading: "Furnace short cycling or blowing cold air?",
        paragraphs: [
          "A furnace that turns on and off every few minutes is usually overheating from a clogged filter or a dirty flame sensor. Cold air from the vents can mean the ignitor failed, the pilot is out, or the thermostat is set to fan instead of heat. Start with the filter and the thermostat setting. If that doesn't fix it, we can.",
          "If you ever smell gas, leave the house, then call PG&E or 911 from outside before calling us.",
        ],
      },
      {
        heading: "Repair or replace with a heat pump?",
        paragraphs: [
          "If your furnace is more than 15 years old or needs a major part like a heat exchanger, it may be time to replace it. Many Sacramento homeowners replace an old gas furnace and AC with a single heat pump, and SMUD customers can get up to $3,000 back when they switch from gas. We'll give you both options in writing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my furnace keep shutting off?",
        a: "Usually a dirty filter that makes the furnace overheat, or a dirty flame sensor that can't confirm the burners lit. Both are quick fixes. If a new filter doesn't help, book a visit and we'll find the cause.",
      },
      {
        q: "Do you offer emergency furnace repair?",
        a: "Yes. We offer 24/7 emergency heating service across the Sacramento area.",
      },
    ],
  },
  "heat-pumps": {
    keyword: "heat pump installation",
    sections: [
      {
        heading: "How a heat pump works",
        paragraphs: [
          "A heat pump moves heat instead of making it. In summer it pulls heat out of your home like an air conditioner. In winter it runs in reverse and pulls heat from the outdoor air into your home. Because it moves heat rather than burning fuel, it can deliver two to three times more heat than the electricity it uses.",
          "Sacramento's mild winters make it one of the best climates in the country for heat pumps. One system replaces both your furnace and your AC.",
        ],
      },
      {
        heading: "SMUD heat pump rebates in Sacramento",
        paragraphs: [
          "SMUD offers rebates of up to $3,000 when you replace gas heating with a qualifying heat pump. As a SMUD participating contractor, we confirm what you qualify for, choose equipment that meets the program rules, and file the paperwork for you. Federal tax credits may also apply.",
          "If you're in Roseville Electric or PG&E territory, we'll walk you through the programs available to you instead.",
        ],
      },
      {
        heading: "Our heat pump installation process",
        paragraphs: [
          "We start with a free in-home assessment and a load calculation, so the system is sized for your home and not just matched to the old one. You get written options at a few price points. On install day we remove the old equipment, set the new system, pull the permit and schedule the city inspection. Most replacements take one day.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a heat pump cost in Sacramento?",
        a: "It depends on the size of your home, whether you have usable ductwork, and the efficiency level you choose. We give you written options after a free in-home assessment, with SMUD rebates and financing already factored in.",
      },
      {
        q: "Can a heat pump replace my furnace and AC?",
        a: "Yes. A heat pump heats and cools, so one system replaces both. That's why it's the most common upgrade we install for SMUD customers.",
      },
    ],
  },
  "heat-pump-water-heaters": {
    keyword: "heat pump water heater installation",
    sections: [
      {
        heading: "How a heat pump water heater saves energy",
        paragraphs: [
          "A standard water heater burns gas or runs an electric element to heat water. A heat pump water heater uses a small compressor to pull heat from the surrounding air and move it into the tank, which uses far less energy. In a Sacramento garage, where it's warm much of the year, they work especially well.",
        ],
      },
      {
        heading: "SMUD water heater rebates",
        paragraphs: [
          "SMUD currently offers up to $1,600 when you replace a gas water heater with a heat pump water heater, and $1,000 when you replace an electric one. We handle the paperwork for you and confirm what you qualify for at your estimate. Amounts are set by SMUD and can change.",
        ],
      },
      {
        heading: "What a gas-to-electric conversion involves",
        paragraphs: [
          "Switching from gas usually means adding a 240-volt circuit, capping the gas line, and adding a condensate drain. We look at all of that at your free estimate and include it in your written price, so nothing comes up on install day. Most installs are done in a day.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a heat pump water heater last?",
        a: "Most last 10 to 15 years with basic care, like keeping the air filter clean and flushing the tank periodically.",
      },
      {
        q: "Are heat pump water heaters noisy?",
        a: "They make a low hum, similar to a refrigerator, while the compressor runs. In a garage most people don't notice it.",
      },
    ],
  },
  installation: {
    keyword: "HVAC installation",
    sections: [
      {
        heading: "Why sizing matters more than the brand",
        paragraphs: [
          "An oversized system cools the house fast but turns on and off constantly, which wastes energy and leaves rooms clammy. An undersized one runs all day in July and never catches up. We do a load calculation based on your home's square footage, insulation, windows and ducts, so the new system fits the house.",
          "We install all major brands and will recommend equipment based on your home and budget, not a sales target.",
        ],
      },
      {
        heading: "What's included in a new system install",
        paragraphs: [
          "Every installation includes removal and disposal of your old equipment, new refrigerant lines or line flush as needed, a new thermostat if you want one, a city permit and the final inspection. We test the system, show you how to use it, and clean up before we leave.",
        ],
      },
      {
        heading: "Rebates and financing",
        paragraphs: [
          "If you're a SMUD customer, switching from gas heat to a heat pump can earn up to $3,000 back, and we file the paperwork for you. Financing is available through Avvance, and checking your options doesn't affect your credit score.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a new HVAC system cost in Sacramento?",
        a: "It depends on the size of your home, the type of system and the efficiency you choose. We give you a free written estimate with a few options so you can compare, with rebates and financing shown up front.",
      },
      {
        q: "Do you pull permits?",
        a: "Yes. Every installation includes the permit and the final city inspection.",
      },
    ],
  },
  maintenance: {
    keyword: "HVAC maintenance",
    sections: [
      {
        heading: "What's included in a tune-up",
        paragraphs: [
          "A cooling tune-up covers the condenser and evaporator coils, refrigerant pressures, capacitors and contactors, the condensate drain, and airflow. A heating tune-up covers the burners, ignitor, flame sensor, heat exchanger, venting and a carbon monoxide check. Both include a filter check, thermostat calibration and a written report on your system.",
        ],
      },
      {
        heading: "When to schedule AC and furnace maintenance in Sacramento",
        paragraphs: [
          "Book your AC tune-up in March, April or May, before the first heat wave. Book your furnace tune-up in September or October, before the first cold morning. Scheduling ahead of the rush also means you're not waiting days for an appointment when something breaks.",
          "Most manufacturers require yearly maintenance to keep the warranty valid, so a tune-up protects your investment too.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is an AC tune-up worth it?",
        a: "Yes. A tune-up catches worn capacitors, low refrigerant and dirty coils before they cause a breakdown, keeps the system running efficiently, and keeps most manufacturer warranties valid.",
      },
      {
        q: "How long does a tune-up take?",
        a: "Most tune-ups take about an hour per system.",
      },
    ],
  },
  "indoor-air-quality": {
    keyword: "indoor air quality and duct cleaning",
    sections: [
      {
        heading: "Wildfire smoke, dust and allergies in the Sacramento Valley",
        paragraphs: [
          "Sacramento gets a mix of wildfire smoke in late summer, dust from farmland, and heavy pollen in spring. Your HVAC system moves all of your home's air several times a day, so it's the best place to clean it up.",
          "We start by checking your system's airflow and filter setup, then recommend what will actually help: a better filter, a whole-home air purifier, duct sealing, or a duct cleaning.",
        ],
      },
      {
        heading: "Air duct cleaning and sealing",
        paragraphs: [
          "Over time ducts collect dust, pet hair and construction debris, and leaky ducts pull in dusty air from the attic. We clean and sanitize the duct system and seal leaks so the air you're paying to heat and cool actually reaches your rooms.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is air duct cleaning worth it?",
        a: "It's worth it if you have visible dust coming from vents, musty smells, recent remodeling, pets, or ducts that haven't been cleaned in five years or more. If your ducts are in good shape, we'll tell you.",
      },
      {
        q: "What's the best air purifier for wildfire smoke?",
        a: "For most homes, a MERV 13 filter or a whole-home media filter catches most smoke particles, as long as your system has the airflow for it. We'll check before recommending one.",
      },
    ],
  },
  commercial: {
    keyword: "commercial HVAC",
    sections: [
      {
        heading: "Rooftop unit repair and replacement",
        paragraphs: [
          "Most commercial buildings in the Sacramento area run on rooftop package units. We repair and replace them, handle crane lifts when needed, and coordinate around your business hours so your tenants and customers stay comfortable.",
        ],
      },
      {
        heading: "Preventive maintenance contracts",
        paragraphs: [
          "A maintenance contract keeps your equipment on a schedule, with a written report after every visit so you have a record for owners, auditors or warranty claims. We'll build the schedule around your equipment and budget, from a single office to a multi-site portfolio.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you work with property managers?",
        a: "Yes. We work with property managers, HOAs and multi-site owners, and we document every visit so you can share it with owners and tenants.",
      },
    ],
  },
};

export const getServiceGuide = (slug: string) => serviceGuides[slug];
