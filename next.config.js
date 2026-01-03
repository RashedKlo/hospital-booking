/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out to allow dynamic routes with API
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  basePath: '/hospital-booking',
  assetPrefix: `/hospital-booking/`,
  images: {
    unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
