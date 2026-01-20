import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cityhighstyles.github.io',
        pathname: '/public/**',
      },
    ],
  },
  /* config options here */
  
};

export default nextConfig;
