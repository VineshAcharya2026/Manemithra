import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { CONTENT_DEFAULTS, mergeSection } from "./contentDefaults";

const COL = "siteContent";

export async function getSection(sectionId) {
  const snap = await getDoc(doc(db, COL, sectionId));
  if (!snap.exists()) return CONTENT_DEFAULTS[sectionId] ?? null;
  return mergeSection(sectionId, snap.data());
}

export async function getAllSections() {
  const snap = await getDocs(collection(db, COL));
  const fromFirestore = {};
  snap.docs.forEach((d) => {
    fromFirestore[d.id] = d.data();
  });

  const result = {};
  for (const [id, defaults] of Object.entries(CONTENT_DEFAULTS)) {
    result[id] = mergeSection(id, fromFirestore[id]);
  }
  return result;
}

export async function updateSection(sectionId, data) {
  await setDoc(
    doc(db, COL, sectionId),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
  return mergeSection(sectionId, data);
}

export async function uploadSiteImage(storagePath, file) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = storagePath.includes(".") ? storagePath : `${storagePath}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
