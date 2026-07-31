import { useMemo, useState } from "react";
import { CTAButton, SectionHeader, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { useProjects } from "../hooks/useProjects";
import { ROUTES } from "../lib/routes";
import { useConsult } from "../context/ConsultContext";
import { cityFromLocation } from "../lib/formValidation";
import { Reveal } from "../hooks/useScrollReveal";
import ProjectImage from "./ProjectImage";
import ProjectGalleryModal from "./ProjectGalleryModal";

const FILTERS = ["All", "Bengaluru", "Mysuru", "Coimbatore"];

function ProjectCard({ item, onSelect }) {
  const meta = [
    item.area && ["Area", item.area],
    item.floors && ["Floors", item.floors],
  ].filter(Boolean);
  const photoCount = item.images?.length || (item.image ? 1 : 0);

  return (
    <Card
      variant="elevated"
      padding="sm"
      as="button"
      type="button"
      onClick={onSelect}
      className="w-full cursor-pointer overflow-hidden !p-0 text-left"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-teal/5 transition-colors group-hover/card:bg-[var(--gold-muted)] sm:h-60">
        <ProjectImage
          src={item.image}
          alt={`${item.loc} project`}
          gradient={item.bg}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal/80 via-teal/20 to-transparent" />
        {item.price ? (
          <span className="absolute top-3 right-3 z-10 rounded-lg bg-teal px-2.5 py-1 font-sans text-[11px] font-bold text-gold shadow-card-sm">
            {item.price}
          </span>
        ) : null}
        {photoCount > 1 && (
          <span className="absolute bottom-3 left-3 z-10 rounded-lg bg-black/50 px-2 py-1 font-sans text-[10px] font-semibold text-white backdrop-blur-sm">
            {photoCount} photos
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="mb-1 font-sans text-lg font-bold text-teal">📍 {item.loc}</h3>
        {item.client && (
          <p className="mb-3 font-sans text-xs text-muted">Client: {item.client}</p>
        )}
        {meta.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {meta.map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg bg-surface px-3 py-2 transition-colors group-hover/card:bg-[var(--gold-muted)]"
              >
                <div className="font-sans text-[10px] tracking-widest text-muted uppercase">{k}</div>
                <div className="font-sans text-sm font-semibold text-body">{v}</div>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 font-sans text-xs font-medium text-gold">View gallery →</p>
      </div>
    </Card>
  );
}

export default function Projects({ preview = false }) {
  const { openConsult } = useConsult();
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState("All");
  const [galleryProject, setGalleryProject] = useState(null);

  const filtered = useMemo(() => {
    if (preview) return projects.slice(0, 3);
    if (filter === "All") return projects;
    return projects.filter(
      (p) => p.loc?.includes(filter) || p.city?.includes(filter)
    );
  }, [filter, preview, projects]);

  const handleEnquire = (item) => {
    openConsult({
      location: cityFromLocation(item.loc) || item.city || "",
      projectInterest: item.loc,
      requirements: [
        `Interested in project at ${item.loc}`,
        item.area && `(${item.area}`,
        item.floors && `${item.floors})`,
      ]
        .filter(Boolean)
        .join(" ")
        .replace(" (", " ("),
      source: preview ? "home projects preview" : "projects gallery",
    });
  };

  return (
    <SectionShell id="projects">
      <Reveal>
        <SectionHeader label="Completed Works" title="Homes We've Crafted with Pride" />
      </Reveal>

      {!preview && (
        <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full px-5 py-2 font-sans text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-gold text-white shadow-card-sm"
                  : "border border-gray-light bg-white text-teal shadow-card-sm hover:bg-[var(--gold-muted)] hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>
      )}

      {loading && (
        <p className="mb-6 text-center text-sm text-muted">Loading projects…</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Reveal key={p.id || p.loc}>
            <ProjectCard item={p} onSelect={() => setGalleryProject(p)} />
          </Reveal>
        ))}
      </div>

      {!preview && filtered.length === 0 && (
        <p className="py-12 text-center font-sans text-muted">
          No projects in this city yet. Check back soon.
        </p>
      )}

      {preview ? (
        <SectionViewAll to={ROUTES.projects} label="Explore all our homes" />
      ) : (
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <CTAButton secondary onClick={() => setFilter("All")}>
            View All Projects
          </CTAButton>
          <CTAButton onClick={() => openConsult({ source: "projects CTA" })}>
            Get a Quote
          </CTAButton>
        </div>
      )}

      {galleryProject && (
        <ProjectGalleryModal
          project={galleryProject}
          onClose={() => setGalleryProject(null)}
          onEnquire={() => {
            const item = galleryProject;
            setGalleryProject(null);
            handleEnquire(item);
          }}
        />
      )}
    </SectionShell>
  );
}
