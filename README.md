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
