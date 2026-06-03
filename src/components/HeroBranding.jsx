import { colors } from "../theme/colors";

export default function HeroBranding() {
  const strokeStyle = {
    WebkitTextStroke: `2px ${colors.primaryGold}`,
    color: "transparent",
  };

  return (
    <div className="flex w-full max-w-[280px] flex-col items-center text-center sm:max-w-none lg:max-w-[320px]">
      <div className="flex items-center justify-center leading-none">
        <span
          className="font-serif text-[clamp(3.5rem,14vw,5.5rem)] font-bold xl:text-[6rem]"
          style={strokeStyle}
          aria-hidden="true"
        >
          1
        </span>
        <div className="relative">
          <span
            className="font-serif text-[clamp(3.5rem,14vw,5.5rem)] font-bold xl:text-[6rem]"
            style={strokeStyle}
            aria-hidden="true"
          >
            0
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-[clamp(2rem,7vw,3.25rem)] w-[clamp(2rem,7vw,3.25rem)] items-center justify-center rounded-full border-2 border-gold bg-navy xl:h-14 xl:w-14">
              <svg
                viewBox="0 0 40 40"
                className="h-[50%] w-[50%] text-gold"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 6L8 16v14h8v-9h8v9h8V16L20 6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="-mt-0.5 font-serif text-lg text-gold italic sm:text-xl lg:text-2xl">
        years of
      </p>

      <h1 className="font-serif text-[clamp(1.35rem,4vw,2.25rem)] leading-tight font-bold text-gold xl:text-[2.5rem]">
        <span className="lowercase">mane</span>
        <span className="text-[1.05em]">M</span>
        <span className="lowercase">ithra</span>
        <sup className="text-[0.4em] font-normal text-white">™</sup>
      </h1>

      <p className="mt-1 hidden font-sans text-[11px] text-white/60 sm:block">
        Turnkey home construction · Bengaluru & beyond
      </p>
    </div>
  );
}
