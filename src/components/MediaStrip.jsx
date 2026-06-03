import { Card } from "./ui/Card";

const OUTLETS = [
  "Your Story",
  "The Better India",
  "Deccan Herald",
  "Times of India",
  "Hindustan Metro",
  "Realty NXT",
];

export default function MediaStrip() {
  return (
    <section className="border-b border-gray-light bg-white px-[5%] py-6">
      <div className="container-main">
        <Card variant="flat" padding="sm" className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-muted uppercase whitespace-nowrap">
            As Featured In
          </span>
          <div className="hidden h-5 w-px bg-gray-light sm:block" />
          {OUTLETS.map((o) => (
            <span
              key={o}
              className="font-sans text-sm font-bold tracking-wide text-navy transition-colors hover:text-gold md:text-[15px]"
            >
              {o}
            </span>
          ))}
        </Card>
      </div>
    </section>
  );
}
