import { useState } from "react";
import { SectionHeader, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import { TESTIMONIALS } from "../lib/constants";
import { Reveal } from "../hooks/useScrollReveal";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

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
                      <p className="font-sans text-sm font-bold text-navy">{item.name}</p>
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
                <div className="font-sans text-base font-bold text-navy">{t.name}</div>
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
