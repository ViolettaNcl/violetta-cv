import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images in /public/img are pre-compressed WebP, so they are served as-is
  images: { unoptimized: true },
};

export default nextConfig;
