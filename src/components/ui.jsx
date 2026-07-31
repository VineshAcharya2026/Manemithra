import { colors } from "../theme/colors";

export function SectionLabel({ children, className = "", light = false }) {
  return (
    <p
      className={`mb-2.5 font-sans text-xs font-semibold tracking-[0.2em] uppercase ${
        light ? "text-gold" : "text-gold"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  light = false,
  size = "xl",
  className = "",
  id,
}) {
  const sizes = {
    xl: "text-3xl sm:text-4xl lg:text-[42px]",
    lg: "text-2xl sm:text-3xl lg:text-[34px]",
    md: "text-xl sm:text-2xl lg:text-[26px]",
    sm: "text-lg sm:text-xl",
  };
  return (
    <h2
      id={id}
      className={`font-serif font-bold leading-tight ${sizes[size]} ${
        light ? "text-white" : "text-teal"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function GoldDivider({ className = "", light = false }) {
  return (
    <div className={`my-4 flex items-center gap-3 ${className}`}>
      <div className={`h-px w-10 ${light ? "bg-white/30" : "bg-gold/50"}`} />
      <div className={`h-1.5 w-1.5 rounded-full ${light ? "bg-gold" : "bg-gold"}`} />
      <div className={`h-px w-10 ${light ? "bg-white/30" : "bg-gold/50"}`} />
    </div>
  );
}

/** @param {'primary' | 'secondary' | 'danger'} variant */
export function CTAButton({
  children,
  primary = true,
  secondary = false,
  danger = false,
  onClick,
  type = "button",
  className = "",
}) {
  const variant = danger ? "danger" : secondary || !primary ? "secondary" : "primary";
  const classes = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes[variant]} tracking-wide uppercase ${className}`}
    >
      {children}
    </button>
  );
}

export function FeaturePill({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-gray-light bg-white px-4 py-2.5 shadow-card-sm">
      <span className="text-lg" aria-hidden="true">
        {icon}
      </span>
      <span className="font-sans text-[13px] font-semibold text-body">{label}</span>
    </div>
  );
}

export function Badge({ variant = "success", children, className = "" }) {
  const map = {
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  };
  return <span className={`${map[variant]} ${className}`}>{children}</span>;
}

export { Card, StatCard, IconBadge } from "./ui/Card";

export function SectionShell({
  id,
  children,
  className = "",
  alt = false,
}) {
  return (
    <section
      id={id}
      className={`section-pad ${alt ? "section-surface-alt" : "section-surface"} ${className}`}
    >
      <div className="container-main">{children}</div>
    </section>
  );
}

export function SectionHeader({ label, title, light = false, description }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <SectionLabel light={light}>{label}</SectionLabel>
      <Heading light={light}>{title}</Heading>
      <div className="flex justify-center">
        <GoldDivider light={light} />
      </div>
      {description && (
        <p
          className={`mx-auto mt-0 max-w-xl font-sans text-base leading-relaxed ${
            light ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Re-export theme for components that need inline styles */
export { colors };
