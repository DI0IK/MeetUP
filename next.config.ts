import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img1.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
