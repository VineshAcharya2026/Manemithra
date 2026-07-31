import {
  BRAND,
  HERO_STATS,
  SITE_STATS,
  SERVICES,
  WHY_CHOOSE_US,
  BUSINESS_COMMITMENTS,
  SERVICE_CITIES,
  STEPS,
  PACKAGES,
  TESTIMONIALS,
  FAQS,
} from "./constants";

/** All siteContent document IDs */
export const CONTENT_SECTION_IDS = [
  "brand",
  "stats",
  "services",
  "whyChooseUs",
  "commitments",
  "cities",
  "steps",
  "packages",
  "testimonials",
  "faqs",
  "aboutFeatures",
  "greenFeatures",
  "greenSection",
  "partners",
  "ctas",
  "settings",
];

const ABOUT_FEATURES = [
  {
    icon: "🏗️",
    title: "10+ Years of Trusted Experience",
    description:
      "A decade of delivering residential projects across India with the quality, precision, and innovation that define modern Indian construction — always aligned with your vision.",
  },
  {
    icon: "🥽",
    title: "VR360 Walkthrough Technology",
    description:
      "Visualize every corner of your future home before a single brick is laid. Explore, adjust, and approve with confidence — innovation at the heart of our process.",
  },
  {
    icon: "📱",
    title: "Real-Time App Tracking",
    description:
      "Track progress from anywhere via the Mane Mithra app. Monitor milestones, access drawings, review payments, and download invoices — transparency you can see.",
  },
  {
    icon: "✏️",
    title: "Bespoke Architectural Designs",
    description:
      "In-house architects and planners craft homes as unique as you are — from floor plans and elevations to finishes and lighting, with timeless, premium detailing.",
  },
];

const GREEN_FEATURES = [
  {
    icon: "🌱",
    title: "IGBC Certified Builds",
    desc: "Recognised and certified by the Indian Green Building Council for sustainable construction.",
  },
  {
    icon: "☀️",
    title: "Energy-Efficient Design",
    desc: "Passive cooling, natural ventilation, and solar-ready structures to minimise environmental impact.",
  },
  {
    icon: "💧",
    title: "Rainwater Harvesting",
    desc: "Integrated systems that save up to 40,000 litres of water per year for each home.",
  },
  {
    icon: "♻️",
    title: "Eco-Friendly Materials",
    desc: "Responsibly sourced, low-carbon materials that reduce your home's lifetime footprint.",
  },
];

const PARTNERS = [
  { name: "Kamdhenu Steel", imageUrl: "" },
  { name: "Kajaria Tiles", imageUrl: "" },
  { name: "Dr. Fixit", imageUrl: "" },
  { name: "ACC Cement", imageUrl: "" },
  { name: "UltraTech", imageUrl: "" },
  { name: "Asian Paints", imageUrl: "" },
  { name: "JSW Steel", imageUrl: "" },
  { name: "Bhuwalka Steel", imageUrl: "" },
];

/** Default payloads keyed by Firestore document ID */
export const CONTENT_DEFAULTS = {
  brand: {
    ...BRAND,
    logoDarkUrl: "/logo-dark.jpg",
    logoLightUrl: "/logo-light.jpg",
  },
  stats: {
    heroStats: HERO_STATS,
    siteStats: SITE_STATS,
  },
  services: {
    header: {
      label: "What We Build",
      title: "Complete Construction Solutions for Indian Homes",
      description:
        "From design to handover — residential, villa, and custom home projects delivered with one team, one contract, and full transparency.",
    },
    items: SERVICES,
  },
  whyChooseUs: { items: WHY_CHOOSE_US },
  commitments: { items: BUSINESS_COMMITMENTS },
  cities: { items: SERVICE_CITIES },
  steps: { items: STEPS },
  packages: { items: PACKAGES },
  testimonials: { items: TESTIMONIALS },
  faqs: { items: FAQS },
  aboutFeatures: { items: ABOUT_FEATURES },
  greenFeatures: { items: GREEN_FEATURES },
  greenSection: {
    label: "Eco-Friendly Living",
    title: "Green Home Construction",
    description:
      "Build a home that's kind to the planet without compromising on comfort or elegance. Our green home specialists design spaces that stay naturally cool in summer, save water year-round, and reduce your energy bills for decades.",
  },
  partners: {
    header: "Our Trusted Material Partners",
    items: PARTNERS,
  },
  ctas: {
    business: {
      label: "Start Your Project",
      title: "Ready to Build Your Dream Home?",
      description:
        "Book a free consultation with our construction experts. We'll assess your plot, discuss packages, and share a transparent estimate — no obligation.",
      bullets: [
        "Free site feasibility discussion",
        "Package & budget guidance",
        "Response within 24 hours",
      ],
      phone: "+919686796232",
    },
    contact: {
      label: "Let's Begin",
      title: "Transforming Dreams Into Homes",
      description:
        "Premium yet approachable Indian construction — quality, transparency, and happiness at every step across India, from concept to handover.",
      phone: "+919686796232",
    },
  },
  settings: {
    whatsapp: "919686796232",
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/" },
      { name: "Instagram", href: "https://www.instagram.com/" },
      { name: "LinkedIn", href: "https://www.linkedin.com/" },
      { name: "YouTube", href: "https://www.youtube.com/" },
    ],
  },
};

/** Merge Firestore data over defaults for a section */
export function mergeSection(sectionId, firestoreData) {
  const defaults = CONTENT_DEFAULTS[sectionId];
  if (!defaults) return firestoreData ?? null;
  if (!firestoreData) return defaults;
  if (Array.isArray(defaults)) return firestoreData;
  return deepMerge(defaults, firestoreData);
}

function deepMerge(base, override) {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const val = override[key];
    if (val === undefined || val === null) continue;
    if (
      typeof val === "object" &&
      !Array.isArray(val) &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], val);
    } else {
      result[key] = val;
    }
  }
  return result;
}
