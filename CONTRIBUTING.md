# Contributing

Thanks for being interested in contributing to this project! A few quick notes to help you get started locally.

## Start the dev server

- The project has two options for running the development server:
  - `npm run dev:web` — runs the server using Webpack. This is the recommended option when you have custom Webpack loaders or plugins in use.
  - `npm run dev:turbopack` — runs the server using Turbopack (fast, but experimental).

By default, `npm run dev` maps to `dev:web` so devs get a consistent experience out-of-the-box.

## Config safety check

- The repository includes a small helper script `scripts/validate-next-config.js` that checks your `next.config.*` for common, often-unintentional experimental keys such as `experimental.turbo` that can cause startup warnings or conflicts.
- That validator runs automatically as a pre-step to `npm run dev` and will print warnings with practical suggestions. It is non-blocking at the moment — it tells you what to fix but doesn’t stop the server from starting.

If you'd like the validator to be stricter (e.g., fail on warnings), please open a PR and we can discuss elevating that behavior.

## Quick checklist for PRs

- Please run `npm run lint` and `npm run format` before opening a PR.
- Keep commits small and focused. A good PR usually covers one feature or fix.
- Write a short description of the change and the motivation in the PR body.
- If you changed `next.config.*`, explain why and whether you tested both `dev:web` and `dev:turbopack`.

Thanks — we appreciate your help, and we’ll review changes quickly.

## Project improvement priorities (A/B/C/D)

We keep a small to-do list for the project that helps new contributors know what to pick. Here is a plain summary of the four categories in the README: A (do now), B (do soon), C (do when you can), D (nice to have). For each item, if an experienced contributor wants to pick one, please comment on the issue or PR.

If you’re new and want to help quickly, choose one 'A' item from the README and make a small PR — the maintainers will help you get it across the finish line.
