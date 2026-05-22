import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Three.js needs to be transpiled
  transpilePackages: ["three"],
  // Allow images from the R2 CDN used in OG images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev" },
    ],
  },
};

export default nextConfig;
