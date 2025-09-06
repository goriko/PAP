import type { NextConfig } from "next";
import { env } from "@/config/env.server";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: env.REMOTE_PATTERNS.map((p) => new URL(p)),
  },
  async rewrites() {
    return [
      {
        source: "/user/:path*",          // frontend path
        destination: "http://localhost:6969/user/:path*", // Hono backend
      },
    ];
  },
};

export default nextConfig;
