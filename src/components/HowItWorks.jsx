import { useState } from "react";
import { SectionHeader } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { ROUTES } from "../lib/routes";
import { useSiteContent } from "../hooks/useSiteContent";
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
          active ? "bg-teal text-gold" : "bg-white/10 text-white/60"
        }`}
      >
        {String(number).padStart(2, "0")}
      </div>
      <span className="font-sans text-[15px]">{title}</span>
    </button>
  );
}

function PreviewStepCard({ step, index }) {
  return (
    <Card variant="elevated" padding="md" className="h-full">
      <div className="mb-3 text-3xl" aria-hidden="true">
        {step.icon}
      </div>
      <p className="mb-2 font-sans text-[10px] font-bold tracking-[0.15em] text-gold uppercase">
        Step {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mb-2 font-serif text-lg font-bold text-teal">{step.title}</h3>
      <p className="m-0 font-sans text-sm leading-relaxed text-muted line-clamp-3">
        {step.desc}
      </p>
    </Card>
  );
}

export default function HowItWorks({ preview = false }) {
  const { data } = useSiteContent("steps");
  const STEPS = data?.items ?? [];
  const [active, setActive] = useState(0);
  const step = STEPS[active] ?? STEPS[0];
  const previewSteps = STEPS.slice(0, 3);

  if (preview) {
    return (
      <section id="how-it-works" className="section-pad bg-teal">
        <div className="container-main">
          <Reveal>
            <SectionHeader
              light
              label="How It Works"
              title="Your Roadmap to Building the Home of Your Dreams"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {previewSteps.map((s, i) => (
              <Reveal key={s.title}>
                <PreviewStepCard step={s} index={i} />
              </Reveal>
            ))}
          </div>

          <SectionViewAll to={ROUTES.howItWorks} label="See the full process" />
        </div>
      </section>
    );
  }

  return (
    <section id="how-it-works" className="section-pad bg-teal">
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
            <Card variant="dark" padding="sm" className="flex flex-col gap-1 !bg-teal-dark !p-3">
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
              <h3 className="mb-4 font-serif text-2xl font-bold text-teal md:text-[30px]">
                {step.title}
              </h3>
              <p className="mb-7 font-sans text-[15px] leading-relaxed text-muted">
                {step.desc}
              </p>
              <ul className="flex flex-col gap-3">
                {step?.points?.map((p) => (
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
