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

const COL = "media";

/** @typedef {'press' | 'gallery'} MediaType */

export async function listMedia({ admin = false, type } = {}) {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (type) items = items.filter((m) => m.type === type);
  if (!admin) items = items.filter((m) => m.published !== false);

  return items;
}

export async function createMedia(data, imageFile) {
  const payload = {
    type: data.type || "press",
    title: data.title.trim(),
    subtitle: data.subtitle?.trim() || "",
    imageUrl: data.imageUrl || "",
    link: data.link?.trim() || "",
    order: Number(data.order) || 0,
    published: data.published !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const refDoc = await addDoc(collection(db, COL), payload);

  if (imageFile) {
    const url = await uploadMediaImage(refDoc.id, imageFile);
    await updateDoc(doc(db, COL, refDoc.id), { imageUrl: url, updatedAt: serverTimestamp() });
    return { id: refDoc.id, ...payload, imageUrl: url };
  }

  return { id: refDoc.id, ...payload };
}

export async function updateMedia(id, data, imageFile) {
  const payload = {
    type: data.type || "press",
    title: data.title.trim(),
    subtitle: data.subtitle?.trim() || "",
    link: data.link?.trim() || "",
    order: Number(data.order) || 0,
    published: data.published !== false,
    updatedAt: serverTimestamp(),
  };

  if (imageFile) {
    payload.imageUrl = await uploadMediaImage(id, imageFile);
  } else if (data.imageUrl !== undefined) {
    payload.imageUrl = data.imageUrl;
  }

  await updateDoc(doc(db, COL, id), payload);
  return { id, ...payload };
}

export async function deleteMedia(id, imageUrl) {
  await deleteDoc(doc(db, COL, id));
  if (imageUrl?.includes("firebasestorage.googleapis.com")) {
    try {
      const path = decodeURIComponent(imageUrl.split("/o/")[1]?.split("?")[0] || "");
      if (path) await deleteObject(ref(storage, path));
    } catch {
      /* ignore */
    }
  }
}

export async function uploadMediaImage(mediaId, file) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `media/${mediaId}/file.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
