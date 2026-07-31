import { useEffect, useState } from "react";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../lib/projectsService";
import ImageUploader from "./ImageUploader";

const emptyForm = {
  loc: "",
  area: "",
  floors: "",
  price: "",
  client: "",
  city: "Bengaluru",
  bg: "from-[#D4C5B5] to-[#8B7355]",
  order: 0,
  published: true,
  imageUrl: "",
  images: [],
};

export default function ProjectAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previousCoverUrl, setPreviousCoverUrl] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const docs = await listProjects({ admin: true });
      setItems(docs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const clearGalleryPreviews = () => {
    galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    setGalleryPreviews([]);
    setGalleryFiles([]);
  };

  const resetForm = () => {
    setEditingId(null);
    setPreviousCoverUrl("");
    setForm(emptyForm);
    setImageFile(null);
    clearGalleryPreviews();
    setPreview("");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setPreviousCoverUrl(p.imageUrl || "");
    setForm({
      loc: p.loc || "",
      area: p.area || "",
      floors: p.floors || "",
      price: p.price || "",
      client: p.client || "",
      city: p.city || "",
      bg: p.bg || emptyForm.bg,
      order: p.order ?? 0,
      published: p.published !== false,
      imageUrl: p.imageUrl || "",
      images: p.images || [],
    });
    setPreview(p.imageUrl || p.images?.[0] || "");
    setImageFile(null);
    clearGalleryPreviews();
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (editingId) {
        await updateProject(editingId, form, imageFile, galleryFiles, previousCoverUrl);
        setMessage("Project updated.");
      } else {
        await createProject(form, imageFile, galleryFiles);
        setMessage("Project created.");
      }
      resetForm();
      await load();
    } catch (err) {
      setMessage(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!confirm(`Delete project "${p.loc}"?`)) return;
    setMessage("");
    try {
      await deleteProject(p.id, p.imageUrl, p.images);
      if (editingId === p.id) resetForm();
      setMessage("Project deleted.");
      await load();
    } catch (err) {
      setMessage(err.message || "Failed to delete project.");
    }
  };

  const removeGalleryUrl = (url) => {
    set("images", (form.images || []).filter((u) => u !== url));
  };

  const onGallerySelect = (files) => {
    const list = Array.isArray(files) ? files : [files];
    setGalleryFiles((prev) => [...prev, ...list]);
    setGalleryPreviews((prev) => [...prev, ...list.map((f) => URL.createObjectURL(f))]);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-light bg-white p-6 shadow-card-sm">
        <h2 className="mb-4 font-serif text-xl font-bold text-teal">
          {editingId ? "Edit project" : "Add project"}
        </h2>

        {message && (
          <p className="mb-3 rounded-lg bg-surface px-3 py-2 text-sm text-teal">{message}</p>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-teal">Location *</label>
            <input
              className="input-field"
              value={form.loc}
              onChange={(e) => set("loc", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Client</label>
            <input
              className="input-field"
              value={form.client}
              onChange={(e) => set("client", e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">City</label>
            <input
              className="input-field"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Bengaluru"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Area / plot</label>
            <input
              className="input-field"
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
              placeholder="30×40 plot"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Floors *</label>
            <input
              className="input-field"
              value={form.floors}
              onChange={(e) => set("floors", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Price</label>
            <input
              className="input-field"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="Optional"
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
          <div className="sm:col-span-2">
            <ImageUploader
              label="Cover image"
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
          </div>
          <div className="sm:col-span-2">
            <ImageUploader
              label="Gallery images (multiple)"
              multiple
              onFileSelect={onGallerySelect}
            />
            {galleryPreviews.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-xs text-muted">
                  {galleryPreviews.length} new photo(s) ready to upload
                </p>
                <div className="flex flex-wrap gap-2">
                  {galleryPreviews.map((url) => (
                    <img key={url} src={url} alt="" className="h-16 w-16 rounded object-cover" />
                  ))}
                </div>
              </div>
            )}
            {(form.images || []).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.images.map((url) => (
                  <div key={url} className="relative">
                    <img src={url} alt="" className="h-16 w-16 rounded object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryUrl(url)}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-[10px] text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            <span className="text-sm text-body">Published on website</span>
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
        <h2 className="mb-4 font-serif text-xl font-bold text-teal">All projects ({items.length})</h2>
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted">No projects yet. Add one or run Import sample data.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((p) => (
              <li
                key={p.id}
                className="flex gap-3 rounded-xl border border-gray-light bg-white p-3 shadow-card-sm"
              >
                {(p.imageUrl || p.images?.[0]) && (
                  <img
                    src={p.imageUrl || p.images[0]}
                    alt=""
                    className="h-16 w-20 shrink-0 rounded-lg object-cover object-[center_30%]"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-teal">{p.loc}</p>
                  <p className="text-xs text-muted">
                    {[p.client, p.area, p.floors, p.price].filter(Boolean).join(" · ")}
                    {p.images?.length ? ` · ${p.images.length} photos` : ""}
                    {!p.published && " · Draft"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    className="text-xs text-gold hover:underline"
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-xs text-error-text hover:underline"
                    onClick={() => handleDelete(p)}
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
