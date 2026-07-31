import { useSiteContent } from "../../hooks/useSiteContent";
import { Reveal } from "../../hooks/useScrollReveal";

export default function BrandValues() {
  const { data: brand } = useSiteContent("brand");

  return (
    <section className="section-pad bg-brand-hero">
      <div className="container-main px-[5%] text-center">
        <Reveal>
          <p className="mb-3 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Our Promise
          </p>
          <p className="mx-auto max-w-3xl font-serif text-lg leading-relaxed text-silver md:text-xl">
            {brand?.promise}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {(brand?.values ?? []).map((value, i, arr) => (
              <span key={value} className="flex items-center gap-2 md:gap-3">
                <span className="rounded-full border border-gold/30 bg-white/5 px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-white uppercase md:text-xs">
                  {value}
                </span>
                {i < arr.length - 1 && (
                  <span className="hidden text-gold/50 md:inline" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
