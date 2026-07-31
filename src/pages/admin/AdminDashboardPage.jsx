import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ROUTES } from "../../lib/routes";
import ProjectAdmin from "../../components/admin/ProjectAdmin";
import MediaAdmin from "../../components/admin/MediaAdmin";
import BrandAdmin from "../../components/admin/BrandAdmin";
import SectionFormAdmin from "../../components/admin/SectionFormAdmin";
import StatsCitiesAdmin from "../../components/admin/StatsCitiesAdmin";
import AboutGreenAdmin from "../../components/admin/AboutGreenAdmin";
import CtasSettingsAdmin from "../../components/admin/CtasSettingsAdmin";
import PartnersAdmin from "../../components/admin/PartnersAdmin";
import { seedDefaults } from "../../lib/seedData";

const TABS = [
  { id: "brand", label: "Brand" },
  { id: "services", label: "Services" },
  { id: "whyTrust", label: "Why & Trust" },
  { id: "packages", label: "Packages" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQ" },
  { id: "steps", label: "How It Works" },
  { id: "stats", label: "Stats" },
  { id: "cities", label: "Cities" },
  { id: "aboutGreen", label: "About & Green" },
  { id: "partners", label: "Partners" },
  { id: "settings", label: "CTAs & Settings" },
  { id: "projects", label: "Projects" },
  { id: "media", label: "Media" },
];

function TabPanel({ tab }) {
  switch (tab) {
    case "brand":
      return <BrandAdmin />;
    case "services":
      return <SectionFormAdmin sectionId="services" />;
    case "whyTrust":
      return (
        <div className="flex flex-col gap-10">
          <SectionFormAdmin sectionId="whyChooseUs" />
          <SectionFormAdmin sectionId="commitments" />
        </div>
      );
    case "packages":
      return <SectionFormAdmin sectionId="packages" />;
    case "testimonials":
      return <SectionFormAdmin sectionId="testimonials" />;
    case "faqs":
      return <SectionFormAdmin sectionId="faqs" />;
    case "steps":
      return <SectionFormAdmin sectionId="steps" />;
    case "stats":
      return <StatsCitiesAdmin />;
    case "cities":
      return <SectionFormAdmin sectionId="cities" />;
    case "aboutGreen":
      return <AboutGreenAdmin />;
    case "partners":
      return <PartnersAdmin />;
    case "settings":
      return <CtasSettingsAdmin />;
    case "projects":
      return <ProjectAdmin />;
    case "media":
      return <MediaAdmin />;
    default:
      return null;
  }
}

export default function AdminDashboardPage() {
  const { user, logout } = useAdminAuth();
  const [tab, setTab] = useState("brand");
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  const handleSeed = async () => {
    if (!confirm("Import all sample site content, projects, and press items? Skips sections that already exist.")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const result = await seedDefaults();
      setSeedMsg(
        `Done: ${result.content} content sections, ${result.projects} projects, ${result.media} press items.`
      );
    } catch (err) {
      setSeedMsg(err.message || "Seed failed.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-gray-light bg-white px-[5%] py-4 shadow-card-sm">
        <div className="container-main flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl font-bold text-teal">Content admin</h1>
            <p className="text-xs text-muted">{user?.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-secondary !text-xs" onClick={handleSeed} disabled={seeding}>
              {seeding ? "Importing…" : "Import sample data"}
            </button>
            <Link to={ROUTES.home} className="text-sm text-gold hover:underline">
              View site
            </Link>
            <button type="button" className="btn-secondary !text-xs" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
        {seedMsg && <p className="container-main mt-2 text-sm text-teal">{seedMsg}</p>}
      </header>

      <div className="border-b border-gray-light bg-white px-[5%]">
        <div className="container-main flex flex-wrap gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`cursor-pointer whitespace-nowrap border-b-2 px-3 py-3 font-sans text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "border-gold text-gold"
                  : "border-transparent text-muted hover:text-teal"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-[5%] py-8">
        <div className="container-main">
          <TabPanel tab={tab} />
        </div>
      </main>
    </div>
  );
}
