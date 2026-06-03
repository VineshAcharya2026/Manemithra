import HeroBranding from "./HeroBranding";
import HeroQuoteForm from "./HeroQuoteForm";
import { HERO_STATS } from "../lib/constants";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col bg-navy">
      {/* Main hero — fits above stats within viewport */}
      <div className="container-main w-full px-[5%] pt-[4.25rem] pb-3 sm:pt-20 sm:pb-4 lg:pt-[4.75rem] lg:pb-5">
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-4 xl:gap-6">
          {/* Branding — first on mobile, center column on desktop */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4 lg:justify-center">
            <HeroBranding />
          </div>

          {/* Form — second on mobile, right on desktop */}
          <div className="order-2 w-full lg:order-3 lg:col-span-5">
            <HeroQuoteForm />
          </div>

          {/* Image — third on mobile, left on desktop */}
          <div className="order-3 flex justify-center lg:order-1 lg:col-span-3 lg:justify-start lg:self-end">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=560&q=80&auto=format&fit=crop"
              alt="Manemithra construction expert"
              className="h-auto w-full max-w-[220px] object-contain object-bottom drop-shadow-xl sm:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px]"
            />
          </div>
        </div>
      </div>

      {/* Stats bar — compact */}
      <div className="mt-auto shrink-0 bg-black">
        <div className="container-main grid grid-cols-2 px-[5%] md:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-2 py-3 text-center sm:py-4 ${
                i > 0 ? "md:border-l md:border-white/15" : ""
              } ${i % 2 === 1 ? "border-l border-white/15" : ""} ${
                i >= 2 ? "border-t border-white/15 md:border-t-0" : ""
              }`}
            >
              <div className="font-sans text-2xl leading-none font-bold text-gold sm:text-3xl lg:text-[2rem]">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="mt-0.5 font-sans text-[10px] font-bold tracking-[0.1em] text-white/90 sm:text-[11px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
