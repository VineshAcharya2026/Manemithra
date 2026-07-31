import { Card } from "./ui/Card";
import { usePressMedia } from "../hooks/usePressMedia";

export default function MediaStrip() {
  const { items, loading } = usePressMedia();

  return (
    <section className="border-b border-gray-light bg-white px-[5%] py-6">
      <div className="container-main">
        <Card variant="flat" padding="sm" className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-muted uppercase whitespace-nowrap">
            As Featured In
          </span>
          <div className="hidden h-5 w-px bg-gray-light sm:block" />
          {loading ? (
            <span className="text-sm text-muted">Loading…</span>
          ) : (
            items.map((o) => (
              <span
                key={o.id || o.title}
                className="font-sans text-sm font-bold tracking-wide text-teal transition-colors hover:text-gold md:text-[15px]"
              >
                {o.imageUrl ? (
                  <img
                    src={o.imageUrl}
                    alt={o.title}
                    className="h-6 max-w-[120px] object-contain"
                  />
                ) : (
                  o.title
                )}
              </span>
            ))
          )}
        </Card>
      </div>
    </section>
  );
}
