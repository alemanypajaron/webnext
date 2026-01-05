import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator ("N" bubble) that can overlap UI in development.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
