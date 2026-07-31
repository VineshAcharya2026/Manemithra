import { SectionHeader, SectionShell } from "../ui";
import { Card } from "../ui/Card";
import { useSiteContent } from "../../hooks/useSiteContent";
import { Reveal } from "../../hooks/useScrollReveal";

export default function WhyChooseUs() {
  const { data: brand } = useSiteContent("brand");
  const { data } = useSiteContent("whyChooseUs");
  const items = data?.items ?? [];

  return (
    <section id="why-us" className="section-pad bg-teal">
      <div className="container-main">
        <Reveal>
          <SectionHeader
            light
            label="Why Mane Mithra"
            title="Built on Trust, Transparency & Craftsmanship"
            description={brand?.positioning}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Reveal key={item.title}>
              <Card
                variant="dark"
                padding="md"
                className="h-full !border-gold/20 !bg-teal-dark text-center"
              >
                <div className="mb-3 text-3xl" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-serif text-base font-bold text-gold">{item.title}</h3>
                <p className="m-0 font-sans text-[13px] leading-relaxed text-silver/85">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
