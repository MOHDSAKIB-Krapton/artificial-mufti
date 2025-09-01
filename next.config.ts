import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ["http://192.168.1.50"],
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.discordapp.com"],
  },
};

export default nextConfig;
