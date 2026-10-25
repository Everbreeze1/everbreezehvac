export type Area = {
  slug: string;
  name: string;
  utility: "SMUD" | "PG&E" | "Roseville Electric";
  blurb: string;
  neighborhoods: string[];
};

// TODO(Jon): confirm this list matches where you want work, and add or remove cities.
export const areas: Area[] = [
  {
    slug: "sacramento",
    name: "Sacramento",
    utility: "SMUD",
    blurb:
      "From older bungalows in East Sacramento and Land Park to newer homes in Natomas, we work on every kind of system in the city, including plenty of original ductwork that needs attention.",
    neighborhoods: ["East Sacramento", "Land Park", "Natomas", "Pocket", "Curtis Park", "Arden-Arcade"],
  },
  {
    slug: "elk-grove",
    name: "Elk Grove",
    utility: "SMUD",
    blurb:
      "Many Elk Grove homes were built in the 2000s and their original AC and furnace are now reaching the end of their life. That makes it a good time to look at a heat pump and SMUD's rebates.",
    neighborhoods: ["Laguna", "East Franklin", "Sheldon", "Elk Grove Village"],
  },
  {
    slug: "rancho-cordova",
    name: "Rancho Cordova",
    utility: "SMUD",
    blurb:
      "We handle repairs, replacements and maintenance across Rancho Cordova, from established neighborhoods to new construction around the Sunridge and Anatolia areas.",
    neighborhoods: ["Anatolia", "Sunridge", "Capital Village", "Cordova Meadows"],
  },
  {
    slug: "citrus-heights",
    name: "Citrus Heights",
    utility: "SMUD",
    blurb:
      "Citrus Heights has a lot of 1970s and 1980s homes with older equipment and ducts. We help homeowners decide what to repair now and what to plan to replace.",
    neighborhoods: ["Sunrise", "Arcade Creek", "Rusch Park"],
  },
  {
    slug: "carmichael",
    name: "Carmichael",
    utility: "SMUD",
    blurb:
      "Larger lots and older homes in Carmichael often mean long duct runs and uneven temperatures. We'll find the cause, not just swap the equipment.",
    neighborhoods: ["Old Carmichael", "Del Dayo", "Mission Oaks"],
  },
  {
    slug: "roseville",
    name: "Roseville",
    utility: "Roseville Electric",
    blurb:
      "Roseville summers are some of the hottest in the region. We repair and replace AC systems and heat pumps across the city, and we'll point you to Roseville Electric's own efficiency programs.",
    neighborhoods: ["West Roseville", "Fiddyment Farm", "Sun City Roseville", "Highland Reserve"],
  },
  {
    slug: "folsom",
    name: "Folsom",
    utility: "PG&E",
    blurb:
      "From Empire Ranch to Folsom Ranch, we install and service high-efficiency systems sized for Folsom's hot summers and chilly winter mornings.",
    neighborhoods: ["Empire Ranch", "Folsom Ranch", "Broadstone", "Historic Folsom"],
  },
  {
    slug: "west-sacramento",
    name: "West Sacramento",
    utility: "PG&E",
    blurb:
      "We serve homes and businesses across West Sacramento, including the newer Bridge District and Southport developments.",
    neighborhoods: ["Southport", "Bridge District", "Bryte", "Broderick"],
  },
  {
    slug: "davis",
    name: "Davis",
    utility: "PG&E",
    blurb:
      "Davis summers get hot and the city is serious about energy efficiency. We help homeowners and rentals near campus keep cool, cut bills and move to all-electric heat pumps.",
    neighborhoods: ["Downtown", "North Davis", "South Davis", "East Davis", "West Davis", "Mace Ranch", "Wildhorse"],
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
