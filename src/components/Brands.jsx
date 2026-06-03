import { Card } from "./ui/Card";
import { Reveal } from "../hooks/useScrollReveal";

const BRANDS = [
  "Kamdhenu Steel",
  "Kajaria Tiles",
  "Dr. Fixit",
  "ACC Cement",
  "UltraTech",
  "Asian Paints",
  "JSW Steel",
  "Bhuwalka Steel",
];

export default function Brands() {
  return (
    <section className="section-surface-alt px-[5%] py-16 md:py-20">
      <div className="container-main">
        <Reveal>
          <p className="mb-8 text-center font-sans text-[11px] font-bold tracking-[0.15em] text-muted uppercase">
            Our Trusted Material Partners
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {BRANDS.map((b) => (
            <Reveal key={b}>
              <Card
                variant="flat"
                padding="sm"
                className="flex items-center justify-center !py-4 text-center"
              >
                <span className="font-sans text-[13px] font-semibold text-navy transition-colors group-hover/card:text-gold">
                  {b}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
