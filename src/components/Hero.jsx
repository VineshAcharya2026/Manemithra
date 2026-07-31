import HeroProjectCarousel from "./HeroProjectCarousel";
import HeroQuoteForm from "./HeroQuoteForm";
import { useSiteContent } from "../hooks/useSiteContent";

export default function Hero() {
  const { data: brand } = useSiteContent("brand");
  const { data: stats } = useSiteContent("stats");
  const heroStats = stats?.heroStats ?? [];

  return (
    <section id="home" className="flex flex-col bg-brand-hero">
      <div className="relative overflow-hidden">
        <div className="container-main relative w-full px-[5%] pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            <div className="lg:col-span-7">
              <HeroProjectCarousel />
            </div>

            <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <p className="max-w-sm font-serif text-lg font-semibold tracking-[0.12em] text-gold uppercase sm:text-xl">
                  {brand?.tagline}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-px w-10 bg-gold/60 sm:w-14" />
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <div className="h-px w-10 bg-gold/60 sm:w-14" />
                </div>
                <p className="mt-3 font-sans text-[11px] font-medium tracking-[0.22em] text-white/50 uppercase">
                  {brand?.pillars}
                </p>
              </div>

              <HeroQuoteForm />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto shrink-0 border-t border-white/10 bg-teal-dark">
        <div className="container-main grid grid-cols-2 px-[5%] md:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-2 py-4 text-center sm:py-5 ${
                i > 0 ? "md:border-l md:border-white/15" : ""
              } ${i % 2 === 1 ? "border-l border-white/15" : ""} ${
                i >= 2 ? "border-t border-white/15 md:border-t-0" : ""
              }`}
            >
              <div className="font-serif text-2xl leading-none font-bold text-gold sm:text-3xl lg:text-[2rem]">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="mt-1 font-sans text-[10px] font-bold tracking-[0.12em] text-silver/90 sm:text-[11px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
