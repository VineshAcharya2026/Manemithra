import { SectionHeader, SectionShell } from "./ui";
import { Card, IconBadge } from "./ui/Card";
import StatsGrid from "./StatsGrid";
import SectionViewAll from "./SectionViewAll";
import { Reveal } from "../hooks/useScrollReveal";
import { useSiteContent } from "../hooks/useSiteContent";
import { ROUTES } from "../lib/routes";

function FeatureBlock({ icon, title, description }) {
  return (
    <Card variant="elevated" className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
      <IconBadge icon={icon} />
      <div>
        <h3 className="mb-2 font-serif text-xl font-bold text-teal">{title}</h3>
        <p className="m-0 font-sans text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function About({ preview = false }) {
  const { data: brand } = useSiteContent("brand");
  const { data } = useSiteContent("aboutFeatures");
  const allFeatures = data?.items ?? [];
  const features = preview ? allFeatures.slice(0, 2) : allFeatures;

  return (
    <SectionShell id="about" alt={preview}>
      <Reveal>
        <SectionHeader
          label={`About ${brand?.name}`}
          title="Your Trusted Partner in Building Dreams"
          description={brand?.promise}
        />
      </Reveal>

      <Reveal className={preview ? "mb-8" : "mb-14"}>
        <StatsGrid />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((f) => (
          <Reveal key={f.title}>
            <FeatureBlock {...f} />
          </Reveal>
        ))}
      </div>

      {preview && <SectionViewAll to={ROUTES.about} label="Why choose Mane Mithra" />}
    </SectionShell>
  );
}
