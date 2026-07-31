import { createContext, useContext, useEffect, useState } from "react";
import { getAllSections } from "../lib/contentService";
import { CONTENT_DEFAULTS } from "../lib/contentDefaults";

export const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(CONTENT_DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getAllSections();
        if (!cancelled) setContent(data);
      } catch {
        if (!cancelled) setContent(CONTENT_DEFAULTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = async () => {
    try {
      const data = await getAllSections();
      setContent(data);
    } catch {
      /* keep current */
    }
  };

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContentContext() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContentContext must be used within SiteContentProvider");
  return ctx;
}

/** Get one section with loading state */
export function useSiteContent(sectionId) {
  const { content, loading } = useSiteContentContext();
  return { data: content[sectionId] ?? CONTENT_DEFAULTS[sectionId], loading };
}
