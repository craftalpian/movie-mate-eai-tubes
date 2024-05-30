/** @type {import('next').NextConfig} */
const backendUrl = "http://localhost:1000/api";
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
