import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Canonical URLs are published with a trailing slash (e.g. `/en/services/`).
   * This keeps the address bar consistent and matches the sitemap.
   */
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
