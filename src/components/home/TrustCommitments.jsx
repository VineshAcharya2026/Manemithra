import { useSiteContent } from "../../hooks/useSiteContent";
import { Reveal } from "../../hooks/useScrollReveal";

export default function TrustCommitments() {
  const { data } = useSiteContent("commitments");
  const items = data?.items ?? [];

  return (
    <section className="border-y border-gold/20 bg-teal-dark py-6 md:py-8">
      <div className="container-main px-[5%]">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 font-sans text-[11px] font-semibold tracking-wide text-silver uppercase md:text-xs"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
