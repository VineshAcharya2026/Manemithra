const MAX_MB = 5;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export default function ImageUploader({
  label,
  previewUrl,
  onFileSelect,
  onClear,
  multiple = false,
}) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const valid = [];
    for (const file of files) {
      if (!ALLOWED.includes(file.type)) {
        alert("Please upload JPEG, PNG, or WebP images only.");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        alert(`Each image must be under ${MAX_MB}MB.`);
        return;
      }
      valid.push(file);
    }

    if (multiple) onFileSelect(valid);
    else onFileSelect(valid[0]);
    e.target.value = "";
  };

  return (
    <div>
      <label className="mb-1 block font-sans text-xs font-semibold text-teal">{label}</label>
      {previewUrl && !multiple && (
        <div className="relative mb-2 inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-24 max-w-full rounded-lg border border-gray-light object-cover"
          />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white"
            >
              ×
            </button>
          )}
        </div>
      )}
      <input
        type="file"
        accept={ALLOWED.join(",")}
        multiple={multiple}
        onChange={handleChange}
        className="block w-full text-xs text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-teal file:px-3 file:py-2 file:text-white"
      />
    </div>
  );
}
