import { useMemo, useState } from "react";
import { CTAButton, SectionHeader, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import { PROJECT_ITEMS } from "../lib/constants";
import { useConsult } from "../context/ConsultContext";
import { cityFromLocation } from "../lib/formValidation";
import { scrollToSection } from "../lib/scroll";
import { Reveal } from "../hooks/useScrollReveal";

const FILTERS = ["All", "Bengaluru", "Mysuru", "Coimbatore"];

function ProjectCard({ item, onSelect }) {
  return (
    <Card
      variant="elevated"
      padding="sm"
      as="button"
      type="button"
      onClick={onSelect}
      className="w-full cursor-pointer overflow-hidden !p-0 text-left"
    >
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-navy/5 transition-colors group-hover/card:bg-[var(--gold-muted)]">
        <div className="metric-icon h-20 w-20 text-4xl">🏡</div>
        <span className="absolute top-3 right-3 rounded-lg bg-navy px-2.5 py-1 font-sans text-[11px] font-bold text-gold shadow-card-sm">
          {item.price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-3 font-sans text-lg font-bold text-navy">📍 {item.loc}</h3>
        <div className="flex gap-4">
          {[
            ["Area", item.area],
            ["Floors", item.floors],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-lg bg-surface px-3 py-2 transition-colors group-hover/card:bg-[var(--gold-muted)]"
            >
              <div className="font-sans text-[10px] tracking-widest text-muted uppercase">
                {k}
              </div>
              <div className="font-sans text-sm font-semibold text-body">{v}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-xs font-medium text-gold">Tap for quote →</p>
      </div>
    </Card>
  );
}

export default function Projects() {
  const { openConsult } = useConsult();
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECT_ITEMS;
    return PROJECT_ITEMS.filter((p) => p.loc.includes(filter));
  }, [filter]);

  const handleProjectClick = (item) => {
    openConsult({
      location: cityFromLocation(item.loc),
      projectInterest: item.loc,
      requirements: `Interested in project at ${item.loc} (${item.area}, ${item.floors})`,
      source: "projects gallery",
    });
  };

  return (
    <SectionShell id="projects">
      <Reveal>
        <SectionHeader label="Completed Works" title="Homes We've Crafted with Pride" />
      </Reveal>

      <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded-full px-5 py-2 font-sans text-sm font-semibold transition-all duration-200 ${
              filter === f
                ? "bg-gold text-white shadow-card-sm"
                : "border border-gray-light bg-white text-navy shadow-card-sm hover:bg-[var(--gold-muted)] hover:text-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Reveal key={p.loc}>
            <ProjectCard item={p} onSelect={() => handleProjectClick(p)} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center font-sans text-muted">
          No projects in this city yet. Check back soon.
        </p>
      )}

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <CTAButton
          secondary
          onClick={() => {
            setFilter("All");
            scrollToSection("projects");
          }}
        >
          View All Projects
        </CTAButton>
        <CTAButton onClick={() => openConsult({ source: "projects CTA" })}>
          Get a Quote
        </CTAButton>
      </div>
    </SectionShell>
  );
}
