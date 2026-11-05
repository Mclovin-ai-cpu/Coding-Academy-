import type { NextConfig } from "next";

/**
 * Zwei Arten zu bauen:
 * - normal (`npm run build`): für Vercel
 * - GitHub Pages (`npm run build:pages`): fertige Dateien im Ordner `out/`,
 *   erreichbar unter https://mclovin-ai-cpu.github.io/Coding-Academy-/v3/
 */
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/Coding-Academy-/v3" : undefined;

const nextConfig: NextConfig = {
  // Statischer Export unterstützt kein Cache Components / PPR, daher nur für Vercel aktiv
  ...(pages
    ? { output: "export" as const, basePath, trailingSlash: true, images: { unoptimized: true } }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
