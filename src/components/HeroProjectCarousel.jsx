import { useCallback, useEffect, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { useConsult } from "../context/ConsultContext";
import { cityFromLocation } from "../lib/formValidation";
import ProjectImage from "./ProjectImage";

const INTERVAL_MS = 5500;

export default function HeroProjectCarousel() {
  const { openConsult } = useConsult();
  const { projects, loading } = useProjects();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;
  const project = projects[index];

  const goTo = useCallback(
    (i) => {
      if (total === 0) return;
      setIndex(((i % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total === 0) return;
    const id = window.setInterval(() => goTo(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, goTo, total]);

  useEffect(() => {
    if (index >= total && total > 0) setIndex(0);
  }, [index, total]);

  const handleEnquire = () => {
    if (!project) return;
    const details = [project.area, project.floors].filter(Boolean).join(", ");
    openConsult({
      location: cityFromLocation(project.loc) || project.city || "",
      projectInterest: project.loc,
      requirements: `Interested in project at ${project.loc}${details ? ` (${details})` : ""}`,
      source: "hero project carousel",
    });
  };

  if (loading || !project) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 sm:min-h-[340px]">
        <p className="text-sm text-silver/80">Loading featured homes…</p>
      </div>
    );
  }

  return (
    <div
      className="group/carousel relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-card-dark sm:min-h-[340px] lg:min-h-[min(520px,calc(100vh-11rem))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative flex-1 overflow-hidden">
        {projects.map((item, i) => (
          <div
            key={item.id || item.loc}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <ProjectImage
              src={item.image}
              alt={`${item.loc} — ${item.floors} home by Mane Mithra`}
              gradient={item.bg}
              className="h-full w-full object-cover object-[center_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/80 via-transparent to-transparent" />
          </div>
        ))}

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/50 px-3 py-1 font-sans text-[10px] font-bold tracking-[0.2em] text-gold uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Featured Homes
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(index - 1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-black/60 hover:text-gold"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(index + 1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-black/60 hover:text-gold"
          >
            ›
          </button>
        </div>
      </div>

      {/* Details panel */}
      <div
        className="relative z-10 border-t border-white/10 bg-teal-dark/95 px-5 py-4 backdrop-blur-md sm:px-6 sm:py-5"
        aria-live="polite"
      >
        <div
          key={project.loc}
          className="animate-fade-in flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-sans text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
              {project.loc}
            </h2>
            {project.client && (
              <p className="mt-1 font-sans text-xs text-silver/80">Client: {project.client}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                project.area && { label: "Plot / Area", value: project.area },
                project.floors && { label: "Floors", value: project.floors },
                project.price && { label: "Investment", value: project.price },
              ]
                .filter(Boolean)
                .map((d) => (
                  <div
                    key={d.label}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="font-sans text-[9px] font-medium tracking-widest text-silver/70 uppercase">
                      {d.label}
                    </div>
                    <div className="font-sans text-sm font-semibold text-white">{d.value}</div>
                  </div>
                ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleEnquire}
            className="btn-primary shrink-0 !px-5 !py-2.5 !text-xs whitespace-nowrap"
          >
            Enquire on this home
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((item, i) => (
            <button
              key={item.id || item.loc}
              type="button"
              aria-label={`View ${item.loc}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-gold" : "w-1.5 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
