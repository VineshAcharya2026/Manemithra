import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FOOTER_LINKS, ROUTES } from "../lib/routes";
import { useConsult } from "../context/ConsultContext";
import { useSiteContent } from "../hooks/useSiteContent";

export default function Footer() {
  const { openConsult } = useConsult();
  const { data: brand } = useSiteContent("brand");
  const { data: settings } = useSiteContent("settings");
  const socialLinks = settings?.socialLinks ?? [];

  return (
    <footer className="bg-teal px-[5%] pt-16 pb-8">
      <div className="container-main">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link to={ROUTES.home} className="mb-4 inline-block">
              <Logo variant="dark" className="h-20 w-auto md:h-24" />
            </Link>
            <p className="max-w-sm font-sans text-[13px] leading-relaxed text-silver/90">
              {brand?.promise}
            </p>
            <p className="mt-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
              {(brand?.values ?? []).join(" · ")}
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 font-sans text-[10px] text-silver transition-colors duration-200 hover:border-gold hover:bg-[var(--gold-muted)] hover:text-gold"
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openConsult({ source: "footer" })}
              className="btn-primary mt-5 !px-4 !py-2 !text-xs"
            >
              Request a Quote
            </button>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, items]) => (
            <div key={section}>
              <div className="mb-4 font-sans text-[11px] font-bold tracking-widest text-gold uppercase">
                {section}
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="font-sans text-[13px] text-silver/80 no-underline transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="m-0 font-sans text-xs text-silver/60">
            © {new Date().getFullYear()} Mane Mithra Homes Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="m-0 font-sans text-xs text-silver/60">
            {brand?.tagline} · Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
