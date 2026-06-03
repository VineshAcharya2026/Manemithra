import { useState } from "react";
import { CTAButton } from "./ui";
import {
  CITIES,
  PLOT_SIZES,
  validateQuoteForm,
} from "../lib/formValidation";
import {
  buildQuoteWhatsAppMessage,
  openWhatsAppWithMessage,
} from "../lib/whatsapp";

const inputCompact =
  "w-full rounded-md border border-gray-light bg-white px-3 py-2 font-sans text-sm text-body outline-none transition-all placeholder:text-muted/70 focus:border-gold focus:ring-2 focus:ring-[var(--gold-focus-ring)]";
const labelCompact = "mb-1 block font-sans text-[11px] font-semibold text-navy";

export default function CompactQuoteForm({
  onSuccess,
  meta = {},
  showConsent = false,
  submitLabel = "Submit via WhatsApp",
  className = "",
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: meta.location || "",
    plotSize: "",
    requirements: meta.packageName
      ? `Interested in ${meta.packageName} package`
      : "",
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
      requireConsent: showConsent,
    });
    if (!ok) {
      setErrors(nextErrors);
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    openWhatsAppWithMessage(
      buildQuoteWhatsAppMessage(
        { ...form, phone: phoneDigits },
        {
          source: meta.source || "quote popup",
          packageName: meta.packageName,
          projectInterest: meta.projectInterest,
        }
      )
    );
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2.5 ${className}`}>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className={labelCompact} htmlFor="q-name">
            Name *
          </label>
          <input
            id="q-name"
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            className={inputCompact}
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-0.5 text-[10px] text-error-text">{errors.name}</p>
          )}
        </div>
        <div>
          <label className={labelCompact} htmlFor="q-phone">
            Phone *
          </label>
          <div className="flex gap-1.5">
            <span className="flex items-center rounded-md border border-gray-light bg-surface px-2 text-xs text-muted">
              +91
            </span>
            <input
              id="q-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="10-digit mobile"
              className={`${inputCompact} min-w-0 flex-1`}
              autoComplete="tel"
            />
          </div>
          {errors.phone && (
            <p className="mt-0.5 text-[10px] text-error-text">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className={labelCompact} htmlFor="q-city">
            City *
          </label>
          <select
            id="q-city"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputCompact}
          >
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-0.5 text-[10px] text-error-text">{errors.location}</p>
          )}
        </div>
        <div>
          <label className={labelCompact} htmlFor="q-plot">
            Plot size *
          </label>
          <select
            id="q-plot"
            value={form.plotSize}
            onChange={(e) => set("plotSize", e.target.value)}
            className={inputCompact}
          >
            <option value="">Min 810 sq.ft.</option>
            {PLOT_SIZES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.plotSize && (
            <p className="mt-0.5 text-[10px] text-error-text">{errors.plotSize}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelCompact} htmlFor="q-req">
          Requirements *
        </label>
        <textarea
          id="q-req"
          rows={2}
          value={form.requirements}
          onChange={(e) => set("requirements", e.target.value)}
          placeholder="G+2, 3BHK, timeline…"
          className={`${inputCompact} resize-none`}
        />
        {errors.requirements && (
          <p className="mt-0.5 text-[10px] text-error-text">{errors.requirements}</p>
        )}
      </div>

      {showConsent && (
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 accent-gold"
          />
          <span className="text-[10px] leading-snug text-muted">
            I agree to be contacted via call/SMS/WhatsApp. Overrides DND where applicable.
          </span>
        </label>
      )}
      {errors.consent && (
        <p className="text-[10px] text-error-text">{errors.consent}</p>
      )}

      <CTAButton type="submit" primary className="!w-full !py-2.5 !text-xs">
        {submitLabel}
      </CTAButton>
    </form>
  );
}
