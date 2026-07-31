import { useState } from "react";
import { CTAButton, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { useSiteContent } from "../hooks/useSiteContent";
import { ROUTES } from "../lib/routes";
import { useConsult } from "../context/ConsultContext";
import { Reveal } from "../hooks/useScrollReveal";

function FaqList({ items, open, setOpen }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q}>
            <Card
              variant="flat"
              padding="sm"
              className={`overflow-hidden !p-0 transition-all duration-300 ${
                isOpen ? "ring-1 ring-gold/40" : ""
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
                  isOpen ? "bg-[var(--gold-muted)]" : "bg-white hover:bg-row-hover"
                }`}
              >
                <span className="pr-4 font-sans text-[15px] font-semibold text-teal">
                  {f.q}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-lg font-light text-gold transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-gold text-white" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-gray-light bg-surface px-5 py-4 font-sans text-sm leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function FAQ({ preview = false }) {
  const { data } = useSiteContent("faqs");
  const FAQS = data?.items ?? [];
  const { openConsult } = useConsult();
  const [open, setOpen] = useState(null);
  const items = preview ? FAQS.slice(0, 3) : FAQS;

  if (preview) {
    return (
      <SectionShell id="faq" alt>
        <Reveal className="mb-8 text-center">
          <p className="mb-2 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            FAQ
          </p>
          <h2 className="font-serif text-2xl font-bold text-teal md:text-3xl">
            Common Questions Answered
          </h2>
        </Reveal>

        <FaqList items={items} open={open} setOpen={setOpen} />

        <SectionViewAll to={ROUTES.faq} label="View all FAQs" />
      </SectionShell>
    );
  }

  return (
    <SectionShell id="faq" alt>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <Card variant="surface" padding="lg" className="sticky top-24">
            <p className="mb-2 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              FAQ
            </p>
            <h2 className="font-serif text-2xl font-bold text-teal md:text-3xl">
              Common Questions Answered
            </h2>
            <p className="mt-4 mb-8 font-sans text-[15px] leading-relaxed text-muted">
              Have more questions? Our team is happy to walk you through every detail before you
              commit to a single rupee.
            </p>
            <CTAButton onClick={() => openConsult({ source: "FAQ sidebar" })}>
              Talk to an Expert
            </CTAButton>
          </Card>
        </Reveal>

        <div className="lg:col-span-8">
          <FaqList items={items} open={open} setOpen={setOpen} />
        </div>
      </div>
    </SectionShell>
  );
}
