import { useEffect, useState } from "react";
import { getSection, updateSection } from "../../lib/contentService";
import { CONTENT_DEFAULTS } from "../../lib/contentDefaults";
import { SECTION_CONFIGS, getNested, setNested } from "../../lib/sectionConfigs";

function emptyItem(fields) {
  const item = {};
  fields.forEach((f) => {
    if (f.type === "lines") item[f.key] = [];
    else if (f.type === "checkbox") item[f.key] = false;
    else if (f.type === "number") item[f.key] = 5;
    else item[f.key] = "";
  });
  return item;
}

function itemToForm(item, fields) {
  const form = { ...item };
  fields.forEach((f) => {
    if (f.type === "lines" && Array.isArray(form[f.key])) {
      form[f.key] = form[f.key].join("\n");
    }
  });
  return form;
}

function formToItem(form, fields) {
  const item = { ...form };
  fields.forEach((f) => {
    if (f.type === "lines") {
      item[f.key] = String(form[f.key] || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === "number") {
      item[f.key] = Number(form[f.key]) || 0;
    } else if (f.type === "checkbox") {
      item[f.key] = Boolean(form[f.key]);
    }
  });
  return item;
}

export default function SectionFormAdmin({ sectionId }) {
  const config = SECTION_CONFIGS[sectionId];
  const [data, setData] = useState(CONTENT_DEFAULTS[sectionId]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(emptyItem(config.fields));
  const [headerForm, setHeaderForm] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const section = await getSection(sectionId);
      setData(section ?? CONTENT_DEFAULTS[sectionId]);
      if (config.headerFields) {
        const h = {};
        config.headerFields.forEach((f) => {
          h[f.key] = getNested(section, f.key) ?? getNested(CONTENT_DEFAULTS[sectionId], f.key) ?? "";
        });
        setHeaderForm(h);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [sectionId]);

  const items = data?.[config.listKey] ?? [];

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const startAdd = () => {
    setEditIdx(-1);
    setForm(emptyItem(config.fields));
  };

  const startEdit = (idx) => {
    setEditIdx(idx);
    setForm(itemToForm(items[idx], config.fields));
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setForm(emptyItem(config.fields));
  };

  const saveItem = () => {
    const newItem = formToItem(form, config.fields);
    const list = [...items];
    if (editIdx === -1) list.push(newItem);
    else list[editIdx] = newItem;
    setData((d) => ({ ...d, [config.listKey]: list }));
    setEditIdx(null);
    setForm(emptyItem(config.fields));
  };

  const deleteItem = (idx) => {
    if (!confirm("Delete this item?")) return;
    const list = items.filter((_, i) => i !== idx);
    setData((d) => ({ ...d, [config.listKey]: list }));
  };

  const moveItem = (idx, dir) => {
    const list = [...items];
    const next = idx + dir;
    if (next < 0 || next >= list.length) return;
    [list[idx], list[next]] = [list[next], list[idx]];
    setData((d) => ({ ...d, [config.listKey]: list }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      let payload = { ...data };
      if (config.headerFields) {
        config.headerFields.forEach((f) => {
          payload = setNested(payload, f.key, headerForm[f.key]);
        });
      }
      await updateSection(sectionId, payload);
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
        <h2 className="font-serif text-xl font-bold text-teal">{config.label}</h2>
        <button type="button" className="btn-primary !text-xs" onClick={handleSaveAll} disabled={saving}>
          {saving ? "Saving…" : "Save all changes"}
        </button>
      </div>

      {config.headerFields && (
        <div className="rounded-xl border border-gray-light bg-white p-4 shadow-card-sm">
          <h3 className="mb-3 text-sm font-semibold text-teal">Section header</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.headerFields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-xs font-semibold text-teal">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    className="input-field min-h-[80px]"
                    value={headerForm[f.key] ?? ""}
                    onChange={(e) => setHeaderForm((h) => ({ ...h, [f.key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className="input-field"
                    value={headerForm[f.key] ?? ""}
                    onChange={(e) => setHeaderForm((h) => ({ ...h, [f.key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {editIdx !== null && (
        <div className="rounded-xl border border-gold/40 bg-white p-4 shadow-card-sm">
          <h3 className="mb-3 text-sm font-semibold text-teal">
            {editIdx === -1 ? "Add item" : "Edit item"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.fields.map((f) => (
              <div key={f.key} className={f.type === "textarea" || f.type === "lines" ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-xs font-semibold text-teal">{f.label}</label>
                {f.type === "textarea" || f.type === "lines" ? (
                  <textarea
                    className="input-field min-h-[80px]"
                    value={form[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                ) : f.type === "checkbox" ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(form[f.key])}
                      onChange={(e) => setField(f.key, e.target.checked)}
                    />
                    <span className="text-sm">Featured package</span>
                  </label>
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    className="input-field"
                    value={form[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn-primary !text-xs" onClick={saveItem}>
              {editIdx === -1 ? "Add" : "Update item"}
            </button>
            <button type="button" className="btn-secondary !text-xs" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button type="button" className="btn-secondary !text-xs" onClick={startAdd}>
          + Add item
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 rounded-lg border border-gray-light bg-white p-3 shadow-card-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-teal">
                {item.title || item.name || item.q || item.label || `Item ${idx + 1}`}
              </p>
              <p className="truncate text-xs text-muted">
                {item.description || item.desc || item.a || item.highlight || ""}
              </p>
            </div>
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
