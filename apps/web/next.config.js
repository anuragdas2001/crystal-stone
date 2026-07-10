/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "https://crystal-stone-api.vercel.app"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
