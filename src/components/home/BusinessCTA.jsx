import { Link } from "react-router-dom";
import { CTAButton, SectionLabel, Heading } from "../ui";
import { Card } from "../ui/Card";
import { useConsult } from "../../context/ConsultContext";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useWhatsAppNumber } from "../../hooks/useWhatsAppNumber";
import { phoneTelHref, formatPhoneDisplay } from "../../lib/whatsapp";
import { ROUTES } from "../../lib/routes";
import { Reveal } from "../../hooks/useScrollReveal";

export default function BusinessCTA() {
  const { openConsult } = useConsult();
  const { data: ctas } = useSiteContent("ctas");
  const business = ctas?.business ?? {};
  const whatsapp = useWhatsAppNumber();
  const phone = business.phone || whatsapp;

  return (
    <section className="section-pad bg-surface">
      <Reveal className="container-main">
        <Card variant="elevated" padding="lg" className="border border-gold/25 bg-white">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionLabel>{business.label}</SectionLabel>
              <Heading size="lg">{business.title}</Heading>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted">
                {business.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2 font-sans text-sm text-body">
                {(business.bullets ?? []).map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:flex-col lg:items-stretch">
              <CTAButton
                onClick={() => openConsult({ source: "business CTA home" })}
                className="w-full !py-3"
              >
                Book Free Consultation
              </CTAButton>
              <CTAButton
                secondary
                onClick={() => window.open(phoneTelHref(phone), "_self")}
                className="w-full !py-3"
              >
                Call {formatPhoneDisplay(phone)}
              </CTAButton>
              <Link
                to={ROUTES.packages}
                className="text-center font-sans text-sm font-semibold text-teal transition-colors hover:text-gold"
              >
                Compare packages →
              </Link>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
