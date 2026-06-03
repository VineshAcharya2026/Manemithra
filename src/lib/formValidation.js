export const CITIES = [
  "Bengaluru",
  "Mysuru",
  "Chennai",
  "Coimbatore",
  "Hubli",
  "Davangere",
];

export const PLOT_SIZES = [
  "810 – 1200 sq.ft.",
  "1200 – 1500 sq.ft.",
  "1500 – 2400 sq.ft.",
  "Above 2400 sq.ft.",
];

export function validateQuoteForm(form, { requireConsent = false } = {}) {
  const errors = {};

  if (!form.name?.trim()) errors.name = "Name is required.";

  const phone = (form.phone || "").replace(/\D/g, "");
  if (phone.length < 10) errors.phone = "Enter a valid 10-digit mobile number.";

  if (!form.location?.trim()) errors.location = "Please select a city.";

  if (!form.plotSize?.trim()) errors.plotSize = "Please select plot size.";

  if (!form.requirements?.trim()) errors.requirements = "Tell us your requirements.";

  if (requireConsent && !form.consent) {
    errors.consent = "Please accept the consent to continue.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function cityFromLocation(loc) {
  if (!loc) return "";
  if (loc.includes("Bengaluru")) return "Bengaluru";
  if (loc.includes("Mysuru")) return "Mysuru";
  if (loc.includes("Coimbatore")) return "Coimbatore";
  return "";
}
