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
      {
        protocol: 'https',
        hostname: 'otodqkylgicywiffimhd.supabase.co',
      },
    ],
  },
};

export default nextConfig;
