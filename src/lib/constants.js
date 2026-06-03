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

export const NAV_LINKS = [
  { label: "Why Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Homes", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

export const STEPS = [
  {
    title: "Let's Get Started",
    icon: "🚀",
    desc: "Enquire and schedule an appointment with our experts. Our technical sales executives will understand your requirements, address every detail, and provide a clear project estimate.",
    points: [
      "Understanding your construction requirements",
      "Defining your construction criteria & budget",
    ],
  },
  {
    title: "Design Specifications",
    icon: "📐",
    desc: "Our in-house architects begin the design process once the token advance is received, transforming your needs into a detailed 3D virtual blueprint.",
    points: [
      "3D architectural floor plan & elevation designs",
      "Vaastu-compliant design as per your preference",
    ],
  },
  {
    title: "Client Agreement",
    icon: "📝",
    desc: "Once design is approved, costs are finalized and we sign the stamp paper agreement. Transparent, fixed-cost pricing is guaranteed — no surprises.",
    points: [
      "No subcontracting of any kind",
      "Full transparency from contract start",
    ],
  },
  {
    title: "Construction & Updates",
    icon: "🏗️",
    desc: "Construction begins within 30–45 days of signing. Our execution team ensures full transparency through monthly reviews and expert material guidance.",
    points: [
      "Real-time progress tracking via the Manemithra App",
      "Clear communication at every stage",
    ],
  },
  {
    title: "Site Visits",
    icon: "👷",
    desc: "Regular site visits by architects, structural & MEP designers, and project managers ensure 100% quality and safety compliance throughout the build.",
    points: [
      "Comprehensive site and material management",
      "Periodic quality & safety team audits",
    ],
  },
  {
    title: "Completion & Handover",
    icon: "🔑",
    desc: "The final handover marks the successful completion of your journey with us. Your fully-finished home is handed over with an inspection kit and ongoing support.",
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
    dot: "bg-navy",
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
    dot: "bg-muted",
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

export const PROJECT_ITEMS = [
  {
    loc: "Kengeri, Bengaluru",
    area: "3,735 sqft",
    floors: "G+2.5",
    price: "₹75 Lakhs",
    bg: "from-[#D4C5B5] to-[#D4C5B588]",
  },
  {
    loc: "Mysuru",
    area: "3,100 sqft",
    floors: "G+1",
    price: "₹86 Lakhs",
    bg: "from-[#C5D0C0] to-[#C5D0C088]",
  },
  {
    loc: "Tippasandra, Bengaluru",
    area: "7,343 sqft",
    floors: "G+2.5",
    price: "₹2 Crores",
    bg: "from-[#BFC9D4] to-[#BFC9D488]",
  },
  {
    loc: "Jayanagar, Bengaluru",
    area: "4,530 sqft",
    floors: "G+2.5",
    price: "₹1 Crore",
    bg: "from-[#D4C5B0] to-[#D4C5B088]",
  },
  {
    loc: "Whitefield, Bengaluru",
    area: "2,536 sqft",
    floors: "G+1.5",
    price: "₹54 Lakhs",
    bg: "from-[#C8C2D4] to-[#C8C2D488]",
  },
  {
    loc: "Coimbatore",
    area: "2,800 sqft",
    floors: "G+1",
    price: "₹48 Lakhs",
    bg: "from-[#D4C8B8] to-[#D4C8B888]",
  },
];

export const TESTIMONIALS = [
  {
    name: "Deepa R.",
    location: "Bengaluru",
    quote:
      "From first consultation to final handover, Manemithra's team made the entire journey stress-free. Our home was delivered exactly on time and beyond our expectations.",
    rating: 5,
  },
  {
    name: "Krishna Prasad",
    location: "Mysuru",
    quote:
      "The VR360 walkthrough was a game-changer. We could tweak designs before any work started. The transparency throughout the construction phase was genuinely impressive.",
    rating: 5,
  },
  {
    name: "Sowmyashree & Kiran",
    location: "Tippasandra",
    quote:
      "We were skeptical about trusting any builder fully, but Manemithra's fixed-cost model and the app-tracking completely won us over. No surprises, no hidden charges.",
    rating: 5,
  },
  {
    name: "Arpitha M.",
    location: "Jayanagar",
    quote:
      "The green home package was exactly what we needed. Our electricity bill has dropped by almost half and the home stays cool even in peak summer — absolutely worth it.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "What is the cost per square foot to build a house with Manemithra?",
    a: "Our packages start from ₹1,680 per sq.ft. and go up to ₹3,099+ per sq.ft. depending on the package, design choices, and materials selected.",
  },
  {
    q: "Is the quoted cost final?",
    a: "The base package cost is fixed and transparent. Additional charges may apply only for client-requested customisations or upgrades, which are discussed and agreed upon in writing before execution.",
  },
  {
    q: "What is included in the package?",
    a: "Packages include complete architectural, MEP & structural drawings, all civil construction with finishing, paint, sanitary fixtures, soil tests, plan sanction liaison, and all applicable taxes.",
  },
  {
    q: "Are taxes included in the quoted price?",
    a: "Yes — GST and all applicable taxes are included within the package pricing. Manemithra is fully statutorily compliant with no surprise charges.",
  },
  {
    q: "Does Manemithra subcontract work to third parties?",
    a: "No. All construction work is executed by our in-house teams. We never subcontract, ensuring consistent quality, accountability, and your peace of mind throughout the project.",
  },
];
