import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    // test purpose
    products30s: {
      stale: 30,
      revalidate: 30,
      expire: 30,
    },
    products5m: {
      stale: 60 * 5,        // serve stale for 5 minutes
      revalidate: 60 * 5,   // regenerate after 5 minutes
      expire: 60 * 60,      // fully expire after 1 hour
    },
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/en',
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
