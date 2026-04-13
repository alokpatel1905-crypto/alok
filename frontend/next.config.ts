import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {

    return [
      {
        source: "/auth",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
