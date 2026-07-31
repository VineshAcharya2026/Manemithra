import { useEffect, useState } from "react";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

export default function ProjectGalleryModal({ project, onClose, onEnquire }) {
  const images = project?.images?.length
    ? project.images
    : project?.image
      ? [project.image]
      : [];
  const [index, setIndex] = useState(0);

  useLockBodyScroll(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  if (!project || !images.length) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery — ${project.loc}`}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-teal-dark shadow-card-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">{project.loc}</h3>
            <p className="text-xs text-silver/80">
              {[project.client, project.area, project.floors, project.price]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/40">
          <img
            src={images[index]}
            alt={`${project.loc} photo ${index + 1}`}
            className="max-h-[55vh] w-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
              >
                ›
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 ${
                  i === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover object-[center_30%]" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <p className="text-xs text-silver/70">
            {index + 1} / {images.length}
          </p>
          <button type="button" className="btn-primary !px-5 !py-2.5 !text-xs" onClick={onEnquire}>
            Enquire on this home
          </button>
        </div>
      </div>
    </div>
  );
}
