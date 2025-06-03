import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@backend": path.resolve(__dirname, "../backend"),
    };

    return config;
  },

  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
