import { useEffect, useState } from "react";
import { listMedia } from "../lib/mediaService";

const DEFAULT_PRESS = [
  "Your Story",
  "The Better India",
  "Deccan Herald",
  "Times of India",
  "Hindustan Metro",
  "Realty NXT",
];

export function usePressMedia() {
  const [items, setItems] = useState(DEFAULT_PRESS.map((title, i) => ({ title, order: i })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const docs = await listMedia({ type: "press" });
        if (cancelled) return;
        if (docs.length > 0) {
          setItems(docs);
        } else {
          setItems(DEFAULT_PRESS.map((title, i) => ({ title, order: i })));
        }
      } catch {
        if (!cancelled) {
          setItems(DEFAULT_PRESS.map((title, i) => ({ title, order: i })));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
