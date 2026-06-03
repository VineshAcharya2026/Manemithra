import { useState, useEffect, useRef } from "react";

// ── Tokens ──────────────────────────────────────────────────────────────────
const BRAND = {
  gold: "#B8935A",
  goldLight: "#D4AF78",
  goldPale: "#F5EDD9",
  earth: "#3D2B1F",
  earthMid: "#6B4C38",
  cream: "#FAF6EE",
  sage: "#4A6741",
  sageLight: "#EEF3EC",
  charcoal: "#1C1C1C",
  muted: "#7A6A5A",
};

// ── Reusable Primitives ──────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 13,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: BRAND.gold,
      marginBottom: 10,
      fontWeight: 600,
    }}>
      {children}
    </p>
  );
}

function Heading({ children, light = false, size = "xl" }) {
  const sizes = { xl: 42, lg: 34, md: 26, sm: 20 };
  return (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: sizes[size],
      fontWeight: 700,
      color: light ? "#FAF6EE" : BRAND.earth,
      lineHeight: 1.2,
      margin: 0,
    }}>
      {children}
    </h2>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
      <div style={{ height: 1, width: 40, background: BRAND.gold, opacity: 0.5 }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.gold }} />
      <div style={{ height: 1, width: 40, background: BRAND.gold, opacity: 0.5 }} />
    </div>
  );
}

function StatCard({ number, suffix = "", label }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "28px 20px",
      background: "rgba(255,255,255,0.07)",
      borderRadius: 12,
      border: `1px solid rgba(184,147,90,0.3)`,
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 48,
        fontWeight: 700,
        color: BRAND.goldLight,
        lineHeight: 1,
      }}>
        {number}<span style={{ fontSize: 28 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8, letterSpacing: "0.05em" }}>
        {label}
      </div>
    </div>
  );
}

function FeaturePill({ icon, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 18px",
      background: BRAND.goldPale,
      borderRadius: 40,
      border: `1px solid ${BRAND.goldLight}`,
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: BRAND.earthMid,
        letterSpacing: "0.03em",
      }}>{label}</span>
    </div>
  );
}

function CTAButton({ children, primary = true, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "14px 36px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: 4,
        transition: "all 0.3s ease",
        border: primary ? "none" : `1.5px solid ${BRAND.gold}`,
        background: primary
          ? hov ? BRAND.goldLight : BRAND.gold
          : hov ? BRAND.gold : "transparent",
        color: primary ? BRAND.earth : hov ? BRAND.earth : BRAND.gold,
      }}
    >
      {children}
    </button>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onConsult }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Our Homes", "Green Homes", "How It Works", "Packages", "About Us", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,246,238,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${BRAND.goldPale}` : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: scrolled ? 64 : 80,
        transition: "height 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.earthMid})`,
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 16, fontFamily: "serif", fontWeight: 700 }}>ಮ</span>
          </div>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 700,
              color: scrolled ? BRAND.earth : "#fff",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}>Manemithra</div>
            <div style={{
              fontSize: 9, letterSpacing: "0.18em",
              color: scrolled ? BRAND.gold : "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}>Building Dreams Since 2014</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.slice(0, 5).map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              color: scrolled ? BRAND.earthMid : "rgba(255,255,255,0.85)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}>{l}</a>
          ))}
          <CTAButton onClick={onConsult} primary>Free Consultation</CTAButton>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onConsult }) {
  return (
    <section style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${BRAND.earth} 0%, #2A1810 40%, #1A2015 100%)`,
      position: "relative",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Decorative geometric pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 70% 50%, rgba(184,147,90,0.12) 0%, transparent 60%),
          radial-gradient(circle at 20% 80%, rgba(74,103,65,0.15) 0%, transparent 50%)`,
        pointerEvents: "none",
      }} />

      {/* Ornamental lines */}
      <svg style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "50%", opacity: 0.06 }}
        viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={600 - i * 50} y2="800"
            stroke={BRAND.goldLight} strokeWidth="0.5" />
        ))}
        <circle cx="400" cy="200" r="200" fill="none" stroke={BRAND.goldLight} strokeWidth="0.5" />
        <circle cx="400" cy="200" r="300" fill="none" stroke={BRAND.goldLight} strokeWidth="0.5" />
      </svg>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 5% 60px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 640 }}>
          <SectionLabel>Turnkey Home Construction · Bengaluru & Beyond</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 700,
            color: "#FAF6EE",
            lineHeight: 1.05,
            margin: "12px 0 24px",
          }}>
            Where Your Dream<br />
            <span style={{ color: BRAND.goldLight }}>Becomes Home.</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75, marginBottom: 40, maxWidth: 500,
          }}>
            End-to-end home construction — from planning, design, and approvals to
            the complete handover of your dream home. No middlemen, no hidden costs.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
            <CTAButton onClick={onConsult} primary>Get Free Consultation</CTAButton>
            <CTAButton primary={false}>View Our Homes</CTAButton>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {[
              { icon: "🏠", label: "Timely Delivery" },
              { icon: "🛡️", label: "Construction Guarantee" },
              { icon: "✅", label: "No Hidden Charges" },
              { icon: "🚫", label: "No Subcontracting" },
            ].map(f => <FeaturePill key={f.label} {...f} />)}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        borderTop: `1px solid rgba(184,147,90,0.2)`,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          padding: "28px 5%", gap: 1,
        }}>
          {[
            { n: "750", s: "+", l: "Individual Homes Delivered" },
            { n: "18", s: "+", l: "Cities Served" },
            { n: "96", s: "%", l: "On-Time Handover Rate" },
            { n: "10", s: " Yr", l: "Waterproofing Warranty" },
          ].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36, fontWeight: 700, color: BRAND.goldLight, lineHeight: 1,
              }}>{s.n}<span style={{ fontSize: 20 }}>{s.s}</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4, letterSpacing: "0.04em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Media Strip ───────────────────────────────────────────────────────────────
function MediaStrip() {
  const outlets = [
    "Your Story", "The Better India", "Deccan Herald",
    "Times of India", "Hindustan Metro", "Realty NXT"
  ];
  return (
    <section style={{ background: BRAND.goldPale, padding: "20px 5%", borderBottom: `1px solid ${BRAND.goldLight}33` }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: BRAND.muted, whiteSpace: "nowrap",
        }}>As Featured In</span>
        <div style={{ width: 1, height: 20, background: BRAND.goldLight }} />
        {outlets.map(o => (
          <span key={o} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15, fontWeight: 700,
            color: BRAND.earthMid, letterSpacing: "0.02em",
          }}>{o}</span>
        ))}
      </div>
    </section>
  );
}

// ── About / Features ─────────────────────────────────────────────────────────
function FeatureBlock({ icon, title, description, accent }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "80px 1fr",
      gap: 28, alignItems: "start",
      padding: "36px 40px",
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${BRAND.goldPale}`,
      transition: "box-shadow 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 40px rgba(184,147,90,0.15)`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: accent || BRAND.goldPale,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 700, color: BRAND.earth, marginBottom: 10,
        }}>{title}</h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, color: BRAND.muted, lineHeight: 1.7, margin: 0,
        }}>{description}</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section style={{ background: BRAND.cream, padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>About Manemithra</SectionLabel>
          <Heading>One-Stop Solution for Your Dream Home</Heading>
          <GoldDivider />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, color: BRAND.muted, lineHeight: 1.75,
            maxWidth: 600, margin: "0 auto",
          }}>
            With over 10 years of tireless experience in home construction, Manemithra
            combines traditional craftsmanship with modern innovation to deliver homes that
            stand the test of time.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <FeatureBlock
            icon="🏗️"
            title="10+ Years of Expert Experience"
            description="Our hands-on experience sets the stage for exceptional home building. We pioneer approaches that tackle challenging projects and craft new possibilities in home construction, always aligned with your vision."
            accent="#FEF3E2"
          />
          <FeatureBlock
            icon="🥽"
            title="VR360 Walkthrough Technology"
            description="Our advanced VR360 walkthroughs let you visualize every corner of your dream home before a single brick is laid. Explore, adjust, and approve — all before construction begins."
            accent="#EEF3EC"
          />
          <FeatureBlock
            icon="📱"
            title="Real-Time App Tracking"
            description="Track your project's progress from anywhere via the Manemithra app. Monitor milestones, access drawings, review payment schedules, and download invoices — all in one place."
            accent="#EDF4FB"
          />
          <FeatureBlock
            icon="✏️"
            title="Bespoke Architectural Designs"
            description="Our in-house architects and planners bring fresh ideas to every project — from floor plans and elevations to door grills and lighting — ensuring your home is as unique as you are."
            accent="#F5EDD9"
          />
        </div>
      </div>
    </section>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────
function StepItem({ number, icon, title, points, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      all: "unset", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 16,
      padding: "18px 24px",
      borderRadius: 12,
      background: active ? BRAND.gold : "transparent",
      transition: "all 0.3s ease",
      width: "100%", boxSizing: "border-box",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
        background: active ? BRAND.earth : "rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 18, fontWeight: 700,
        color: active ? BRAND.goldLight : "rgba(255,255,255,0.5)",
      }}>{String(number).padStart(2, "0")}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: 600,
        color: active ? BRAND.earth : "rgba(255,255,255,0.75)",
      }}>{title}</div>
    </button>
  );
}

const STEPS = [
  {
    title: "Let's Get Started", icon: "🚀",
    desc: "Enquire and schedule an appointment with our experts. Our technical sales executives will understand your requirements, address every detail, and provide a clear project estimate.",
    points: ["Understanding your construction requirements", "Defining your construction criteria & budget"],
  },
  {
    title: "Design Specifications", icon: "📐",
    desc: "Our in-house architects begin the design process once the token advance is received, transforming your needs into a detailed 3D virtual blueprint.",
    points: ["3D architectural floor plan & elevation designs", "Vaastu-compliant design as per your preference"],
  },
  {
    title: "Client Agreement", icon: "📝",
    desc: "Once design is approved, costs are finalized and we sign the stamp paper agreement. Transparent, fixed-cost pricing is guaranteed — no surprises.",
    points: ["No subcontracting of any kind", "Full transparency from contract start"],
  },
  {
    title: "Construction & Updates", icon: "🏗️",
    desc: "Construction begins within 30–45 days of signing. Our execution team ensures full transparency through monthly reviews and expert material guidance.",
    points: ["Real-time progress tracking via the Manemithra App", "Clear communication at every stage"],
  },
  {
    title: "Site Visits", icon: "👷",
    desc: "Regular site visits by architects, structural & MEP designers, and project managers ensure 100% quality and safety compliance throughout the build.",
    points: ["Comprehensive site and material management", "Periodic quality & safety team audits"],
  },
  {
    title: "Completion & Handover", icon: "🔑",
    desc: "The final handover marks the successful completion of your journey with us. Your fully-finished home is handed over with an inspection kit and ongoing support.",
    points: ["Complete final inspection and handover kit", "Ongoing support & satisfaction assurance"],
  },
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section style={{
      background: `linear-gradient(135deg, ${BRAND.earth} 0%, #2A1A10 100%)`,
      padding: "100px 5%",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>How It Works</SectionLabel>
          <Heading light>Your Roadmap to Building the Home of Your Dreams</Heading>
          <GoldDivider />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }}>
          {/* Steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {STEPS.map((s, i) => (
              <StepItem key={i} number={i + 1} {...s} active={active === i} onClick={() => setActive(i)} />
            ))}
          </div>

          {/* Detail panel */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid rgba(184,147,90,0.25)`,
            borderRadius: 20,
            padding: "48px",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>{STEPS[active].icon}</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: BRAND.gold, marginBottom: 8,
            }}>Step {String(active + 1).padStart(2, "0")}</div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 30, fontWeight: 700, color: "#FAF6EE", margin: "0 0 16px",
            }}>{STEPS[active].title}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 28px",
            }}>{STEPS[active].desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STEPS[active].points.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: BRAND.gold, marginTop: 7, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, color: "rgba(255,255,255,0.7)",
                  }}>{p}</span>
                </div>
              ))}
            </div>
            {active < STEPS.length - 1 && (
              <button onClick={() => setActive(a => a + 1)} style={{
                marginTop: 36,
                padding: "12px 28px",
                background: "transparent",
                border: `1px solid ${BRAND.gold}`,
                borderRadius: 4,
                color: BRAND.gold,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600,
                letterSpacing: "0.08em",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.background = BRAND.gold; e.target.style.color = BRAND.earth; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = BRAND.gold; }}
              >
                Next Step →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Packages ─────────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    name: "Essential", price: "₹1,680", unit: "/sq.ft",
    features: ["Structural work", "Basic flooring", "Standard fixtures", "Interior paint", "Electrical & plumbing"],
    featured: false, color: BRAND.sage,
  },
  {
    name: "Premium", price: "₹1,899", unit: "/sq.ft",
    features: ["Everything in Essential", "Modular kitchen", "Premium flooring", "Branded fixtures", "False ceiling"],
    featured: true, color: BRAND.gold,
  },
  {
    name: "Luxury", price: "₹2,370", unit: "/sq.ft",
    features: ["Everything in Premium", "Custom furniture", "Smart home basics", "Premium paint finish", "Landscaping"],
    featured: false, color: BRAND.earthMid,
  },
  {
    name: "The One+", price: "₹3,099", unit: "/sq.ft",
    features: ["Everything in Luxury", "Full smart home", "Pool/garden design", "VIP project manager", "5-yr maintenance"],
    featured: false, color: "#8B6914",
  },
  {
    name: "Green Home", price: "₹1,900", unit: "/sq.ft",
    features: ["IGBC certified build", "Solar-ready structure", "Rainwater harvesting", "Eco materials", "Energy-efficient design"],
    featured: false, color: BRAND.sage,
  },
];

function PackageCard({ pkg }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        border: pkg.featured ? `2px solid ${BRAND.gold}` : `1px solid ${BRAND.goldPale}`,
        background: pkg.featured ? BRAND.earth : "#fff",
        padding: "36px 28px",
        position: "relative",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hov ? "0 16px 40px rgba(61,43,31,0.15)" : "none",
      }}
    >
      {pkg.featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: BRAND.gold, color: BRAND.earth,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", padding: "5px 16px", borderRadius: 20,
          whiteSpace: "nowrap",
        }}>Most Popular</div>
      )}

      <div style={{
        width: 12, height: 12, borderRadius: "50%",
        background: pkg.color, marginBottom: 16,
      }} />

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 26, fontWeight: 700,
        color: pkg.featured ? BRAND.goldLight : BRAND.earth,
        marginBottom: 4,
      }}>{pkg.name}</h3>

      <div style={{ marginBottom: 24 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 36, fontWeight: 700,
          color: pkg.featured ? "#fff" : BRAND.gold,
        }}>{pkg.price}</span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: pkg.featured ? "rgba(255,255,255,0.5)" : BRAND.muted,
        }}>{pkg.unit}</span>
      </div>

      <div style={{
        height: 1,
        background: pkg.featured ? "rgba(255,255,255,0.1)" : BRAND.goldPale,
        margin: "0 0 24px",
      }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {pkg.features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: BRAND.gold, fontSize: 14, marginTop: 1 }}>✦</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, lineHeight: 1.5,
              color: pkg.featured ? "rgba(255,255,255,0.7)" : BRAND.muted,
            }}>{f}</span>
          </div>
        ))}
      </div>

      <button style={{
        width: "100%", padding: "12px 0",
        background: pkg.featured ? BRAND.gold : "transparent",
        border: `1.5px solid ${pkg.featured ? BRAND.gold : BRAND.goldLight}`,
        borderRadius: 6, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 600, letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: pkg.featured ? BRAND.earth : BRAND.gold,
        transition: "all 0.2s",
      }}>Know More</button>
    </div>
  );
}

function Packages() {
  return (
    <section style={{ background: BRAND.cream, padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Our Packages</SectionLabel>
          <Heading>Explore Our Popular Packages</Heading>
          <GoldDivider />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: BRAND.muted, lineHeight: 1.75,
            maxWidth: 500, margin: "0 auto",
          }}>
            From essential to ultra-luxury, every package comes with a fixed-cost guarantee, dedicated project management, and zero subcontracting.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 20, alignItems: "start",
        }}>
          {PACKAGES.map(p => <PackageCard key={p.name} pkg={p} />)}
        </div>
      </div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
const PROJECT_ITEMS = [
  { loc: "Kengeri, Bengaluru", area: "3,735 sqft", floors: "G+2.5", price: "₹75 Lakhs", bg: "#D4C5B5" },
  { loc: "Mysuru", area: "3,100 sqft", floors: "G+1", price: "₹86 Lakhs", bg: "#C5D0C0" },
  { loc: "Tippasandra, Bengaluru", area: "7,343 sqft", floors: "G+2.5", price: "₹2 Crores", bg: "#BFC9D4" },
  { loc: "Jayanagar, Bengaluru", area: "4,530 sqft", floors: "G+2.5", price: "₹1 Crore", bg: "#D4C5B0" },
  { loc: "Whitefield, Bengaluru", area: "2,536 sqft", floors: "G+1.5", price: "₹54 Lakhs", bg: "#C8C2D4" },
  { loc: "Coimbatore", area: "2,800 sqft", floors: "G+1", price: "₹48 Lakhs", bg: "#D4C8B8" },
];

function ProjectCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 12, overflow: "hidden",
        border: `1px solid ${BRAND.goldPale}`,
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: hov ? "scale(1.02)" : "scale(1)",
        boxShadow: hov ? "0 12px 36px rgba(61,43,31,0.18)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Placeholder image block */}
      <div style={{
        height: 220,
        background: `linear-gradient(135deg, ${item.bg} 0%, ${item.bg}88 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          width: 80, height: 80,
          border: `2px solid rgba(184,147,90,0.4)`,
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36,
        }}>🏡</div>
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: BRAND.earth, color: BRAND.goldLight,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 700, padding: "4px 10px",
          borderRadius: 4, letterSpacing: "0.06em",
        }}>{item.price}</div>
      </div>

      <div style={{ padding: "18px 20px", background: "#fff" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17, fontWeight: 700, color: BRAND.earth, marginBottom: 8,
        }}>📍 {item.loc}</div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["Area", item.area], ["Floors", item.floors]].map(([k, v]) => (
            <div key={k}>
              <div style={{
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                color: BRAND.muted, fontFamily: "'DM Sans', sans-serif",
              }}>{k}</div>
              <div style={{
                fontSize: 14, fontWeight: 600, color: BRAND.earthMid,
                fontFamily: "'DM Sans', sans-serif",
              }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section style={{ background: "#fff", padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Completed Works</SectionLabel>
          <Heading>Homes We've Crafted with Pride</Heading>
          <GoldDivider />
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {PROJECT_ITEMS.map(p => <ProjectCard key={p.loc} item={p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <CTAButton primary={false}>View All Projects</CTAButton>
        </div>
      </div>
    </section>
  );
}

// ── Green Homes ───────────────────────────────────────────────────────────────
function GreenHomes() {
  const features = [
    { icon: "🌱", title: "IGBC Certified Builds", desc: "Recognised and certified by the Indian Green Building Council for sustainable construction." },
    { icon: "☀️", title: "Energy-Efficient Design", desc: "Passive cooling, natural ventilation, and solar-ready structures to minimise environmental impact." },
    { icon: "💧", title: "Rainwater Harvesting", desc: "Integrated systems that save up to 40,000 litres of water per year for each home." },
    { icon: "♻️", title: "Eco-Friendly Materials", desc: "Responsibly sourced, low-carbon materials that reduce your home's lifetime footprint." },
  ];
  return (
    <section style={{
      background: `linear-gradient(160deg, #1A2A18 0%, ${BRAND.sage} 100%)`,
      padding: "100px 5%", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <SectionLabel>Eco-Friendly Living</SectionLabel>
            <Heading light size="lg">Green Home Construction</Heading>
            <GoldDivider />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 36px",
            }}>
              Build a home that's kind to the planet without compromising on comfort or elegance.
              Our green home specialists design spaces that stay naturally cool in summer, save
              water year-round, and reduce your energy bills for decades.
            </p>
            <CTAButton primary>Explore Green Homes</CTAButton>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {features.map(f => (
              <div key={f.title} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12, padding: "24px 20px",
                backdropFilter: "blur(6px)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <h4 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, fontWeight: 700, color: "#FAF6EE", marginBottom: 8,
                }}>{f.title}</h4>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0,
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Deepa R.", location: "Bengaluru",
    quote: "From first consultation to final handover, Manemithra's team made the entire journey stress-free. Our home was delivered exactly on time and beyond our expectations.",
    rating: 5,
  },
  {
    name: "Krishna Prasad", location: "Mysuru",
    quote: "The VR360 walkthrough was a game-changer. We could tweak designs before any work started. The transparency throughout the construction phase was genuinely impressive.",
    rating: 5,
  },
  {
    name: "Sowmyashree & Kiran", location: "Tippasandra",
    quote: "We were skeptical about trusting any builder fully, but Manemithra's fixed-cost model and the app-tracking completely won us over. No surprises, no hidden charges.",
    rating: 5,
  },
  {
    name: "Arpitha M.", location: "Jayanagar",
    quote: "The green home package was exactly what we needed. Our electricity bill has dropped by almost half and the home stays cool even in peak summer — absolutely worth it.",
    rating: 5,
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: BRAND.goldPale, padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Testimonials</SectionLabel>
          <Heading>Stories From Happy Homeowners</Heading>
          <GoldDivider />
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: "48px",
            border: `1px solid ${BRAND.goldLight}44`,
            boxShadow: "0 8px 40px rgba(184,147,90,0.12)",
            minHeight: 220,
            position: "relative",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 80, color: BRAND.goldPale,
              position: "absolute", top: 16, left: 32, lineHeight: 1,
              userSelect: "none",
            }}>"</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, lineHeight: 1.7, color: BRAND.earth,
              margin: "0 0 28px", position: "relative", zIndex: 1, fontStyle: "italic",
            }}>
              {TESTIMONIALS[active].quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 700, color: BRAND.earth,
                }}>{TESTIMONIALS[active].name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, color: BRAND.muted,
                }}>📍 {TESTIMONIALS[active].location}</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {Array(TESTIMONIALS[active].rating).fill(0).map((_, i) => (
                  <span key={i} style={{ color: BRAND.gold, fontSize: 16 }}>★</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                all: "unset", cursor: "pointer",
                width: i === active ? 32 : 10,
                height: 10, borderRadius: 5,
                background: i === active ? BRAND.gold : BRAND.goldLight,
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Brands ────────────────────────────────────────────────────────────────────
function Brands() {
  const brands = [
    "Kamdhenu Steel", "Kajaria Tiles", "Dr. Fixit", "ACC Cement",
    "UltraTech", "Asian Paints", "JSW Steel", "Bhuwalka Steel"
  ];
  return (
    <section style={{ background: "#fff", padding: "60px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase", color: BRAND.muted, marginBottom: 32,
        }}>Our Trusted Material Partners</p>
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: 12, justifyContent: "center",
        }}>
          {brands.map(b => (
            <div key={b} style={{
              padding: "12px 24px",
              border: `1px solid ${BRAND.goldPale}`,
              borderRadius: 40,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600, color: BRAND.earthMid,
              background: BRAND.cream,
            }}>{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is the cost per square foot to build a house with Manemithra?",
    a: "Our packages start from ₹1,680 per sq.ft. and go up to ₹3,099+ per sq.ft. depending on the package, design choices, and materials selected."
  },
  {
    q: "Is the quoted cost final?",
    a: "The base package cost is fixed and transparent. Additional charges may apply only for client-requested customisations or upgrades, which are discussed and agreed upon in writing before execution."
  },
  {
    q: "What is included in the package?",
    a: "Packages include complete architectural, MEP & structural drawings, all civil construction with finishing, paint, sanitary fixtures, soil tests, plan sanction liaison, and all applicable taxes."
  },
  {
    q: "Are taxes included in the quoted price?",
    a: "Yes — GST and all applicable taxes are included within the package pricing. Manemithra is fully statutorily compliant with no surprise charges."
  },
  {
    q: "Does Manemithra subcontract work to third parties?",
    a: "No. All construction work is executed by our in-house teams. We never subcontract, ensuring consistent quality, accountability, and your peace of mind throughout the project."
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: BRAND.cream, padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
        <div>
          <SectionLabel>FAQ</SectionLabel>
          <Heading>Common Questions Answered</Heading>
          <GoldDivider />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: BRAND.muted, lineHeight: 1.75, margin: "0 0 36px",
          }}>
            Have more questions? Our team is happy to walk you through every detail before you commit to a single rupee.
          </p>
          <CTAButton primary>Talk to an Expert</CTAButton>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{
              border: `1px solid ${open === i ? BRAND.goldLight : BRAND.goldPale}`,
              borderRadius: 10, overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                all: "unset", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "18px 22px", boxSizing: "border-box",
                background: open === i ? BRAND.goldPale : "#fff",
                transition: "background 0.2s",
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 600, color: BRAND.earth,
                }}>{f.q}</span>
                <span style={{
                  color: BRAND.gold, fontSize: 20, fontWeight: 300,
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.3s", flexShrink: 0, marginLeft: 16,
                }}>+</span>
              </button>
              {open === i && (
                <div style={{
                  padding: "0 22px 18px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, color: BRAND.muted, lineHeight: 1.75,
                  background: BRAND.goldPale,
                }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Consultation Form ─────────────────────────────────────────────────────────
function ConsultationModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "", plotSize: "", requirements: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!submitted) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(28,20,12,0.8)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{
          background: "#fff",
          borderRadius: 20,
          padding: "48px",
          maxWidth: 520, width: "100%",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
        }}>
          <button onClick={onClose} style={{
            all: "unset", cursor: "pointer",
            position: "absolute", top: 20, right: 20,
            color: BRAND.muted, fontSize: 22, lineHeight: 1,
          }}>×</button>

          <SectionLabel>Free Consultation</SectionLabel>
          <Heading size="md">Stop Dreaming. Start Building.</Heading>
          <GoldDivider />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, color: BRAND.muted, lineHeight: 1.6, margin: "0 0 28px",
          }}>Our experts will call you within 24 hours with a detailed quote.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "name", placeholder: "Your Full Name", type: "text" },
              { key: "phone", placeholder: "Phone Number", type: "tel" },
            ].map(({ key, placeholder, type }) => (
              <input key={key} type={type} placeholder={placeholder} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{
                  padding: "14px 16px", borderRadius: 8,
                  border: `1.5px solid ${BRAND.goldPale}`,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: BRAND.earth,
                  outline: "none", background: "#fff",
                }}
              />
            ))}

            <select value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={{
              padding: "14px 16px", borderRadius: 8,
              border: `1.5px solid ${BRAND.goldPale}`,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: BRAND.earth,
              background: "#fff", outline: "none",
            }}>
              <option value="">Select City</option>
              {["Bengaluru", "Mysuru", "Chennai", "Coimbatore", "Hubli", "Davangere"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select value={form.plotSize} onChange={e => setForm(f => ({ ...f, plotSize: e.target.value }))} style={{
              padding: "14px 16px", borderRadius: 8,
              border: `1.5px solid ${BRAND.goldPale}`,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: BRAND.earth,
              background: "#fff", outline: "none",
            }}>
              <option value="">Select Plot Size (min. 810 sq.ft.)</option>
              <option>810 – 1200 sq.ft.</option>
              <option>1200 – 1500 sq.ft.</option>
              <option>1500 – 2400 sq.ft.</option>
              <option>Above 2400 sq.ft.</option>
            </select>

            <textarea rows={3} placeholder="Construction requirements" value={form.requirements}
              onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
              style={{
                padding: "14px 16px", borderRadius: 8,
                border: `1.5px solid ${BRAND.goldPale}`,
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: BRAND.earth,
                resize: "none", outline: "none", background: "#fff",
              }}
            />

            <CTAButton onClick={() => setSubmitted(true)} primary>Submit Request</CTAButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(28,20,12,0.8)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "60px 48px",
        maxWidth: 440, textAlign: "center",
        boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
        <Heading size="md">Request Received!</Heading>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, color: BRAND.muted, lineHeight: 1.7, margin: "16px 0 32px",
        }}>Our construction expert will call you within 24 hours. Welcome to the Manemithra family!</p>
        <CTAButton onClick={onClose} primary>Close</CTAButton>
      </div>
    </div>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner({ onConsult }) {
  return (
    <section style={{
      background: BRAND.earth,
      padding: "80px 5%",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(184,147,90,0.15) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionLabel>Let's Begin</SectionLabel>
        <Heading light>Creating Homes That Reflect You</Heading>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75,
          maxWidth: 500, margin: "16px auto 36px",
        }}>
          Experience personalised, hassle-free construction services from concept to handover.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton onClick={onConsult} primary>Get a Free Quote</CTAButton>
          <CTAButton primary={false}>Call +91 98765 43210</CTAButton>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const links = {
    "Quick Links": ["Our Homes", "Green Homes", "How It Works", "Packages", "Designs"],
    "Company": ["About Us", "Testimonials", "Careers", "Blog", "Contact Us"],
    "Legal": ["Privacy Policy", "Terms & Conditions", "Sitemap"],
  };
  return (
    <footer style={{ background: BRAND.charcoal, padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24, fontWeight: 700, color: BRAND.goldLight, marginBottom: 12,
            }}>Manemithra</div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75,
              maxWidth: 280,
            }}>
              Manemithra is your one-stop solution for all home construction needs — comprehensive, turnkey, and end-to-end for every home building requirement and desire.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["Facebook", "Instagram", "LinkedIn", "YouTube"].map(s => (
                <div key={s} style={{
                  width: 34, height: 34, borderRadius: "50%",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10, color: "rgba(255,255,255,0.4)",
                }}>{s[0]}</div>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: BRAND.gold, marginBottom: 16,
              }}>{section}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#" style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    textDecoration: "none", transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.target.style.color = BRAND.goldLight}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                  >{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0,
          }}>© 2024 Manemithra Homes Pvt. Ltd. All Rights Reserved.</p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0,
          }}>Crafted with care in Bengaluru 🌿</p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Button ───────────────────────────────────────────────────────────
function WhatsAppFAB() {
  const [hov, setHov] = useState(false);
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 99,
        width: 56, height: 56, borderRadius: "50%",
        background: hov ? "#128C7E" : "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "all 0.3s",
        transform: hov ? "scale(1.1)" : "scale(1)",
        textDecoration: "none", fontSize: 24,
      }}>
      💬
    </a>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAF6EE; }
      `}</style>

      <Navbar onConsult={() => setShowModal(true)} />
      <Hero onConsult={() => setShowModal(true)} />
      <MediaStrip />
      <About />
      <HowItWorks />
      <Packages />
      <GreenHomes />
      <Projects />
      <Testimonials />
      <Brands />
      <FAQ />
      <CTABanner onConsult={() => setShowModal(true)} />
      <Footer />
      <WhatsAppFAB />

      {showModal && <ConsultationModal onClose={() => setShowModal(false)} />}
    </>
  );
}
