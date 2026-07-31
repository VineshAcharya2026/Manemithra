import { useEffect, useState } from "react";
import { getSection, updateSection, uploadSiteImage } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";
import ImageUploader from "./ImageUploader";

const emptyPartner = { name: "", imageUrl: "" };

export default function PartnersAdmin() {
  const [header, setHeader] = useState(CONTENT_DEFAULTS.partners.header);
  const [items, setItems] = useState(CONTENT_DEFAULTS.partners.items);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(emptyPartner);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getSection("partners");
      setHeader(data?.header ?? CONTENT_DEFAULTS.partners.header);
      setItems(data?.items ?? CONTENT_DEFAULTS.partners.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setEditIdx(-1);
    setForm(emptyPartner);
    setLogoFile(null);
    setLogoPreview("");
  };

  const startEdit = (idx) => {
    const item = items[idx];
    setEditIdx(idx);
    setForm({ name: item.name || "", imageUrl: item.imageUrl || "" });
    setLogoFile(null);
    setLogoPreview(item.imageUrl || "");
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setForm(emptyPartner);
    setLogoFile(null);
    setLogoPreview("");
  };

  const saveItem = async () => {
    if (!form.name.trim()) {
      alert("Partner name is required.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      let imageUrl = form.imageUrl || "";
      if (logoFile) {
        const slug = form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
        imageUrl = await uploadSiteImage(
          `siteContent/partners/${slug}-${Date.now()}`,
          logoFile
        );
      }

      const nextItem = { name: form.name.trim(), imageUrl };
      const list = [...items];
      if (editIdx === -1) list.push(nextItem);
      else list[editIdx] = nextItem;

      await updateSection("partners", { header, items: list });
      setItems(list);
      cancelEdit();
      setMessage("Partner saved.");
    } catch (err) {
      setMessage(err.message || "Failed to save partner.");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (idx) => {
    if (!confirm(`Delete "${items[idx].name}"?`)) return;
    const list = items.filter((_, i) => i !== idx);
    setSaving(true);
    try {
      await updateSection("partners", { header, items: list });
      setItems(list);
      if (editIdx === idx) cancelEdit();
      setMessage("Partner deleted.");
    } catch (err) {
      setMessage(err.message || "Failed to delete.");
    } finally {
      setSaving(false);
    }
  };

  const moveItem = async (idx, dir) => {
    const next = idx + dir;
    if (next < 0 || next >= items.length) return;
    const list = [...items];
    [list[idx], list[next]] = [list[next], list[idx]];
    setItems(list);
    await updateSection("partners", { header, items: list });
  };

  const saveHeader = async () => {
    setSaving(true);
    try {
      await updateSection("partners", { header, items });
      setMessage("Heading saved.");
    } catch (err) {
      setMessage(err.message || "Failed to save heading.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-bold text-teal">Material Partners</h2>
        <button type="button" className="btn-secondary !text-xs" onClick={startAdd}>
          + Add partner
        </button>
      </div>

      {message && (
        <p className="rounded-lg bg-surface px-3 py-2 text-sm text-teal">{message}</p>
      )}

      <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
        <label className="mb-1 block text-xs font-semibold text-teal">Section heading</label>
        <div className="flex flex-wrap gap-2">
          <input
            className="input-field max-w-md flex-1"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
          <button type="button" className="btn-primary !text-xs" onClick={saveHeader} disabled={saving}>
            Save heading
          </button>
        </div>
      </div>

      {editIdx !== null && (
        <div className="rounded-xl border border-gold/40 bg-white p-4 shadow-card-sm">
          <h3 className="mb-3 text-sm font-semibold text-teal">
            {editIdx === -1 ? "Add partner" : "Edit partner"}
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-teal">Name *</label>
              <input
                className="input-field"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <ImageUploader
              label="Partner logo"
              previewUrl={logoPreview}
              onFileSelect={(file) => {
                setLogoFile(file);
                setLogoPreview(URL.createObjectURL(file));
              }}
              onClear={() => {
                setLogoFile(null);
                setLogoPreview("");
                setForm((f) => ({ ...f, imageUrl: "" }));
              }}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn-primary !text-xs" onClick={saveItem} disabled={saving}>
              {saving ? "Saving…" : "Save partner"}
            </button>
            <button type="button" className="btn-secondary !text-xs" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="flex items-center gap-3 rounded-lg border border-gray-light bg-white p-3 shadow-card-sm"
          >
            {item.imageUrl ? (
              <img src={item.imageUrl} alt="" className="h-12 w-16 object-contain" />
            ) : (
              <div className="flex h-12 w-16 items-center justify-center rounded bg-surface text-[10px] text-muted">
                No logo
              </div>
            )}
            <p className="min-w-0 flex-1 font-semibold text-teal">{item.name}</p>
            <div className="flex shrink-0 flex-col gap-1">
              <button type="button" className="text-xs text-gold" onClick={() => moveItem(idx, -1)}>
                ↑
              </button>
              <button type="button" className="text-xs text-gold" onClick={() => moveItem(idx, 1)}>
                ↓
              </button>
              <button type="button" className="text-xs text-gold" onClick={() => startEdit(idx)}>
                Edit
              </button>
              <button type="button" className="text-xs text-error-text" onClick={() => deleteItem(idx)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
