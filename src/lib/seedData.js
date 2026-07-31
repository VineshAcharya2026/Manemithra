import { doc, getDoc } from "firebase/firestore";
import { PROJECT_ITEMS } from "./constants";
import { CONTENT_DEFAULTS, CONTENT_SECTION_IDS } from "./contentDefaults";
import { db } from "./firebase";
import { listProjects, createProject } from "./projectsService";
import { listMedia, createMedia } from "./mediaService";
import { updateSection } from "./contentService";

const PRESS_TITLES = [
  "Your Story",
  "The Better India",
  "Deccan Herald",
  "Times of India",
  "Hindustan Metro",
  "Realty NXT",
];

/** Import constants into Firestore when collections/docs are empty (admin only). */
export async function seedDefaults() {
  let contentAdded = 0;
  let projectsAdded = 0;
  let mediaAdded = 0;

  for (const sectionId of CONTENT_SECTION_IDS) {
    const snap = await getDoc(doc(db, "siteContent", sectionId));
    if (!snap.exists()) {
      await updateSection(sectionId, CONTENT_DEFAULTS[sectionId]);
      contentAdded++;
    }
  }

  const existingProjects = await listProjects({ admin: true });
  if (existingProjects.length === 0) {
    for (let i = 0; i < PROJECT_ITEMS.length; i++) {
      const p = PROJECT_ITEMS[i];
      await createProject(
        {
          loc: p.loc,
          area: p.area || "",
          floors: p.floors,
          price: p.price || "",
          client: p.client || "",
          city: p.city || "",
          bg: p.bg,
          imageUrl: p.image || "",
          images: p.images || [],
          order: i,
          published: true,
        },
        null
      );
      projectsAdded++;
    }
  }

  const existingMedia = await listMedia({ admin: true, type: "press" });
  if (existingMedia.length === 0) {
    for (let i = 0; i < PRESS_TITLES.length; i++) {
      await createMedia(
        {
          type: "press",
          title: PRESS_TITLES[i],
          subtitle: "",
          link: "",
          order: i,
          published: true,
          imageUrl: "",
        },
        null
      );
      mediaAdded++;
    }
  }

  return { content: contentAdded, projects: projectsAdded, media: mediaAdded };
}
