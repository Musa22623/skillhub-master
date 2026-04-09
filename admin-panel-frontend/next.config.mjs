import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactEntry = require.resolve("react");
const reactDomEntry = require.resolve("react-dom");
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  webpack: (config, { dev }) => {
    if (!dev) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        "react$": reactEntry,
        "react-dom$": reactDomEntry,
        "react-dom/client": require.resolve("react-dom/client"),
        "react-dom/server": require.resolve("react-dom/server"),
      };
    }

    return config;
  },
};

export default nextConfig;
