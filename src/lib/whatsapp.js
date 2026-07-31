/** Default admin WhatsApp number (no + or spaces) */
export const ADMIN_WHATSAPP = "919686796232";

export function buildQuoteWhatsAppMessage(form, meta = {}) {
  const lines = [
    "*New Quote Request — Mane Mithra*",
    "",
    `*Name:* ${form.name}`,
    `*Phone:* +91 ${form.phone}`,
    `*Location:* ${form.location || "—"}`,
    `*Plot Size:* ${form.plotSize || "—"}`,
    `*Requirements:* ${form.requirements}`,
  ];

  if (meta.packageName) lines.push(`*Package:* ${meta.packageName}`);
  if (meta.projectInterest) lines.push(`*Project:* ${meta.projectInterest}`);

  lines.push("", `_Via ${meta.source || "website"}_`);
  return lines.join("\n");
}

export function openWhatsAppWithMessage(message, phone = ADMIN_WHATSAPP) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function formatPhoneDisplay(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

export function phoneTelHref(phone) {
  const digits = String(phone).replace(/\D/g, "");
  return `tel:+${digits.startsWith("91") ? digits : `91${digits}`}`;
}
