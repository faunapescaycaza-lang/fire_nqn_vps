import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Aumentado a 100MB para permitir muchas fotos/videos
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firenqn.duckdns.org',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;