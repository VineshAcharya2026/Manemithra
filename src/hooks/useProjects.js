import { useEffect, useState } from "react";
import { PROJECT_ITEMS } from "../lib/constants";
import { listProjects, toProjectItem } from "../lib/projectsService";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromFirestore, setFromFirestore] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const docs = await listProjects({ admin: false });
        if (cancelled) return;
        if (docs.length > 0) {
          setProjects(docs.map(toProjectItem));
          setFromFirestore(true);
        } else {
          setProjects(PROJECT_ITEMS);
          setFromFirestore(false);
        }
      } catch {
        if (!cancelled) {
          setProjects(PROJECT_ITEMS);
          setFromFirestore(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, fromFirestore };
}
