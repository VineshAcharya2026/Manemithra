import { useNavigate } from "react-router-dom";
import { CTAButton, SectionLabel, Heading, GoldDivider } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { useConsult } from "../context/ConsultContext";
import { useSiteContent } from "../hooks/useSiteContent";
import { ROUTES } from "../lib/routes";
import { Reveal } from "../hooks/useScrollReveal";

export default function GreenHomes({ preview = false }) {
  const { openConsult } = useConsult();
  const navigate = useNavigate();
  const { data: greenSection } = useSiteContent("greenSection");
  const { data } = useSiteContent("greenFeatures");
  const allFeatures = data?.items ?? [];
  const features = preview ? allFeatures.slice(0, 2) : allFeatures;

  return (
    <section id="green-homes" className="section-pad bg-teal-dark">
      <div className="container-main">
        <div
          className={`grid grid-cols-1 items-center gap-10 ${
            preview ? "" : "lg:grid-cols-2 lg:gap-16"
          }`}
        >
          <Reveal>
            <Card variant="dark" className="!border-gold/20 !bg-teal">
              <SectionLabel light>{greenSection?.label}</SectionLabel>
              <Heading light size="lg">
                {greenSection?.title}
              </Heading>
              <GoldDivider light />
              <p className="mb-8 font-sans text-[15px] leading-relaxed text-white/75">
                {greenSection?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <CTAButton
                  onClick={() =>
                    openConsult({
                      packageName: "Green Home",
                      source: preview ? "home green preview" : "green homes section",
                    })
                  }
                >
                  Get Green Home Quote
                </CTAButton>
                {!preview && (
                  <CTAButton
                    secondary
                    onClick={() => navigate(ROUTES.packages)}
                    className="!bg-white/10 !text-white hover:!bg-white/20"
                  >
                    View Packages
                  </CTAButton>
                )}
              </div>
            </Card>
          </Reveal>

          <div className={`grid grid-cols-1 gap-4 ${preview ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
            {features.map((f) => (
              <Reveal key={f.title}>
                <Card variant="elevated" padding="md">
                  <span className="metric-icon mb-3 text-2xl">{f.icon}</span>
                  <h4 className="mb-2 font-serif text-lg font-bold text-teal">{f.title}</h4>
                  <p className="m-0 font-sans text-[13px] leading-relaxed text-muted">{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {preview && <SectionViewAll to={ROUTES.greenHomes} label="Discover green homes" />}
      </div>
    </section>
  );
}
