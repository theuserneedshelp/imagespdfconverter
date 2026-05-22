import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** pdf-lib runs only on the client; no special webpack config required. */
  reactStrictMode: true,
};

export default nextConfig;
