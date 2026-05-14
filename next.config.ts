import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig: any = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cityhighstyles.github.io",
        pathname: "/public/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
