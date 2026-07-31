/** Field schemas for generic SectionFormAdmin */
export const SECTION_CONFIGS = {
  services: {
    label: "Services",
    listKey: "items",
    headerFields: [
      { key: "header.label", label: "Section label", type: "text" },
      { key: "header.title", label: "Section title", type: "text" },
      { key: "header.description", label: "Section description", type: "textarea" },
    ],
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  whyChooseUs: {
    label: "Why Choose Us",
    listKey: "items",
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  commitments: {
    label: "Trust Commitments",
    listKey: "items",
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  cities: {
    label: "Service Cities",
    listKey: "items",
    fields: [
      { key: "name", label: "City name", type: "text" },
      { key: "highlight", label: "Highlight", type: "text" },
      { key: "projects", label: "Projects count", type: "text" },
    ],
  },
  steps: {
    label: "How It Works Steps",
    listKey: "items",
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "points", label: "Bullet points (one per line)", type: "lines" },
    ],
  },
  packages: {
    label: "Packages",
    listKey: "items",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "price", label: "Price", type: "text" },
      { key: "unit", label: "Unit", type: "text" },
      { key: "dot", label: "Dot color class", type: "text" },
      { key: "featured", label: "Featured (most popular)", type: "checkbox" },
      { key: "features", label: "Features (one per line)", type: "lines" },
    ],
  },
  testimonials: {
    label: "Testimonials",
    listKey: "items",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "rating", label: "Rating (1-5)", type: "number" },
    ],
  },
  faqs: {
    label: "FAQ",
    listKey: "items",
    fields: [
      { key: "q", label: "Question", type: "text" },
      { key: "a", label: "Answer", type: "textarea" },
    ],
  },
  aboutFeatures: {
    label: "About Features",
    listKey: "items",
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  greenFeatures: {
    label: "Green Home Features",
    listKey: "items",
    fields: [
      { key: "icon", label: "Icon", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
    ],
  },
  partners: {
    label: "Material Partners",
    listKey: "items",
    headerFields: [{ key: "header", label: "Section heading", type: "text" }],
    fields: [
      { key: "name", label: "Partner name", type: "text" },
      { key: "imageUrl", label: "Logo URL (optional)", type: "text" },
    ],
  },
};

function getNested(obj, path) {
  return path.split(".").reduce((o, k) => o?.[k], obj);
}

function setNested(obj, path, value) {
  const keys = path.split(".");
  const result = { ...obj };
  let cur = result;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = { ...cur[keys[i]] };
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

export { getNested, setNested };
