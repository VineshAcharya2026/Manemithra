import CompactQuoteForm from "../components/CompactQuoteForm";
import CTABanner from "../components/CTABanner";
import { SectionHeader, SectionShell } from "../components/ui";
import { Card } from "../components/ui/Card";
import { Reveal } from "../hooks/useScrollReveal";
import { useWhatsAppNumber } from "../hooks/useWhatsAppNumber";
import { formatPhoneDisplay, phoneTelHref } from "../lib/whatsapp";

export default function ContactPage() {
  const whatsapp = useWhatsAppNumber();

  return (
    <>
      <SectionShell id="quote">
        <Reveal>
          <SectionHeader
            label="Get a Free Quote"
            title="Tell Us About Your Dream Home"
            description="Share a few details and we’ll open WhatsApp with your request — our team typically responds within 24 hours."
          />
        </Reveal>

        <Reveal className="mx-auto max-w-xl">
          <Card variant="elevated" padding="lg" className="border border-gold/20">
            <CompactQuoteForm
              meta={{ source: "contact page" }}
              showConsent
              submitLabel="Request Quote via WhatsApp"
            />
            <p className="mt-4 text-center font-sans text-xs text-muted">
              Prefer a call?{" "}
              <a href={phoneTelHref(whatsapp)} className="font-semibold text-gold hover:underline">
                {formatPhoneDisplay(whatsapp)}
              </a>
            </p>
          </Card>
        </Reveal>
      </SectionShell>

      <CTABanner />
    </>
  );
}
