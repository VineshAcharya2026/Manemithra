import { useEffect, useState } from "react";
import { getSection, updateSection } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";
import SectionFormAdmin from "./SectionFormAdmin";

export default function AboutGreenAdmin() {
  const [greenSection, setGreenSection] = useState(CONTENT_DEFAULTS.greenSection);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSection("greenSection");
        setGreenSection(data ?? CONTENT_DEFAULTS.greenSection);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (key, value) => setGreenSection((g) => ({ ...g, [key]: value }));

  const saveGreenSection = async () => {
    setSaving(true);
    try {
      await updateSection("greenSection", greenSection);
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
        <h2 className="mb-3 font-serif text-xl font-bold text-teal">Green section intro</h2>
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {[
                ["label", "Label"],
                ["title", "Title"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-semibold text-teal">{label}</label>
                  <input className="input-field" value={greenSection[key] ?? ""} onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-semibold text-teal">Description</label>
                <textarea className="input-field min-h-[80px]" value={greenSection.description ?? ""} onChange={(e) => set("description", e.target.value)} />
              </div>
            </div>
            <button type="button" className="btn-primary mt-4 !text-xs" onClick={saveGreenSection} disabled={saving}>
              {saving ? "Saving…" : "Save green intro"}
            </button>
          </>
        )}
      </div>

      <SectionFormAdmin sectionId="aboutFeatures" />
      <SectionFormAdmin sectionId="greenFeatures" />
    </div>
  );
}
