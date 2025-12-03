import type { NextConfig } from "next";

// read optional env vars for GitHub Pages deploy
const GH_PAGES_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const GH_PAGES_ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // NOTE: Turbopack in recent Next.js versions can be experimental and may cause
  // runtime issues in some local environments (wasm binding errors or invalid
  // source maps). To make the dev server stable across environments, explicitly
  // disable Turbopack and fall back to Webpack during development.
  // No experimental Turbopack properties here. Turbopack is handled by the
  // runtime/Next CLI. Avoid adding unknown/experimental keys to reduce
  // warnings during startup.

  // Keep the default behavior for source maps; sometimes invalid source maps
  // appear (especially for compiled node_modules). If you want to inspect
  // production bundles, set this to true.
  productionBrowserSourceMaps: false,

  // Add an empty turbopack config to quiet the 'webpack vs turbopack' message
  // if someone tries to run Turbopack while we have a custom webpack rule.
  // Keeping this empty avoids noisy errors while still allowing both runtimes.
  turbopack: {},

  // Build static HTML for `next export` compatible with GitHub Pages
  // Make images `unoptimized` so the Next image optimizer doesn't require a server.
  // Use environment-provided basePath / assetPrefix so we don't force a basePath
  // during local development; set these in the GH Actions workflow when deploying.
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: GH_PAGES_BASE || undefined,
  assetPrefix: GH_PAGES_ASSET_PREFIX || undefined,
  trailingSlash: true,

  // Add a Webpack rule to support SVGs as components via SVGR. This replaces
  // the previous Turbopack loader configuration so the project continues to
  // handle SVG imports consistently after disabling Turbopack.
  webpack: (config) => {
    const svgRule = {
      test: /\.svg$/i,
      issuer: /\.(js|ts|jsx|tsx)$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: { svgo: true },
        },
      ],
    };

    // Remove file-loader for svg if present (avoid duplicate loader errors)
    if (Array.isArray(config.module?.rules)) {
      config.module.rules = config.module.rules.map((rule: unknown) => {
        const r = rule as { test?: RegExp } | undefined;
        if (r?.test instanceof RegExp && r.test.test(".svg")) {
          // Skip adding the existing svg rule so we can add our own
          // Preserve the rest of the rule but exclude .svg files from it.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return { ...(r as any), exclude: [/\.svg$/i] };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return r as any;
      });
    }

    config.module!.rules!.push(svgRule);

    // Avoid enabling WebAssembly experiments here. Enabling asyncWebAssembly
    // caused wasm runtime handling that triggers errors like the one shown in
    // your console. Let Next.js / Webpack decide runtime wasm needs if required.
    //
    // If you need wasm specifically, re-enable it later with caution.
    return config;
  },
};

export default nextConfig;
