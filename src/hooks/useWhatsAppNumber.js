import { useContext } from "react";
import { SiteContentContext } from "../context/SiteContentContext";
import { CONTENT_DEFAULTS } from "../lib/contentDefaults";
import { ADMIN_WHATSAPP } from "../lib/whatsapp";

/** Safe outside provider — falls back to defaults. */
export function useWhatsAppNumber() {
  const ctx = useContext(SiteContentContext);
  const settings = ctx?.content?.settings ?? CONTENT_DEFAULTS.settings;
  return settings?.whatsapp || ADMIN_WHATSAPP;
}
