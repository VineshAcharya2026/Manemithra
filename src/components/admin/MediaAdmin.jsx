import { useEffect, useState } from "react";
import { listMedia, createMedia, updateMedia, deleteMedia } from "../../lib/mediaService";
import ImageUploader from "./ImageUploader";

const emptyForm = {
  type: "press",
  title: "",
  subtitle: "",
  link: "",
  order: 0,
  published: true,
  imageUrl: "",
};

export default function MediaAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const docs = await listMedia({ admin: true });
      setItems(docs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview("");
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setForm({
      type: m.type || "press",
      title: m.title || "",
      subtitle: m.subtitle || "",
      link: m.link || "",
      order: m.order ?? 0,
      published: m.published !== false,
      imageUrl: m.imageUrl || "",
    });
    setPreview(m.imageUrl || "");
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateMedia(editingId, form, imageFile);
      } else {
        await createMedia(form, imageFile);
      }
      resetForm();
      await load();
    } catch (err) {
      alert(err.message || "Failed to save media.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (m) => {
    if (!confirm(`Delete "${m.title}"?`)) return;
    await deleteMedia(m.id, m.imageUrl);
    await load();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-light bg-white p-6 shadow-card-sm">
        <h2 className="mb-4 font-serif text-xl font-bold text-teal">
          {editingId ? "Edit media" : "Add media"}
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Type</label>
            <select
              className="input-field"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              <option value="press">Press / As featured in</option>
              <option value="gallery">Gallery</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Title *</label>
            <input
              className="input-field"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Subtitle</label>
            <input
              className="input-field"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Link URL</label>
            <input
              className="input-field"
              value={form.link}
              onChange={(e) => set("link", e.target.value)}
              placeholder="https://"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Sort order</label>
            <input
              type="number"
              className="input-field"
              value={form.order}
              onChange={(e) => set("order", e.target.value)}
            />
          </div>
          <ImageUploader
            label="Logo / image (optional for press text-only)"
            previewUrl={preview}
            onFileSelect={(file) => {
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }}
            onClear={() => {
              setImageFile(null);
              setPreview("");
              set("imageUrl", "");
            }}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            <span className="text-sm text-body">Published</span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="mb-4 font-serif text-xl font-bold text-teal">All media ({items.length})</h2>
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((m) => (
              <li
                key={m.id}
                className="flex gap-3 rounded-xl border border-gray-light bg-white p-3 shadow-card-sm"
              >
                {m.imageUrl ? (
                  <img src={m.imageUrl} alt="" className="h-12 w-12 object-contain" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-surface text-xs text-muted">
                    {m.type}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-teal">{m.title}</p>
                  <p className="text-xs text-muted capitalize">
                    {m.type}
                    {!m.published && " · Draft"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    className="text-xs text-gold"
                    onClick={() => startEdit(m)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-xs text-error-text"
                    onClick={() => handleDelete(m)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
