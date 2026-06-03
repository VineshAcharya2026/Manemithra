import { useConsult } from "../context/ConsultContext";
import { scrollToSection } from "../lib/scroll";

const LINKS = {
  "Quick Links": [
    { label: "Our Homes", href: "#projects" },
    { label: "Green Homes", href: "#green-homes" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Packages", href: "#packages" },
    { label: "Designs", href: "#projects" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#contact" },
    { label: "Blog", href: "#contact" },
    { label: "Contact Us", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#contact" },
    { label: "Terms & Conditions", href: "#contact" },
    { label: "Sitemap", href: "#home" },
  ],
};

const SOCIAL = [
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
];

export default function Footer() {
  const { openConsult } = useConsult();

  return (
    <footer className="bg-navy px-[5%] pt-16 pb-8">
      <div className="container-main">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <a href="#home" className="mb-3 inline-block font-sans text-2xl font-bold text-gold">
              Manemithra
            </a>
            <p className="max-w-xs font-sans text-[13px] leading-relaxed text-gray-light/80">
              Manemithra is your one-stop solution for all home construction needs — comprehensive,
              turnkey, and end-to-end for every home building requirement and desire.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 font-sans text-[10px] text-gray-light transition-colors duration-200 hover:border-gold hover:bg-[var(--gold-muted)] hover:text-gold"
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

          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <div className="mb-4 font-sans text-[11px] font-bold tracking-widest text-gold uppercase">
                {section}
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(item.href.slice(1));
                      }
                    }}
                    className="font-sans text-[13px] text-gray-light/80 no-underline transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="m-0 font-sans text-xs text-gray-light/60">
            © 2024 Manemithra Homes Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="m-0 font-sans text-xs text-gray-light/60">
            Crafted with care in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
