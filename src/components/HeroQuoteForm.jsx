import { useState } from "react";
import {
  CITIES,
  PLOT_SIZES,
  validateQuoteForm,
} from "../lib/formValidation";
import {
  buildQuoteWhatsAppMessage,
  openWhatsAppWithMessage,
} from "../lib/whatsapp";
import { useWhatsAppNumber } from "../hooks/useWhatsAppNumber";

const fieldLabel =
  "mb-1 block font-sans text-[10px] font-semibold tracking-[0.12em] text-silver/90 uppercase";
const fieldInput =
  "w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 font-sans text-[13px] text-white placeholder:text-white/30 outline-none transition-all focus:border-gold focus:bg-white/10 focus:ring-1 focus:ring-gold/30";

export default function HeroQuoteForm() {
  const whatsapp = useWhatsAppNumber();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    plotSize: "",
    requirements: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ok, errors: nextErrors } = validateQuoteForm(form, {
      requireConsent: true,
    });
    if (!ok) {
      setErrors(nextErrors);
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    openWhatsAppWithMessage(
      buildQuoteWhatsAppMessage(
        { ...form, phone: phoneDigits },
        { source: "hero form" }
      ),
      whatsapp
    );
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-teal-dark/80 p-4 shadow-card-dark backdrop-blur-md sm:p-5">
      <div className="mb-4 border-b border-white/10 pb-3">
        <h2 className="font-serif text-lg font-bold text-white">Get a Free Quote</h2>
        <p className="mt-0.5 font-sans text-[11px] leading-relaxed text-white/60">
          Indian design, build & handover — start your journey across India today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className={fieldLabel} htmlFor="hero-name">
              Name<span className="text-gold">*</span>
            </label>
            <input
              id="hero-name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={fieldInput}
            />
            {errors.name && (
              <p className="mt-1 text-[9px] text-error-text">{errors.name}</p>
            )}
          </div>
          <div className="sm:col-span-1">
            <label className={fieldLabel} htmlFor="hero-phone">
              Phone<span className="text-gold">*</span>
            </label>
            <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/30">
              <span className="text-[11px] text-silver/80">+91</span>
              <input
                id="hero-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Mobile number"
                value={form.phone}
                onChange={(e) =>
                  set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-white outline-none placeholder:text-white/30"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-[9px] text-error-text">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className={fieldLabel} htmlFor="hero-location">
              City<span className="text-gold">*</span>
            </label>
            <select
              id="hero-location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={`${fieldInput} cursor-pointer`}
            >
              <option value="" className="bg-teal-dark">
                Select city
              </option>
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-teal-dark">
                  {c}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="mt-1 text-[9px] text-error-text">{errors.location}</p>
            )}
          </div>
          <div>
            <label className={fieldLabel} htmlFor="hero-plot">
              Plot size<span className="text-gold">*</span>
            </label>
            <select
              id="hero-plot"
              value={form.plotSize}
              onChange={(e) => set("plotSize", e.target.value)}
              className={`${fieldInput} cursor-pointer`}
            >
              <option value="" className="bg-teal-dark">
                Select size
              </option>
              {PLOT_SIZES.map((p) => (
                <option key={p} value={p} className="bg-teal-dark">
                  {p}
                </option>
              ))}
            </select>
            {errors.plotSize && (
              <p className="mt-1 text-[9px] text-error-text">{errors.plotSize}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className={fieldLabel} htmlFor="hero-req">
              Requirements<span className="text-gold">*</span>
            </label>
            <input
              id="hero-req"
              type="text"
              placeholder="G+2, 3BHK, modular kitchen…"
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              className={fieldInput}
            />
            {errors.requirements && (
              <p className="mt-1 text-[9px] text-error-text">{errors.requirements}</p>
            )}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
          />
          <span className="font-sans text-[10px] leading-snug text-white/55">
            I agree to be contacted via call, SMS, or WhatsApp.
          </span>
        </label>
        {errors.consent && (
          <p className="text-[9px] text-error-text">{errors.consent}</p>
        )}

        <button type="submit" className="btn-primary w-full !py-2.5 !text-xs tracking-widest">
          Request Quote
        </button>
      </form>
    </div>
  );
}
