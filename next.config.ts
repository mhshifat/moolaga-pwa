// @ts-check
import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  register: true,
  workboxOptions: {
    disableDevLogs: true
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
