import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = {
      ["@solana/web3.js"]: "commonjs @solana/web3.js",
      ["@solana/spl-token"]: "commonjs @solana/spl-token",
    }
    return config
  },
}

export default nextConfig
