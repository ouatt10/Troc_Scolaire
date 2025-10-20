# Copilot Instructions for Troc_Scolaire

## Project Overview
- This is a React application bootstrapped with Vite, focused on school-related item exchanges ("Troc Scolaire").
- The codebase is organized by feature: `src/components` for UI, `src/pages` for main views, and `src/data` for local data and store logic.

## Architecture & Data Flow
- Main entry: `src/main.jsx` mounts `App` from `src/App.jsx`.
- Routing is handled in `App.jsx` (no external router detected; navigation may be manual or via state).
- Data is managed locally via files in `src/data/`:
  - `annonces.js` contains the core data model for "annonces" (listings).
  - `store.js` provides state management (likely using React context or hooks).
- UI is split into reusable components (`components/AnnonceEditor.jsx`) and page-level containers (`pages/AdminModeration.jsx`, `pages/UserDashboard.jsx`).

## Developer Workflows
- **Start dev server:** `npm run dev` (uses Vite for HMR)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint, config in `eslint.config.js`)
- No test scripts or test directories detected; testing is not currently integrated.

## Conventions & Patterns
- Use functional React components and hooks (no class components).
- CSS is colocated with components (`App.css`, `index.css`).
- Data and state logic are separated from UI components for clarity and reusability.
- Prefer local state and context over global state libraries.
- No TypeScript; all code is JavaScript (JSX).
- Asset files (SVGs) are stored in `src/assets/` and `public/`.

## Integration Points
- No backend/API integration detected; all data is local.
- External dependencies: React, Vite, ESLint (see `package.json`).
- No authentication, authorization, or external service calls present.

## Examples
- To add a new page, create a file in `src/pages/` and import it in `App.jsx`.
- To add a new data model, extend `src/data/annonces.js` and update `store.js` as needed.
- For new UI elements, add to `src/components/` and import where needed.

## References
- Main files: `src/App.jsx`, `src/main.jsx`, `src/data/annonces.js`, `src/data/store.js`
- For build/lint commands, see `package.json` scripts.
- For ESLint rules, see `eslint.config.js`.

---
If any conventions or workflows are unclear, ask the user for clarification before proceeding with major changes.
