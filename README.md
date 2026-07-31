# Manemithra

Turnkey home construction marketing site — React, Vite, and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Design system:** Black, Gold (`#FCA311`), White, Navy (`#14213D`) — see `src/theme/colors.ts`
- Responsive layout with mobile navigation
- Scroll-reveal sections, animated modal & FAQ accordion

## Theme

Centralized tokens live in:

- `src/theme/colors.ts` — color constants
- `src/theme/theme.ts` — buttons, forms, tables, badges, layout
- `src/index.css` — CSS variables + Tailwind `@theme` mapping
- `tailwind.config.js` — extended palette for tooling

## Project structure

```
src/
  App.jsx              # Page composition
  components/          # UI sections
  hooks/               # Scroll reveal, body scroll lock
  lib/constants.js     # Content data
```

The legacy single-file prototype is kept as `manemithra.jsx` for reference.

## Admin dashboard (full site CMS)

Manage **all site content** — brand copy, services, packages, testimonials, FAQ, stats, CTAs, logos, projects, and press media — at **`/admin`**.

Auth uses **Firebase Email/Password** (JWT-based ID tokens). Only **one admin account** is supported: create a single user and matching `admins/{uid}` doc.

### One-time Firebase setup

1. In [Firebase Console](https://console.firebase.google.com/) for project `manemithra-15284`:
   - Enable **Authentication** → Email/Password
   - Create **Firestore** database (production mode)
   - Enable **Storage** (click Get Started)
2. Create **one** admin user under Authentication → Users.
3. In Firestore, add document **`admins/{that-user-uid}`** with any field (e.g. `{ "role": "admin" }`).
4. Deploy rules and site:

```bash
npm run deploy
```

### Using the admin

1. Open `/admin` and sign in with your admin account.
2. Click **Import sample data** to seed all sections from built-in defaults (skips docs that already exist).
3. Use dashboard tabs to edit:
   - **Brand** — tagline, promise, values, logo uploads
   - **Services, Packages, Testimonials, FAQ, How It Works** — list editors
   - **Why & Trust, Stats, Cities, About & Green** — section content
   - **Partners** — partner names + logo image uploads
   - **CTAs & Settings** — business/contact CTAs, WhatsApp number, social links
   - **Projects** — add / edit / delete homes, cover + gallery uploads, publish toggle
   - **Media** — press strip logos/titles
4. Click **View site** to preview changes on the live frontend.

If Storage was never enabled, open Firebase Console → Storage → Get Started, then re-run `npm run deploy`. Until then use `npm run deploy:nos` for hosting + Firestore only.

Content is stored in Firestore `siteContent/*` and Firebase Storage. The public site loads from Firestore and falls back to `src/lib/constants.js` when a section is empty or offline.
