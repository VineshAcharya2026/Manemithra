/** Admin WhatsApp number (no + or spaces) */
export const ADMIN_WHATSAPP = "919686796232";

export function buildQuoteWhatsAppMessage(form, meta = {}) {
  const lines = [
    "*New Quote Request — Manemithra*",
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

export function openWhatsAppWithMessage(message) {
  const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
