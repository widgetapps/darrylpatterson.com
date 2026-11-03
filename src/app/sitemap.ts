import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Generated at build (SITE-9).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return site.nav.map((item, i) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: i === 0 ? 1 : 0.8,
  }));
}
