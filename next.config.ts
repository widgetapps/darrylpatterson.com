import type { NextConfig } from "next";
import { redirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // Classic rendering model: every page is prerendered at build and Home
  // revalidates hourly so the hero's season stays right (TECH-5, HERO-7).
  cacheComponents: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old URLs redirect permanently (SITE-6).
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
