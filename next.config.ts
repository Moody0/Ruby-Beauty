import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'md-react-icons'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fatoradrive.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
