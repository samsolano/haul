import type { NextConfig } from "next";
import path from "path";
const projectRoot = path.resolve(__dirname, "../");

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@frontend": path.resolve(__dirname, "src"),  
      "@common": path.resolve(projectRoot, "packages/common"),  
    };

    return config;
  },

  experimental: {
    externalDir: true,  // For supporting external directories in the monorepo (e.g., shared modules)
  },

  reactStrictMode: true,  // Enable React Strict Mode for better debugging
};

export default nextConfig;
