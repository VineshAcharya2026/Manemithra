import { SectionHeader, SectionShell } from "./ui";
import { Card, IconBadge } from "./ui/Card";
import StatsGrid from "./StatsGrid";
import { Reveal } from "../hooks/useScrollReveal";

const FEATURES = [
  {
    icon: "🏗️",
    title: "10+ Years of Expert Experience",
    description:
      "Our hands-on experience sets the stage for exceptional home building. We pioneer approaches that tackle challenging projects and craft new possibilities in home construction, always aligned with your vision.",
  },
  {
    icon: "🥽",
    title: "VR360 Walkthrough Technology",
    description:
      "Our advanced VR360 walkthroughs let you visualize every corner of your dream home before a single brick is laid. Explore, adjust, and approve — all before construction begins.",
  },
  {
    icon: "📱",
    title: "Real-Time App Tracking",
    description:
      "Track your project's progress from anywhere via the Manemithra app. Monitor milestones, access drawings, review payment schedules, and download invoices — all in one place.",
  },
  {
    icon: "✏️",
    title: "Bespoke Architectural Designs",
    description:
      "Our in-house architects and planners bring fresh ideas to every project — from floor plans and elevations to door grills and lighting — ensuring your home is as unique as you are.",
  },
];

function FeatureBlock({ icon, title, description }) {
  return (
    <Card variant="elevated" className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
      <IconBadge icon={icon} />
      <div>
        <h3 className="mb-2 font-sans text-xl font-bold text-navy">{title}</h3>
        <p className="m-0 font-sans text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function About() {
  return (
    <SectionShell id="about">
      <Reveal>
        <SectionHeader
          label="About Manemithra"
          title="One-Stop Solution for Your Dream Home"
          description="With over 10 years of tireless experience in home construction, Manemithra combines traditional craftsmanship with modern innovation to deliver homes that stand the test of time."
        />
      </Reveal>

      <Reveal className="mb-14">
        <StatsGrid />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {FEATURES.map((f) => (
          <Reveal key={f.title}>
            <FeatureBlock {...f} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
