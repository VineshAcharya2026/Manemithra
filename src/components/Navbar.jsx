import { useState, useEffect } from "react";
import { CTAButton } from "./ui";
import { NAV_LINKS } from "../lib/constants";
import { useConsult } from "../context/ConsultContext";

export default function Navbar() {
  const { openConsult } = useConsult();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => setMenuOpen(false);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleQuote = () => {
    setMenuOpen(false);
    openConsult({ source: "navbar" });
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 border-b border-gray-light bg-white px-[5%] transition-shadow duration-300 ${
        scrolled ? "shadow-card-md" : "shadow-card-sm"
      }`}
    >
      <div className="container-main flex h-[72px] items-center justify-between md:h-20">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy">
            <svg
              viewBox="0 0 32 32"
              className="h-6 w-6 text-gold"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 6L6 14v12h7v-8h6v8h7V14L16 6z" />
            </svg>
          </div>
          <div>
            <div className="font-sans text-sm font-bold leading-tight text-navy md:text-base">
              Manemithra
            </div>
            <div className="text-[9px] font-medium tracking-wide text-muted uppercase">
              Home Construction
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[13px] font-medium text-navy transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <CTAButton onClick={handleQuote} className="!px-5 !py-2.5 !text-xs">
            Free Quote
          </CTAButton>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-navy lg:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out lg:hidden ${
          menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-4 flex flex-col gap-0.5 rounded-xl border border-gray-light bg-surface p-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-sans text-sm font-medium text-navy transition-colors hover:bg-[var(--gold-muted)] hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <div className="px-2 pt-2">
            <CTAButton onClick={handleQuote} className="w-full !py-2.5 !text-xs">
              Free Quote
            </CTAButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
