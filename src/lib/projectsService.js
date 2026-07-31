import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

const COL = "projects";

export async function listProjects({ admin = false } = {}) {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (!admin) {
    items = items.filter((p) => p.published !== false);
  }
  return items;
}

function buildPayload(data) {
  return {
    loc: (data.loc || "").trim(),
    area: (data.area || "").trim(),
    floors: (data.floors || "").trim(),
    price: (data.price || "").trim(),
    client: (data.client || "").trim(),
    city: data.city?.trim() || "",
    bg: data.bg || "from-[#D4C5B5] to-[#8B7355]",
    imageUrl: data.imageUrl || "",
    images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
    order: Number(data.order) || 0,
    published: data.published !== false,
  };
}

async function deleteStorageUrl(imageUrl) {
  if (!imageUrl?.includes("firebasestorage.googleapis.com")) return;
  try {
    const path = decodeURIComponent(imageUrl.split("/o/")[1]?.split("?")[0] || "");
    if (path) await deleteObject(ref(storage, path));
  } catch {
    /* ignore missing files */
  }
}

export async function createProject(data, imageFile, galleryFiles = []) {
  const payload = {
    ...buildPayload(data),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const refDoc = await addDoc(collection(db, COL), payload);
  const updates = {};

  if (imageFile) {
    updates.imageUrl = await uploadProjectImage(refDoc.id, imageFile);
  }

  if (galleryFiles.length > 0) {
    const urls = await uploadGalleryImages(refDoc.id, galleryFiles);
    updates.images = [...(payload.images || []), ...urls];
  }

  if (Object.keys(updates).length) {
    updates.updatedAt = serverTimestamp();
    await updateDoc(doc(db, COL, refDoc.id), updates);
    return { id: refDoc.id, ...payload, ...updates };
  }

  return { id: refDoc.id, ...payload };
}

export async function updateProject(id, data, imageFile, galleryFiles = [], previousImageUrl = "") {
  const payload = {
    ...buildPayload(data),
    updatedAt: serverTimestamp(),
  };

  if (imageFile) {
    payload.imageUrl = await uploadProjectImage(id, imageFile);
    if (previousImageUrl && previousImageUrl !== payload.imageUrl) {
      await deleteStorageUrl(previousImageUrl);
    }
  } else if (data.imageUrl !== undefined) {
    payload.imageUrl = data.imageUrl;
  }

  if (galleryFiles.length > 0) {
    const urls = await uploadGalleryImages(id, galleryFiles, payload.images?.length || 0);
    payload.images = [...(payload.images || []), ...urls];
  }

  await updateDoc(doc(db, COL, id), payload);
  return { id, ...payload };
}

export async function deleteProject(id, imageUrl, images = []) {
  await deleteDoc(doc(db, COL, id));
  const urls = [imageUrl, ...(images || [])];
  for (const url of urls) {
    await deleteStorageUrl(url);
  }
}

export async function uploadProjectImage(projectId, file) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `projects/${projectId}/cover.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

export async function uploadGalleryImages(projectId, files, startIndex = 0) {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop() || "jpg";
    const path = `projects/${projectId}/gallery/${startIndex + i}.${ext}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });
    urls.push(await getDownloadURL(storageRef));
  }
  return urls;
}

/** Map Firestore doc to shape used by UI (matches constants PROJECT_ITEMS). */
export function toProjectItem(p) {
  const cover = p.imageUrl || p.image || "";
  const images = Array.isArray(p.images) && p.images.length
    ? p.images
    : cover
      ? [cover]
      : [];
  return {
    id: p.id,
    loc: p.loc,
    area: p.area,
    floors: p.floors,
    price: p.price || "",
    client: p.client || "",
    bg: p.bg || "from-[#D4C5B5] to-[#8B7355]",
    image: cover || images[0] || "",
    images,
    city: p.city,
  };
}
