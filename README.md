# my_app

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`][create-next].

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the
app locally.

You can start editing `app/page.tsx` to change the main page. The site will
auto-update in the browser as you edit.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).
It automatically optimizes and loads the Geist font, which is provided by
Vercel.

## Learn More

To learn more about Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js
  tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js).
Feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform][vercel].

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

## Deploy to GitHub Pages

You can host this project as a static site on GitHub Pages.
We provide a GitHub Actions workflow that builds and publishes the static
`out/` directory for you on pushes to `main`.

Quick steps:

1. If you'd like a repository page (for example
  `USERNAME.github.io/REPO`),
   the GH Actions workflow will auto-set `NEXT_PUBLIC_BASE_PATH` and
  `NEXT_PUBLIC_ASSET_PREFIX` to `/<repo-name>` during build. This keeps assets
  referencing the correct path in exported files.
1. Build locally and preview the exported `out/` folder:

  ```bash
  npm ci
  npm run build:export
  npx serve -s out
  # open localhost:5000
  ```

1. Push to `main`.
  The `Deploy to GitHub Pages` workflow will then build and publish the
  `out/` directory to the `gh-pages` branch.

Note: there are two common ways to host a Next.js static export on GitHub Pages:

- GitHub Pages/private build (recommended): Use the default "Pages" build and
  deployment that GitHub provides (this runs a Pages workflow from `main`).  If
  you prefer this, set Pages to use `main` in the repository Settings -> Pages.

- GitHub Pages branch (peaceiris): Some CI workflows build the static `out/`
  artifacts and push them to a dedicated `gh-pages` branch (the `peaceiris`
  action, as used here). If you use this approach, configure Settings -> Pages
  to publish from the `gh-pages` branch.

Which to pick: If you want the workflow to create and push static artifacts to
`gh-pages` (and the UI to show the published assets there), select the `gh-pages`
branch as the Pages source in Settings; otherwise prefer `main` if you want the
Pages build to run on GitHub's Pages workflow.
Note: GitHub Pages works best for fully static sites.
If you later add server-side features (API routes, server-side rendering, or
middleware), consider using Vercel instead.

## Development (local)

If you're getting started, here's how to run and work with this project in
plain language:

1. Quick setup (one-time on your machine)

```bash
npm ci
```

1. Run the app while you're building features

```bash
npm run dev
# This runs under Webpack by default for stable, reliable debugging and
# plugin support.
```

### Single-command quick start

If you want to set up, validate, test, type-check, and run the app with a
single command (great for new machines), use:

```bash
npm run start:dev
```

This command will:

- run `npm ci` to install dependencies
- run the validator (`npm run validate:config`)
- run TypeScript checks, linting, unit tests, and a production build to catch
  problems early.
- start the local dev server (`npm run dev`) when checks pass

Note: CI and the `start:dev` sequence use `lint:ci` which sets ESLint to fail on
warnings. This means your single-command run will fail if lint **warnings** are
present — this is intentional to keep the repository warnings-free.

To build and start a production server in a single command:

```bash
npm run start:prod
```

If you want to run the same checks locally as CI (install deps, validate
config, typecheck, lint, test, build), use:

```bash
npm run ci
```

1. Want to try Turbopack? Go for it.

```bash
npm run dev:turbopack
# Turbopack is faster, but if you have custom webpack loaders or
# plugins you may see a warning; in that case, run `npm run dev`.
```

1. Keep your code tidy and consistent

```bash
npm run lint      # finds style and lint errors
npm run lint:fix  # auto-fixes some lint problems
npm run format    # formats files (prettier)
```

1. Build for production (what you'll use to deploy)

```bash
npm run build
npm start
```

Small tips:

- If the dev server prints a warning about `turbo` or `experimental` keys,
  run `npm run validate:config` to get a quick suggestion about what to fix.
- The dev scripts will auto-run the config validator. This provides helpful
  warnings before the dev server starts.
  Examples: `npm run dev`, `npm run dev:web`, `npm run dev:turbopack`.
- `npm run dev` is the safe default if you're new to the codebase.
- Use `dev:turbopack` to try Next's Turbopack path later.
- If you ever run into odd errors from `node_modules` or wasm, try deleting
  `node_modules` and re-running `npm ci`.

## Troubleshooting

- If you see a Turbopack vs Webpack warning or `turbo.createProject` errors:
  - run `npm run dev:web` for a stable webpack dev session;
  - or open `next.config.*` and remove `experimental.turbo`.
  - or add an empty `turbopack: {}` block to suppress the warning.

- If something looks wrong with your environment (Node, npm):
  - make sure you are on a modern Node version (we recommend Node 20.9+),
  - delete `node_modules` and run `npm ci` again.

## Keeping packages up to date

To see what needs updating in your local environment, run:

```bash
npm outdated
```

If you want to update everything automatically you can run:

```bash
npm update
```

If you're updating big packages (like Next.js or React), check the release notes
and migration docs before you upgrade.

[vercel]: <https://vercel.com/new>
[create-next]: <https://nextjs.org/docs/app/api-reference/cli/create-next-app>

## Full A/B/C/D list — in very plain language explanations so that every my noob version could understand okdedoki so read the below up and down

21 recommended improvements

Below is a friendly, no-jargon breakdown of the 21 improvements. They are
grouped into four categories: A (do now), B (do soon), C (do when possible),
D (nice to have).

A — Immediate (these will protect the repo and help contributors quickly):

1. Add CI checks — Run linting, type checks, and tests on every PR. This helps
  avoid accidental breakage and keeps the main branch stable.
1. TypeScript checks — Run `tsc --noEmit` in CI to catch typed errors before a
  PR is merged.
1. Husky + lint-staged — Add pre-commit hooks to format and lint changed
  files. This keeps commits consistent and makes reviews easier.
1. Basic tests — Add unit tests and run them in CI to catch regressions early.

B — High priority (makes the project more secure and friendly):

1. Dependabot (or Renovate) — Automatically propose updates for dependencies
  so you don't fall behind on important fixes.
1. Engines (Node/npm versions) — Recommend a Node and npm version so
  everyone's development environment behaves the same.
1. .env.example — Provide a sample environment file so people can set
  environment variables correctly.
1. Stricter TypeScript rules — Turn on stricter TypeScript flags to catch
  subtle bugs.
1. Stronger lint rules — Add or tighten rules so code is more consistent and
  correct.
1. PR and issue templates — Make it easier for people to submit clear PRs and
   bug reports.

C — Medium (good to have but not critical right now):

1. Next.js production settings — Validate or add `images.domains` and other
  production settings to avoid deployment issues.
1. Code scanning (Snyk, CodeQL) — Run automated security scans to spot known
  vulnerabilities.
1. Add a changelog and release policy — Keep track of releases and changes for
  contributors and users.
1. Add a license — Make permissions and reuse rules clear (MIT license is
  included in this repo).
1. Document dev vs CI differences — Clarify what runs locally vs what the CI
  runs.

D — Lower priority (extra nice to have):

1. Performance checks (Lighthouse) — Run a Lighthouse check in CI to keep the
  site fast and accessible.
1. Runtime monitoring (Sentry) — Capture production errors for quicker fixes.
1. Dockerfile — Provide a Docker image to run the project consistently on any
  machine.
1. Turbopack migration plan — If you want Turbopack’s speed, plan the
  migration and avoid mixing Webpack and Turbopack rules.
1. Accessibility checks (axe) — Automatically run a11y checks in tests.
1. Codeowners & conduct — Add a `CODEOWNERS` file for reviewer assignment and
  maintain the `CODE_OF_CONDUCT`.

If you'd like any of these completed for you, tell me which ones (pick a
category or specific numbers). I can start by implementing CI and test
improvements, or by setting up the documentation and templates.
