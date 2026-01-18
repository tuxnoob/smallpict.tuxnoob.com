import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Optional: Add basePath if deploying to a subdirectory (e.g. /repo-name)
  // basePath: "/smallpict-docs", 
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
