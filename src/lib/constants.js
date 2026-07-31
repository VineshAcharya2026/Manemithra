/** Brand — Mane Mithra brand guidelines */
export const BRAND = {
  name: "Mane Mithra",
  tagline: "A home of comfort and happiness",
  pillars: "Dynamic · Modern · Trusted",
  promise:
    "Mane Mithra is more than a construction company. We are the trusted friend who transforms dreams into homes, delivering quality, transparency, and happiness at every step of the journey.",
  values: [
    "Trust",
    "Quality",
    "Transparency",
    "Innovation",
    "Commitment",
    "Customer Happiness",
  ],
  positioning:
    "Premium yet approachable Indian home construction for residential builds, villa developments, and custom homes across India.",
};

/** Site-wide statistics — used in hero bar & stats grid sections */
export const SITE_STATS = [
  { value: "10", suffix: "+", label: "Years of Excellence", icon: "📅" },
  { value: "18", suffix: "+", label: "Cities Served", icon: "🌆" },
  { value: "750", suffix: "+", label: "Homes Delivered", icon: "🏠" },
  { value: "96", suffix: "%", label: "On-Time Handover", icon: "✅" },
];

export const HERO_STATS = [
  { value: "10", suffix: "+", label: "YEARS" },
  { value: "18", suffix: "+", label: "CITIES" },
  { value: "750", suffix: "+", label: "HOMES" },
  { value: "5.1", suffix: "M+", label: "SQ. FT BUILD AREA" },
];

export { NAV_LINKS, FOOTER_LINKS, ROUTES } from "./routes";

/** Core construction services */
export const SERVICES = [
  {
    icon: "🏠",
    title: "Turnkey Home Construction",
    description:
      "End-to-end design, build, and handover for independent homes — one accountable partner from blueprint to keys.",
  },
  {
    icon: "🏛️",
    title: "Villa & Luxury Builds",
    description:
      "Premium villas and large-format residences with bespoke architecture, high-end finishes, and dedicated project leadership.",
  },
  {
    icon: "📐",
    title: "Architectural Design",
    description:
      "In-house architects deliver floor plans, elevations, 3D visuals, and Vaastu-aligned layouts tailored to your plot and lifestyle.",
  },
  {
    icon: "🔧",
    title: "Structural & MEP",
    description:
      "Complete structural, electrical, plumbing, and sanction support — engineered for safety, compliance, and long-term durability.",
  },
  {
    icon: "🌿",
    title: "Green & Sustainable Homes",
    description:
      "IGBC-oriented builds with energy-efficient design, rainwater harvesting, and eco materials for lower lifetime running costs.",
  },
  {
    icon: "📱",
    title: "Project Management & App",
    description:
      "Dedicated managers, milestone tracking, and the Mane Mithra app for drawings, payments, and real-time site progress.",
  },
];

/** Business differentiators */
export const WHY_CHOOSE_US = [
  {
    icon: "💰",
    title: "Fixed-Cost Transparency",
    description: "Package pricing is clear upfront. Changes are documented in writing — no surprise bills mid-build.",
  },
  {
    icon: "👷",
    title: "100% In-House Execution",
    description: "We never subcontract. Your home is built by our own teams for consistent quality and accountability.",
  },
  {
    icon: "📋",
    title: "Statutory Compliance",
    description: "GST-inclusive quotes, soil tests, plan sanctions, and regulatory liaison handled by our experts.",
  },
  {
    icon: "⏱️",
    title: "On-Time Handover",
    description: "Structured schedules, monthly reviews, and a 96%+ on-time handover track record across projects.",
  },
];

/** Service geography */
export const SERVICE_CITIES = [
  { name: "Bengaluru", highlight: "Primary hub", projects: "500+" },
  { name: "Mysuru", highlight: "Active region", projects: "80+" },
  { name: "Coimbatore", highlight: "Growing market", projects: "45+" },
  { name: "Hosur", highlight: "Now serving", projects: "30+" },
  { name: "Mangaluru", highlight: "Coastal builds", projects: "25+" },
  { name: "Hubballi", highlight: "North Karnataka", projects: "20+" },
];

/** Business commitments / trust strip */
export const BUSINESS_COMMITMENTS = [
  { label: "Fixed-cost packages", icon: "✓" },
  { label: "No subcontracting", icon: "✓" },
  { label: "In-house architects", icon: "✓" },
  { label: "GST-inclusive pricing", icon: "✓" },
  { label: "Real-time app tracking", icon: "✓" },
  { label: "Dedicated project manager", icon: "✓" },
];

export const STEPS = [
  {
    title: "Let's Get Started",
    icon: "🚀",
    desc: "Share your vision with our experts. We listen carefully, clarify every detail, and provide a transparent project estimate aligned with your budget and goals.",
    points: [
      "Understanding your construction requirements",
      "Defining criteria, timeline, and budget together",
    ],
  },
  {
    title: "Design Specifications",
    icon: "📐",
    desc: "Our in-house architects craft your home from concept to detailed 3D visuals — so you can see, refine, and approve before construction begins.",
    points: [
      "3D architectural floor plan & elevation designs",
      "Vaastu-compliant layouts tailored to you",
    ],
  },
  {
    title: "Client Agreement",
    icon: "📝",
    desc: "Once design is approved, costs are fixed in writing. No hidden charges — only the quality, transparency, and commitment our brand stands for.",
    points: [
      "No subcontracting — in-house execution only",
      "Full transparency from contract to handover",
    ],
  },
  {
    title: "Construction & Updates",
    icon: "🏗️",
    desc: "Construction begins within 30–45 days of signing. Stay informed with regular reviews, expert material guidance, and clear communication at every stage.",
    points: [
      "Real-time progress tracking via the Mane Mithra app",
      "Dedicated project management throughout",
    ],
  },
  {
    title: "Site Visits",
    icon: "👷",
    desc: "Architects, structural engineers, and project managers visit your site regularly to uphold safety, quality, and craftsmanship you can trust.",
    points: [
      "Comprehensive site and material management",
      "Periodic quality & safety audits",
    ],
  },
  {
    title: "Completion & Handover",
    icon: "🔑",
    desc: "Your journey ends with a home built to delight — final inspection, handover kit, and ongoing support so comfort and happiness last long after move-in.",
    points: [
      "Complete final inspection and handover kit",
      "Ongoing support & satisfaction assurance",
    ],
  },
];

export const PACKAGES = [
  {
    name: "Essential",
    price: "₹1,680",
    unit: "/sq.ft",
    features: [
      "Structural work",
      "Basic flooring",
      "Standard fixtures",
      "Interior paint",
      "Electrical & plumbing",
    ],
    featured: false,
    dot: "bg-teal",
  },
  {
    name: "Premium",
    price: "₹1,899",
    unit: "/sq.ft",
    features: [
      "Everything in Essential",
      "Modular kitchen",
      "Premium flooring",
      "Branded fixtures",
      "False ceiling",
    ],
    featured: true,
    dot: "bg-gold",
  },
  {
    name: "Luxury",
    price: "₹2,370",
    unit: "/sq.ft",
    features: [
      "Everything in Premium",
      "Custom furniture",
      "Smart home basics",
      "Premium paint finish",
      "Landscaping",
    ],
    featured: false,
    dot: "bg-silver",
  },
  {
    name: "The One+",
    price: "₹3,099",
    unit: "/sq.ft",
    features: [
      "Everything in Luxury",
      "Full smart home",
      "Pool/garden design",
      "VIP project manager",
      "5-yr maintenance",
    ],
    featured: false,
    dot: "bg-black",
  },
  {
    name: "Green Home",
    price: "₹1,900",
    unit: "/sq.ft",
    features: [
      "IGBC certified build",
      "Solar-ready structure",
      "Rainwater harvesting",
      "Eco materials",
      "Energy-efficient design",
    ],
    featured: false,
    dot: "bg-gold",
  },
];

const HANUMANTH_IMAGES = [
  "/projects/hanumanth-gowda/cover.jpg",
  "/projects/hanumanth-gowda/01.jpg",
  "/projects/hanumanth-gowda/02.jpg",
  "/projects/hanumanth-gowda/03.jpg",
  "/projects/hanumanth-gowda/04.jpg",
  "/projects/hanumanth-gowda/05.jpg",
  "/projects/hanumanth-gowda/06.jpg",
  "/projects/hanumanth-gowda/07.jpg",
  "/projects/hanumanth-gowda/08.jpg",
  "/projects/hanumanth-gowda/09.jpg",
  "/projects/hanumanth-gowda/10.jpg",
  "/projects/hanumanth-gowda/11.jpg",
  "/projects/hanumanth-gowda/12.jpg",
  "/projects/hanumanth-gowda/13.jpg",
  "/projects/hanumanth-gowda/14.jpg",
  "/projects/hanumanth-gowda/15.jpg",
];

const BENGALURU_G2_IMAGES = [
  "/projects/bengaluru-g2/cover.jpg",
  "/projects/bengaluru-g2/01.jpg",
  "/projects/bengaluru-g2/02.jpg",
  "/projects/bengaluru-g2/03.jpg",
  "/projects/bengaluru-g2/04.jpg",
  "/projects/bengaluru-g2/05.jpg",
  "/projects/bengaluru-g2/06.jpg",
  "/projects/bengaluru-g2/07.jpg",
  "/projects/bengaluru-g2/08.jpg",
  "/projects/bengaluru-g2/09.jpg",
  "/projects/bengaluru-g2/10.jpg",
  "/projects/bengaluru-g2/11.jpg",
  "/projects/bengaluru-g2/12.jpg",
  "/projects/bengaluru-g2/13.jpg",
  "/projects/bengaluru-g2/14.jpg",
  "/projects/bengaluru-g2/15.jpg",
  "/projects/bengaluru-g2/16.jpg",
  "/projects/bengaluru-g2/17.jpg",
  "/projects/bengaluru-g2/18.jpg",
  "/projects/bengaluru-g2/19.jpg",
  "/projects/bengaluru-g2/20.jpg",
  "/projects/bengaluru-g2/21.jpg",
  "/projects/bengaluru-g2/22.jpg",
  "/projects/bengaluru-g2/23.jpg",
  "/projects/bengaluru-g2/24.jpg",
  "/projects/bengaluru-g2/25.jpg",
  "/projects/bengaluru-g2/26.jpg",
  "/projects/bengaluru-g2/27.jpg",
  "/projects/bengaluru-g2/28.jpg",
  "/projects/bengaluru-g2/29.jpg",
  "/projects/bengaluru-g2/30.jpg",
];

export const PROJECT_ITEMS = [
  {
    loc: "Near Sambhram College, Bengaluru",
    area: "30×40 plot",
    floors: "G+1",
    price: "",
    client: "Hanumanth Gowda",
    city: "Bengaluru",
    bg: "from-[#D4C5B5] to-[#8B7355]",
    image: HANUMANTH_IMAGES[0],
    images: HANUMANTH_IMAGES,
  },
  {
    loc: "Bengaluru",
    area: "",
    floors: "G+2",
    price: "",
    client: "",
    city: "Bengaluru",
    bg: "from-[#BFC9D4] to-[#5A6B7A]",
    image: BENGALURU_G2_IMAGES[0],
    images: BENGALURU_G2_IMAGES,
  },
];

export const TESTIMONIALS = [
  {
    name: "Deepa R.",
    location: "Bengaluru",
    quote:
      "From first consultation to final handover, the Mane Mithra team made the entire journey stress-free. Our home was delivered on time — quality and transparency at every step.",
    rating: 5,
  },
  {
    name: "Krishna Prasad",
    location: "Mysuru",
    quote:
      "The VR360 walkthrough let us refine designs before any work started. The transparency throughout construction was genuinely impressive — exactly what we hoped for.",
    rating: 5,
  },
  {
    name: "Sowmyashree & Kiran",
    location: "Tippasandra",
    quote:
      "We wanted a builder we could trust completely. Mane Mithra's fixed-cost model and app tracking won us over — no surprises, no hidden charges, just commitment.",
    rating: 5,
  },
  {
    name: "Arpitha M.",
    location: "Jayanagar",
    quote:
      "Our green home stays cool in peak summer and our bills have dropped sharply. Comfort, innovation, and care — Mane Mithra delivered on every promise.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "What is the cost per square foot to build a house with Mane Mithra?",
    a: "Our packages start from ₹1,680 per sq.ft. and go up to ₹3,099+ per sq.ft. depending on the package, design choices, and materials selected.",
  },
  {
    q: "Is the quoted cost final?",
    a: "The base package cost is fixed and transparent. Additional charges apply only for client-requested customisations or upgrades, agreed upon in writing before execution.",
  },
  {
    q: "What is included in the package?",
    a: "Packages include complete architectural, MEP & structural drawings, all civil construction with finishing, paint, sanitary fixtures, soil tests, plan sanction liaison, and all applicable taxes.",
  },
  {
    q: "Are taxes included in the quoted price?",
    a: "Yes — GST and all applicable taxes are included within the package pricing. Mane Mithra is fully statutorily compliant with no surprise charges.",
  },
  {
    q: "Does Mane Mithra subcontract work to third parties?",
    a: "No. All construction work is executed by our in-house teams. We never subcontract, ensuring consistent quality, accountability, and your peace of mind throughout the project.",
  },
];
