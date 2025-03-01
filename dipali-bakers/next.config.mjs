// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
