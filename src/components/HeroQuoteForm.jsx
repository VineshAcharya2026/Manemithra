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

const fieldLabel =
  "mb-0 block font-sans text-[10px] font-semibold uppercase tracking-wide text-white/85";
const fieldInput =
  "w-full border-0 border-b border-white/30 bg-transparent py-1 font-sans text-[13px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-gold";

export default function HeroQuoteForm() {
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
      )
    );
  };

  return (
    <div className="w-full rounded-lg border border-white/10 bg-black/55 p-3 shadow-card-dark backdrop-blur-sm sm:p-3.5 lg:max-h-[min(420px,calc(100vh-12rem))] lg:overflow-y-auto">
      <div className="mb-2 border-b border-white/10 pb-2">
        <h2 className="font-sans text-sm font-bold text-white">
          Get a Free Quote Now!
        </h2>
        <p className="font-sans text-[10px] leading-snug text-white/70">
          From concept to completion — we handle it all.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 sm:col-span-1">
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
              <p className="mt-0.5 text-[9px] leading-tight text-error-text">
                {errors.name}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={fieldLabel} htmlFor="hero-phone">
              Phone<span className="text-gold">*</span>
            </label>
            <div className="flex items-center gap-1 border-b border-white/30 focus-within:border-gold">
              <span className="text-[10px] text-white/75">+91</span>
              <input
                id="hero-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Mobile"
                value={form.phone}
                onChange={(e) =>
                  set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="min-w-0 flex-1 border-0 bg-transparent py-1 text-[13px] text-white outline-none"
              />
            </div>
            {errors.phone && (
              <p className="mt-0.5 text-[9px] leading-tight text-error-text">
                {errors.phone}
              </p>
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
              <option value="" className="bg-navy">
                Select
              </option>
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-navy">
                  {c}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="mt-0.5 text-[9px] leading-tight text-error-text">
                {errors.location}
              </p>
            )}
          </div>
          <div>
            <label className={fieldLabel} htmlFor="hero-plot">
              Plot<span className="text-gold">*</span>
            </label>
            <select
              id="hero-plot"
              value={form.plotSize}
              onChange={(e) => set("plotSize", e.target.value)}
              className={`${fieldInput} cursor-pointer text-[12px]`}
            >
              <option value="" className="bg-navy">
                Size
              </option>
              {PLOT_SIZES.map((p) => (
                <option key={p} value={p} className="bg-navy">
                  {p}
                </option>
              ))}
            </select>
            {errors.plotSize && (
              <p className="mt-0.5 text-[9px] leading-tight text-error-text">
                {errors.plotSize}
              </p>
            )}
          </div>
          <div className="col-span-2">
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
              <p className="mt-0.5 text-[9px] leading-tight text-error-text">
                {errors.requirements}
              </p>
            )}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-1.5 pt-0.5">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-3 w-3 shrink-0 accent-gold"
          />
          <span className="font-sans text-[9px] leading-snug text-white/60">
            I agree to be contacted via call, SMS, or WhatsApp.
          </span>
        </label>
        {errors.consent && (
          <p className="text-[9px] text-error-text">{errors.consent}</p>
        )}

        <button type="submit" className="btn-primary w-full !py-2 !text-[11px]">
          Submit
        </button>
      </form>
    </div>
  );
}
