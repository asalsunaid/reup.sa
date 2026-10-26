import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 is reserved for product screenshots, where small UI text needs to stay crisp.
    qualities: [75, 90],
    // Product photography is served from the existing reup.sa asset host.
    remotePatterns: [{ protocol: "https", hostname: "reup.sa", pathname: "/images/**" }],
  },
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
