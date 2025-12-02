#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const possibleConfigs = [
  "next.config.js",
  "next.config.cjs",
  "next.config.mjs",
  "next.config.ts",
];

let found = null;

for (const cfg of possibleConfigs) {
  const full = path.join(repoRoot, cfg);
  if (fs.existsSync(full)) {
    found = full;
    break;
  }
}

if (!found) {
  console.log("No Next.js config file detected in project root.");
  process.exit(0);
}

const contents = fs.readFileSync(found, "utf8");

// Look for an "experimental" block referencing the 'turbo' property which
// is known to cause warnings when mixed with a custom webpack config.
const experimentalTurboPattern = /experimental\s*:\s*\{[\s\S]*?turbo\s*:/m;
if (experimentalTurboPattern.test(contents)) {
  console.warn(
    "\nHeads up — I found `experimental.turbo` in " + path.basename(found),
  );
  console.warn(
    "This often causes that noisy 'webpack vs turbopack' warning during startup when you also use a custom `webpack` configuration.",
  );
  console.warn("A couple of simple options:");
  console.warn("  - Remove `experimental.turbo` from the config");
  console.warn(
    "  - Add a `turbopack: {}` config if you want to run on Turbopack",
  );
  console.warn(
    "  - Or run the app with Webpack: `npm run dev:web` — this is the safest choice for now.\n",
  );
  if (process.env.CI) {
    console.error(
      "CI mode: failing the build due to `experimental.turbo` configuration.",
    );
    process.exit(1);
  }
} else {
  // Also detect `experimental` keys that might be non-standard. This is a basic heuristic.
  const experimentalAny = /experimental\s*:\s*\{/m;
  if (experimentalAny.test(contents)) {
    // extract keys inside experimental object
    const match = contents.match(/experimental\s*:\s*\{([\s\S]*?)\}/m);
    if (match && match[1]) {
      const inside = match[1];
      const keys = inside
        .split(",")
        .map((s) => s.trim().split(":")[0].trim())
        .filter(Boolean);
      const allowedHeuristics = ["appDir", "workerThreads", "serverComponents"];
      const suspicious = keys.filter(
        (k) => k && !allowedHeuristics.includes(k) && k !== "",
      );
      if (suspicious.length > 0) {
        console.warn(
          "\nHeads up — I found experimental keys: " + suspicious.join(", "),
        );
        console.warn(
          "Some of them may not be supported or are unusual. If you see startup warnings consider removing them or moving to a proper `turbopack` config.",
        );
        console.warn(
          "If you rely on Webpack features, prefer running `npm run dev:web`.\n",
        );
        if (process.env.CI) {
          console.error(
            "CI mode: failing the build due to suspicious experimental keys.",
          );
          process.exit(1);
        }
      }
    }
  }
}

process.exit(0);
