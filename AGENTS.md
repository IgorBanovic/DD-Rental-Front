# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite-based React frontend. Main application code lives in `src/`, with route pages under `src/pages`, shared UI in `src/components`, API helpers in `src/api`, and Zustand state in `src/store`. Static assets that must be served directly belong in `public/`; imported assets belong in `src/assets/`. The `js-for-react/` folder appears to be scratch or learning material and should stay isolated from production code.

## Build, Test, and Development Commands
Install dependencies with `npm install`. Use `npm run dev` to start the local Vite server, `npm run build` to create a production bundle in `dist/`, `npm run preview` to serve the built output locally, and `npm run lint` to run ESLint across the project. Example: `npm run dev`.

## Coding Style & Naming Conventions
Use ES modules and functional React components. Follow the existing naming split: components and pages use PascalCase filenames such as `VehicleCard.jsx` and `VehicleDetails.jsx`; stores and API utilities use camelCase filenames such as `authStore.js` and `authenticatedFetch.js`. Prefer 2-space indentation, single quotes, and avoid semicolons to match most of the current codebase. Keep route-specific UI in `src/pages` and reusable logic in `src/components`, `src/api`, or `src/store`.

## Testing Guidelines
There is no test runner configured yet. Until one is added, treat `npm run lint` and a successful `npm run build` as the minimum verification before opening a PR. When adding tests, place them next to the relevant module as `*.test.jsx` or `*.test.js`, and prefer React-focused component tests plus API/store unit coverage.

## Commit & Pull Request Guidelines
Recent commits are short and informal, for example `Update frontend project`, `izmjene`, and `dizajn`. Prefer clearer imperative commit messages going forward, such as `Add protected profile route` or `Refactor vehicle card layout`. PRs should include a brief summary, linked issue if applicable, test/build status, and screenshots for visible UI changes.

## Configuration Notes
Do not commit secrets or backend tokens. Keep environment-specific values in Vite environment files such as `.env.local`, and access them through `import.meta.env`.
