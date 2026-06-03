import { CTAButton, SectionLabel, Heading, GoldDivider } from "./ui";
import { Card } from "./ui/Card";
import { useConsult } from "../context/ConsultContext";
import { scrollToSection } from "../lib/scroll";
import { Reveal } from "../hooks/useScrollReveal";

const FEATURES = [
  {
    icon: "🌱",
    title: "IGBC Certified Builds",
    desc: "Recognised and certified by the Indian Green Building Council for sustainable construction.",
  },
  {
    icon: "☀️",
    title: "Energy-Efficient Design",
    desc: "Passive cooling, natural ventilation, and solar-ready structures to minimise environmental impact.",
  },
  {
    icon: "💧",
    title: "Rainwater Harvesting",
    desc: "Integrated systems that save up to 40,000 litres of water per year for each home.",
  },
  {
    icon: "♻️",
    title: "Eco-Friendly Materials",
    desc: "Responsibly sourced, low-carbon materials that reduce your home's lifetime footprint.",
  },
];

export default function GreenHomes() {
  const { openConsult } = useConsult();

  return (
    <section id="green-homes" className="section-pad bg-navy-dark">
      <div className="container-main">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Card variant="dark" className="!border-gold/20 !bg-navy">
              <SectionLabel light>Eco-Friendly Living</SectionLabel>
              <Heading light size="lg">
                Green Home Construction
              </Heading>
              <GoldDivider light />
              <p className="mb-8 font-sans text-[15px] leading-relaxed text-white/75">
                Build a home that's kind to the planet without compromising on comfort or elegance.
                Our green home specialists design spaces that stay naturally cool in summer, save
                water year-round, and reduce your energy bills for decades.
              </p>
              <div className="flex flex-wrap gap-3">
                <CTAButton
                  onClick={() =>
                    openConsult({
                      packageName: "Green Home",
                      source: "green homes section",
                    })
                  }
                >
                  Get Green Home Quote
                </CTAButton>
                <CTAButton
                  secondary
                  onClick={() => scrollToSection("packages")}
                  className="!bg-white/10 !text-white hover:!bg-white/20"
                >
                  View Packages
                </CTAButton>
              </div>
            </Card>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <Card variant="elevated" padding="md">
                  <span className="metric-icon mb-3 text-2xl">{f.icon}</span>
                  <h4 className="mb-2 font-sans text-lg font-bold text-navy">{f.title}</h4>
                  <p className="m-0 font-sans text-[13px] leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
