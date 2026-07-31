import { CTAButton, SectionLabel, Heading, GoldDivider } from "./ui";
import { Card } from "./ui/Card";
import { useConsult } from "../context/ConsultContext";
import { useSiteContent } from "../hooks/useSiteContent";
import { useWhatsAppNumber } from "../hooks/useWhatsAppNumber";
import { phoneTelHref, formatPhoneDisplay } from "../lib/whatsapp";
import { Reveal } from "../hooks/useScrollReveal";

export default function CTABanner() {
  const { openConsult } = useConsult();
  const { data: ctas } = useSiteContent("ctas");
  const contact = ctas?.contact ?? {};
  const whatsapp = useWhatsAppNumber();
  const phone = contact.phone || whatsapp;

  return (
    <section id="contact" className="section-pad bg-teal">
      <Reveal className="container-main">
        <Card
          variant="elevated"
          padding="lg"
          className="mx-auto max-w-3xl border border-gold/25 text-center"
        >
          <SectionLabel>{contact.label}</SectionLabel>
          <Heading>{contact.title}</Heading>
          <div className="flex justify-center">
            <GoldDivider />
          </div>
          <p className="mx-auto mt-2 mb-8 max-w-lg font-sans text-base leading-relaxed text-muted">
            {contact.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton onClick={() => openConsult({ source: "contact banner" })}>
              Get a Free Quote
            </CTAButton>
            <CTAButton secondary onClick={() => window.open(phoneTelHref(phone), "_self")}>
              Call {formatPhoneDisplay(phone)}
            </CTAButton>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
