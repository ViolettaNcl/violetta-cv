import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://violetta-cv.vercel.app/", lastModified: new Date("2026-11-10"), changeFrequency: "monthly", priority: 1 }];
}
