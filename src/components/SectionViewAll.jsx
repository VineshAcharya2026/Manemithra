import { Link } from "react-router-dom";
import { Reveal } from "../hooks/useScrollReveal";

export default function SectionViewAll({ to, label = "View all" }) {
  return (
    <Reveal>
      <div className="mt-10 flex justify-center md:mt-12">
        <Link
          to={to}
          className="btn-secondary inline-flex items-center gap-2 !px-8 !py-3 !text-xs tracking-wide uppercase"
        >
          {label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}
