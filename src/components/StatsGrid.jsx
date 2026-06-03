import { SITE_STATS } from "../lib/constants";
import { StatCard } from "./ui/Card";
import { Reveal } from "../hooks/useScrollReveal";

export default function StatsGrid({ light = false, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 ${className}`}
    >
      {SITE_STATS.map((stat) => (
        <Reveal key={stat.label}>
          <StatCard {...stat} light={light} />
        </Reveal>
      ))}
    </div>
  );
}
