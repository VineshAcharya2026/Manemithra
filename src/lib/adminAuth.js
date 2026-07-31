import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/** User is admin only if admins/{uid} document exists in Firestore. */
export async function isUserAdmin(user) {
  if (!user) return false;

  try {
    const snap = await getDoc(doc(db, "admins", user.uid));
    return snap.exists();
  } catch {
    return false;
  }
}
