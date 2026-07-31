import { SectionHeader, SectionShell } from "../ui";
import { Card } from "../ui/Card";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Reveal } from "../../hooks/useScrollReveal";

export default function ServiceAreas() {
  const { data } = useSiteContent("cities");
  const items = data?.items ?? [];

  return (
    <SectionShell id="locations">
      <Reveal>
        <SectionHeader
          label="Where We Build"
          title="Serving Homeowners Across South India"
          description="Expanding presence across Karnataka and Tamil Nadu — with local teams, trusted vendors, and region-specific expertise."
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((city) => (
          <Reveal key={city.name}>
            <Card variant="flat" padding="md" className="text-center">
              <div className="mb-1 font-serif text-lg font-bold text-teal">{city.name}</div>
              <div className="mb-2 font-sans text-[10px] font-medium tracking-wide text-gold uppercase">
                {city.highlight}
              </div>
              <div className="font-sans text-xs text-muted">{city.projects} homes</div>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
