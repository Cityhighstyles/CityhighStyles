import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig: any = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cityhighstyles.github.io",
        pathname: "/public/**",
      },
    ],
  },
  turbopack: {},
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
