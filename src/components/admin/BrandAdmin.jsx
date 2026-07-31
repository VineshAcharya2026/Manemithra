import { useEffect, useState } from "react";
import { getSection, updateSection, uploadSiteImage } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";
import ImageUploader from "./ImageUploader";

export default function BrandAdmin() {
  const [form, setForm] = useState(CONTENT_DEFAULTS.brand);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [darkFile, setDarkFile] = useState(null);
  const [lightFile, setLightFile] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getSection("brand");
      setForm(data ?? CONTENT_DEFAULTS.brand);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (darkFile) {
        payload.logoDarkUrl = await uploadSiteImage("siteContent/logos/dark", darkFile);
      }
      if (lightFile) {
        payload.logoLightUrl = await uploadSiteImage("siteContent/logos/light", lightFile);
      }
      await updateSection("brand", payload);
      setDarkFile(null);
      setLightFile(null);
      await load();
    } catch (err) {
      alert(err.message || "Failed to save brand.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <form onSubmit={handleSave} className="max-w-2xl rounded-xl border border-gray-light bg-white p-6 shadow-card-sm">
      <h2 className="mb-4 font-serif text-xl font-bold text-teal">Brand</h2>
      <div className="flex flex-col gap-3">
        {[
          ["name", "Brand name"],
          ["tagline", "Tagline"],
          ["pillars", "Pillars"],
          ["positioning", "Positioning"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-1 block text-xs font-semibold text-teal">{label}</label>
            <input className="input-field" value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} />
          </div>
        ))}
        <div>
          <label className="mb-1 block text-xs font-semibold text-teal">Promise</label>
          <textarea className="input-field min-h-[100px]" value={form.promise ?? ""} onChange={(e) => set("promise", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-teal">Values (one per line)</label>
          <textarea
            className="input-field min-h-[80px]"
            value={(form.values ?? []).join("\n")}
            onChange={(e) =>
              set(
                "values",
                e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        </div>
        <ImageUploader
          label="Dark logo (navbar/footer)"
          previewUrl={form.logoDarkUrl}
          onFileSelect={setDarkFile}
          onClear={() => set("logoDarkUrl", "/logo-dark.jpg")}
        />
        <ImageUploader
          label="Light logo"
          previewUrl={form.logoLightUrl}
          onFileSelect={setLightFile}
          onClear={() => set("logoLightUrl", "/logo-light.jpg")}
        />
      </div>
      <button type="submit" className="btn-primary mt-6" disabled={saving}>
        {saving ? "Saving…" : "Save brand"}
      </button>
    </form>
  );
}
