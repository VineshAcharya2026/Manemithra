import { Card } from "./ui/Card";
import { useSiteContent } from "../hooks/useSiteContent";
import { Reveal } from "../hooks/useScrollReveal";

export default function Brands() {
  const { data } = useSiteContent("partners");
  const header = data?.header ?? "Our Trusted Material Partners";
  const items = data?.items ?? [];

  return (
    <section className="section-surface-alt px-[5%] py-16 md:py-20">
      <div className="container-main">
        <Reveal>
          <p className="mb-8 text-center font-sans text-[11px] font-bold tracking-[0.15em] text-muted uppercase">
            {header}
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {items.map((b) => (
            <Reveal key={b.name}>
              <Card
                variant="flat"
                padding="sm"
                className="flex items-center justify-center !py-4 text-center"
              >
                {b.imageUrl ? (
                  <img src={b.imageUrl} alt={b.name} className="max-h-8 max-w-full object-contain" />
                ) : (
                  <span className="font-sans text-[13px] font-semibold text-teal transition-colors group-hover/card:text-gold">
                    {b.name}
                  </span>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
