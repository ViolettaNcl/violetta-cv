import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is plain HTML/CSS/JS in ./out, so it can be served by
  // any static host (Render Static Site, Vercel, GitHub Pages) without a server.
  output: "export",
  // images in /public/img are pre-compressed WebP, so they are served as-is
  images: { unoptimized: true },
};

export default nextConfig;
