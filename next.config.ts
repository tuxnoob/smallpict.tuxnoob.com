import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // Fixes 404s on GitHub Pages by creating folders (intro/index.html)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
