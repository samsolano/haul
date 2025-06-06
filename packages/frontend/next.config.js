import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../");

const nextConfig = {
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

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow data URLs for uploaded images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
