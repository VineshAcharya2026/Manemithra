/** Premium card primitives — enterprise SaaS style */

const variants = {
  default:
    "bg-white border border-gray-light shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
  surface:
    "bg-surface border border-gray-light shadow-card-sm hover:shadow-card hover:-translate-y-0.5",
  elevated:
    "bg-white border-0 shadow-card-md hover:shadow-card-hover hover:-translate-y-1",
  dark:
    "bg-teal border border-white/10 text-white shadow-card-dark hover:shadow-card-hover hover:-translate-y-0.5",
  featured:
    "bg-teal border-2 border-gold shadow-card-md hover:shadow-card-hover hover:-translate-y-1",
  flat:
    "bg-white border border-gray-light shadow-card-sm hover:shadow-card hover:border-gold/40",
};

const paddings = {
  sm: "p-5",
  md: "p-6",
  lg: "p-6 md:p-8",
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  as: Tag = "div",
  type,
  ...props
}) {
  return (
    <Tag
      type={Tag === "button" ? type || "button" : type}
      className={`group/card rounded-2xl transition-all duration-300 ease-out ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function StatCard({
  value,
  suffix = "",
  label,
  icon,
  light = false,
  className = "",
}) {
  return (
    <Card
      variant={light ? "dark" : "elevated"}
      padding="md"
      className={`text-center ${className}`}
    >
      {icon && <span className="metric-icon mb-3 text-xl">{icon}</span>}
      <div
        className={`font-sans text-4xl leading-none font-bold md:text-[2.75rem] ${
          light ? "text-gold" : "text-gold"
        }`}
      >
        {value}
        <span className="text-2xl md:text-3xl">{suffix}</span>
      </div>
      <p
        className={`mt-2 font-sans text-xs font-bold tracking-[0.12em] uppercase ${
          light ? "text-gray-light" : "text-muted"
        }`}
      >
        {label}
      </p>
    </Card>
  );
}

export function IconBadge({ icon, className = "" }) {
  return (
    <span className={`metric-icon shrink-0 text-2xl transition-transform duration-300 group-hover/card:scale-105 ${className}`}>
      {icon}
    </span>
  );
}
