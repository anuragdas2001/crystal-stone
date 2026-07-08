/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
