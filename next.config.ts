import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:locale/convert",
        destination: "/:locale/tool",
        permanent: true,
      },
      {
        source: "/convert",
        destination: "/tool",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
