/** App routes — used by navbar, footer, and router */
export const ROUTES = {
  home: "/",
  about: "/about",
  howItWorks: "/how-it-works",
  projects: "/projects",
  packages: "/packages",
  greenHomes: "/green-homes",
  testimonials: "/testimonials",
  faq: "/faq",
  contact: "/contact",
  admin: "/admin",
  adminDashboard: "/admin/dashboard",
};

export const NAV_LINKS = [
  { label: "Why Us", to: ROUTES.about },
  { label: "How It Works", to: ROUTES.howItWorks },
  { label: "Our Homes", to: ROUTES.projects },
  { label: "Packages", to: ROUTES.packages },
  { label: "Testimonials", to: ROUTES.testimonials },
  { label: "FAQ", to: ROUTES.faq },
  { label: "Contact", to: ROUTES.contact },
];

export const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Our Homes", to: ROUTES.projects },
    { label: "Green Homes", to: ROUTES.greenHomes },
    { label: "How It Works", to: ROUTES.howItWorks },
    { label: "Packages", to: ROUTES.packages },
  ],
  Company: [
    { label: "About Us", to: ROUTES.about },
    { label: "Testimonials", to: ROUTES.testimonials },
    { label: "FAQ", to: ROUTES.faq },
    { label: "Contact Us", to: ROUTES.contact },
  ],
  Legal: [
    { label: "Privacy Policy", to: ROUTES.contact },
    { label: "Terms & Conditions", to: ROUTES.contact },
    { label: "Sitemap", to: ROUTES.home },
  ],
};
