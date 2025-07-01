import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.gifer.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
