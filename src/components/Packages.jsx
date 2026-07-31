import { Badge, SectionHeader, SectionShell } from "./ui";
import { Card } from "./ui/Card";
import SectionViewAll from "./SectionViewAll";
import { useSiteContent } from "../hooks/useSiteContent";
import { ROUTES } from "../lib/routes";
import { useConsult } from "../context/ConsultContext";
import { Reveal } from "../hooks/useScrollReveal";

function PackageCard({ pkg }) {
  const { openConsult } = useConsult();
  const featured = pkg.featured;

  return (
    <Card
      variant={featured ? "featured" : "elevated"}
      className="relative flex h-full flex-col"
    >
      {featured && (
        <Badge variant="warning" className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}

      <div className={`mb-4 h-3 w-3 rounded-full ${pkg.dot}`} />

      <h3 className={`mb-1 font-serif text-2xl font-bold ${featured ? "text-gold" : "text-teal"}`}>
        {pkg.name}
      </h3>

      <div className="mb-6">
        <span className={`font-sans text-4xl font-bold ${featured ? "text-white" : "text-gold"}`}>
          {pkg.price}
        </span>
        <span className={`font-sans text-[13px] ${featured ? "text-white/60" : "text-muted"}`}>
          {pkg.unit}
        </span>
      </div>

      <div className={`mb-6 h-px ${featured ? "bg-white/15" : "bg-gray-light"}`} />

      <ul className="mb-8 flex flex-1 flex-col gap-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-sm text-gold">✦</span>
            <span
              className={`font-sans text-[13px] leading-snug ${
                featured ? "text-white/75" : "text-muted"
              }`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          openConsult({
            packageName: pkg.name,
            source: "packages section",
          })
        }
        className={featured ? "btn-primary mt-auto w-full" : "btn-secondary mt-auto w-full !text-xs"}
      >
        Know More
      </button>
    </Card>
  );
}

export default function Packages({ preview = false }) {
  const { data } = useSiteContent("packages");
  const PACKAGES = data?.items ?? [];
  const items = preview
    ? PACKAGES.filter((p) => ["Essential", "Premium", "Luxury"].includes(p.name))
    : PACKAGES;

  return (
    <SectionShell id="packages" alt={!preview}>
      <Reveal>
        <SectionHeader
          label="Our Packages"
          title="Explore Our Popular Packages"
          description="From essential to ultra-luxury — fixed-cost transparency, dedicated project management, and in-house execution you can trust."
        />
      </Reveal>

      <div
        className={`grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 ${
          preview ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-5"
        }`}
      >
        {items.map((p) => (
          <Reveal key={p.name} className="h-full">
            <PackageCard pkg={p} />
          </Reveal>
        ))}
      </div>

      {preview && <SectionViewAll to={ROUTES.packages} label="View all packages" />}
    </SectionShell>
  );
}
