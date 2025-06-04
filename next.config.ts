import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(__dirname, "../");

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Resolve custom aliases for frontend and backend
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@frontend": path.resolve(__dirname, "src"),  // Resolve @frontend to frontend/src
      "@backend": path.resolve(projectRoot, "packages/backend/src"),  // Resolve @backend to backend/src
      "@common": path.resolve(projectRoot, "packages/common"),  // Resolve @common to common directory
    };

    return config;
  },

  experimental: {
    externalDir: true,  // Support external directories
  },
  
  reactStrictMode: true,
};

export default nextConfig;