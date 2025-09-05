import type { NextConfig } from "next";
import { env } from "@/config/env.server";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: env.REMOTE_PATTERNS.map((p) => new URL(p)),
  },
};

export default nextConfig;
