import { useState } from "react";
import { SectionHeader, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { useSiteContent } from "../hooks/useSiteContent";
import { ROUTES } from "../lib/routes";
import { Reveal } from "../hooks/useScrollReveal";

function TestimonialQuoteCard({ t }) {
  return (
    <Card variant="elevated" padding="lg" className="relative h-full min-h-[220px]">
      <span
        className="pointer-events-none absolute top-4 left-6 font-serif text-[64px] leading-none text-gray-light select-none"
        aria-hidden="true"
      >
        "
      </span>
      <p className="relative z-10 mb-6 font-serif text-base leading-relaxed text-body italic md:text-lg">
        {t.quote}
      </p>
      <div className="flex items-center justify-between gap-4 border-t border-gray-light pt-4">
        <div>
          <div className="font-sans text-sm font-bold text-teal">{t.name}</div>
          <div className="font-sans text-xs text-muted">📍 {t.location}</div>
        </div>
        <div className="flex gap-0.5" aria-label={`${t.rating} stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-sm text-gold">
              ★
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials({ preview = false }) {
  const { data } = useSiteContent("testimonials");
  const TESTIMONIALS = data?.items ?? [];
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active] ?? TESTIMONIALS[0];

  if (preview) {
    return (
      <SectionShell id="testimonials">
        <Reveal>
          <SectionHeader label="Testimonials" title="Stories From Happy Homeowners" />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TESTIMONIALS.slice(0, 2).map((item) => (
            <Reveal key={item.name}>
              <TestimonialQuoteCard t={item} />
            </Reveal>
          ))}
        </div>

        <SectionViewAll to={ROUTES.testimonials} label="Read more stories" />
      </SectionShell>
    );
  }

  return (
    <SectionShell id="testimonials">
      <Reveal>
        <SectionHeader label="Testimonials" title="Stories From Happy Homeowners" />
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className="w-full text-left"
              >
                <Card
                  variant={i === active ? "elevated" : "flat"}
                  padding="sm"
                  className={`transition-all duration-300 ${
                    i === active ? "ring-2 ring-gold/50" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-sans text-sm font-bold text-teal">{item.name}</p>
                      <p className="font-sans text-xs text-muted">📍 {item.location}</p>
                    </div>
                    <div className="flex shrink-0 gap-0.5">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <span key={j} className="text-xs text-gold">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-muted">
                    {item.quote}
                  </p>
                </Card>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8">
          <Card
            key={active}
            variant="elevated"
            padding="lg"
            className="animate-scale-in relative min-h-[280px]"
          >
            <span
              className="pointer-events-none absolute top-4 left-6 font-serif text-[80px] leading-none text-gray-light select-none"
              aria-hidden="true"
            >
              "
            </span>
            <p className="relative z-10 mb-8 font-serif text-lg leading-relaxed text-body italic md:text-[22px]">
              {t.quote}
            </p>
            <div className="flex items-center justify-between gap-4 border-t border-gray-light pt-6">
              <div>
                <div className="font-sans text-base font-bold text-teal">{t.name}</div>
                <div className="font-sans text-sm text-muted">📍 {t.location}</div>
              </div>
              <div className="flex gap-1" aria-label={`${t.rating} stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-lg text-gold">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <div className="mt-6 flex justify-center gap-2.5 lg:justify-start">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View testimonial ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-gold" : "w-2.5 bg-gray-light hover:bg-gold"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
