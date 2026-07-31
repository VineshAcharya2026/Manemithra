import { SectionHeader, SectionShell } from "../ui";
import { Card, IconBadge } from "../ui/Card";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Reveal } from "../../hooks/useScrollReveal";

export default function ServicesSection() {
  const { data } = useSiteContent("services");
  const header = data?.header ?? {};
  const items = data?.items ?? [];

  return (
    <SectionShell id="services" alt>
      <Reveal>
        <SectionHeader
          label={header.label}
          title={header.title}
          description={header.description}
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Reveal key={s.title}>
            <Card variant="elevated" className="flex h-full flex-col gap-4">
              <IconBadge icon={s.icon} />
              <h3 className="font-serif text-lg font-bold text-teal">{s.title}</h3>
              <p className="m-0 flex-1 font-sans text-sm leading-relaxed text-muted">
                {s.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
