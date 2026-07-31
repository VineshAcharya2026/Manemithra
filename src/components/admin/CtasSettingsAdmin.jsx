import { useEffect, useState } from "react";
import { getSection, updateSection } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";

export default function CtasSettingsAdmin() {
  const [ctas, setCtas] = useState(CONTENT_DEFAULTS.ctas);
  const [settings, setSettings] = useState(CONTENT_DEFAULTS.settings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [c, s] = await Promise.all([getSection("ctas"), getSection("settings")]);
      setCtas(c ?? CONTENT_DEFAULTS.ctas);
      setSettings(s ?? CONTENT_DEFAULTS.settings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setBusiness = (key, value) =>
    setCtas((c) => ({ ...c, business: { ...c.business, [key]: value } }));
  const setContact = (key, value) =>
    setCtas((c) => ({ ...c, contact: { ...c.contact, [key]: value } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([updateSection("ctas", ctas), updateSection("settings", settings)]);
      await load();
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-teal">CTAs & Settings</h2>
        <button type="button" className="btn-primary !text-xs" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
          <h3 className="mb-3 text-sm font-semibold text-teal">Business CTA</h3>
          {["label", "title", "description", "phone"].map((key) => (
            <div key={key} className="mb-3">
              <label className="mb-1 block text-xs font-semibold text-teal capitalize">{key}</label>
              {key === "description" ? (
                <textarea className="input-field min-h-[60px]" value={ctas.business[key] ?? ""} onChange={(e) => setBusiness(key, e.target.value)} />
              ) : (
                <input className="input-field" value={ctas.business[key] ?? ""} onChange={(e) => setBusiness(key, e.target.value)} />
              )}
            </div>
          ))}
          <label className="mb-1 block text-xs font-semibold text-teal">Bullets (one per line)</label>
          <textarea
            className="input-field min-h-[60px]"
            value={(ctas.business.bullets ?? []).join("\n")}
            onChange={(e) =>
              setBusiness(
                "bullets",
                e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        </div>

        <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
          <h3 className="mb-3 text-sm font-semibold text-teal">Contact CTA</h3>
          {["label", "title", "description", "phone"].map((key) => (
            <div key={key} className="mb-3">
              <label className="mb-1 block text-xs font-semibold text-teal capitalize">{key}</label>
              {key === "description" ? (
                <textarea className="input-field min-h-[60px]" value={ctas.contact[key] ?? ""} onChange={(e) => setContact(key, e.target.value)} />
              ) : (
                <input className="input-field" value={ctas.contact[key] ?? ""} onChange={(e) => setContact(key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
        <h3 className="mb-3 text-sm font-semibold text-teal">Site settings</h3>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold text-teal">WhatsApp number (no + or spaces)</label>
          <input className="input-field max-w-xs" value={settings.whatsapp ?? ""} onChange={(e) => setSettings((s) => ({ ...s, whatsapp: e.target.value }))} />
        </div>
        <h4 className="mb-2 text-xs font-semibold text-teal">Social links</h4>
        {(settings.socialLinks ?? []).map((link, idx) => (
          <div key={idx} className="mb-2 grid grid-cols-2 gap-2">
            <input
              className="input-field !py-2 text-xs"
              placeholder="Name"
              value={link.name}
              onChange={(e) => {
                const next = [...settings.socialLinks];
                next[idx] = { ...next[idx], name: e.target.value };
                setSettings((s) => ({ ...s, socialLinks: next }));
              }}
            />
            <input
              className="input-field !py-2 text-xs"
              placeholder="URL"
              value={link.href}
              onChange={(e) => {
                const next = [...settings.socialLinks];
                next[idx] = { ...next[idx], href: e.target.value };
                setSettings((s) => ({ ...s, socialLinks: next }));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
