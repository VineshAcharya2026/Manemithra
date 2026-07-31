import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { NAV_LINKS, ROUTES } from "../lib/routes";
import { useConsult } from "../context/ConsultContext";

const HEADER_H = "h-16 md:h-24";

export default function Navbar() {
  const { openConsult } = useConsult();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fn = () => setMenuOpen(false);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleQuote = () => {
    setMenuOpen(false);
    openConsult({ source: "navbar" });
  };

  const linkClass = ({ isActive }) =>
    [
      "font-sans text-[13px] font-normal tracking-wide text-white transition-colors hover:text-gold",
      isActive ? "!text-gold" : "",
    ].join(" ");

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-0 bg-brand-hero shadow-none">
      <div className={`flex ${HEADER_H} items-center`}>
        <Link to={ROUTES.home} className="nav-logo-wrap shrink-0">
          <Logo variant="dark" className="nav-logo-img" />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-4 px-4 sm:gap-6 sm:px-[5%] lg:gap-8 xl:gap-10">
          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <button type="button" onClick={handleQuote} className="nav-cta hidden shrink-0 lg:inline-flex">
            Free Quote
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 text-white lg:hidden"
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
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out lg:hidden ${
          menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 flex flex-col gap-0.5 rounded-xl border border-white/10 bg-teal-dark/95 p-2 backdrop-blur-md sm:mx-[5%]">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 font-sans text-sm font-normal text-white transition-colors hover:bg-white/5 hover:text-gold ${
                  isActive ? "bg-white/10 text-gold" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="px-2 pt-2">
            <button type="button" onClick={handleQuote} className="nav-cta w-full">
              Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
