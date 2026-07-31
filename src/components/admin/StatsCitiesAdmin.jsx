import { useEffect, useState } from "react";
import { getSection, updateSection } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";

function StatListEditor({ label, items, onChange }) {
  const update = (idx, key, value) => {
    const next = items.map((item, i) => (i === idx ? { ...item, [key]: value } : item));
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
      <h3 className="mb-3 text-sm font-semibold text-teal">{label}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <input className="input-field !py-2 text-xs" placeholder="Value" value={item.value} onChange={(e) => update(idx, "value", e.target.value)} />
            <input className="input-field !py-2 text-xs" placeholder="Suffix" value={item.suffix ?? ""} onChange={(e) => update(idx, "suffix", e.target.value)} />
            <input className="input-field !py-2 text-xs sm:col-span-2" placeholder="Label" value={item.label} onChange={(e) => update(idx, "label", e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsCitiesAdmin() {
  const [stats, setStats] = useState(CONTENT_DEFAULTS.stats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getSection("stats");
      setStats(data ?? CONTENT_DEFAULTS.stats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSection("stats", stats);
      await load();
    } catch (err) {
      alert(err.message || "Failed to save stats.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-teal">Stats</h2>
        <button type="button" className="btn-primary !text-xs" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save stats"}
        </button>
      </div>
      <StatListEditor label="Hero bar stats" items={stats.heroStats} onChange={(heroStats) => setStats((s) => ({ ...s, heroStats }))} />
      <StatListEditor label="About page stats" items={stats.siteStats} onChange={(siteStats) => setStats((s) => ({ ...s, siteStats }))} />
    </div>
  );
}
