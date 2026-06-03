import { useState } from "react";
import { SectionHeader } from "./ui";
import { Card } from "./ui/Card";
import { STEPS } from "../lib/constants";
import { Reveal } from "../hooks/useScrollReveal";

function StepItem({ number, title, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-300 ${
        active
          ? "bg-gold font-semibold text-white shadow-card-sm"
          : "text-gray-light hover:bg-[var(--gold-muted)] hover:text-white"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-lg font-bold ${
          active ? "bg-navy text-gold" : "bg-white/10 text-white/60"
        }`}
      >
        {String(number).padStart(2, "0")}
      </div>
      <span className="font-sans text-[15px]">{title}</span>
    </button>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section id="how-it-works" className="section-pad bg-navy">
      <div className="container-main">
        <Reveal>
          <SectionHeader
            light
            label="How It Works"
            title="Your Roadmap to Building the Home of Your Dreams"
          />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Card variant="dark" padding="sm" className="flex flex-col gap-1 !bg-navy-dark !p-3">
              {STEPS.map((s, i) => (
                <StepItem
                  key={s.title}
                  number={i + 1}
                  title={s.title}
                  active={active === i}
                  onClick={() => setActive(i)}
                />
              ))}
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <Card key={active} variant="elevated" padding="lg" className="animate-scale-in">
              <div className="mb-5 text-5xl" aria-hidden="true">
                {step.icon}
              </div>
              <p className="mb-2 font-sans text-[11px] font-bold tracking-[0.15em] text-gold uppercase">
                Step {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-4 font-sans text-2xl font-bold text-navy md:text-[30px]">
                {step.title}
              </h3>
              <p className="mb-7 font-sans text-[15px] leading-relaxed text-muted">
                {step.desc}
              </p>
              <ul className="flex flex-col gap-3">
                {step.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="font-sans text-sm text-body">{p}</span>
                  </li>
                ))}
              </ul>
              {active < STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActive((a) => a + 1)}
                  className="btn-primary mt-9"
                >
                  Next Step →
                </button>
              )}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
