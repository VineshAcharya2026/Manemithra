import { CTAButton, SectionLabel, Heading } from "./ui";
import { Card } from "./ui/Card";
import { useConsult } from "../context/ConsultContext";
import { Reveal } from "../hooks/useScrollReveal";

export default function CTABanner() {
  const { openConsult } = useConsult();

  return (
    <section id="contact" className="section-pad bg-navy">
      <Reveal className="container-main">
        <Card variant="elevated" padding="lg" className="mx-auto max-w-3xl border-gold/20 text-center">
          <SectionLabel light>Let's Begin</SectionLabel>
          <Heading light>Creating Homes That Reflect You</Heading>
          <p className="mx-auto mt-4 mb-8 max-w-lg font-sans text-base leading-relaxed text-white/75">
            Experience personalised, hassle-free construction services from concept to handover.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton onClick={() => openConsult({ source: "contact banner" })}>
              Get a Free Quote
            </CTAButton>
            <CTAButton
              secondary
              onClick={() => window.open("tel:+919686796232", "_self")}
            >
              Call +91 96867 96232
            </CTAButton>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
