/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ['@next-auth/firebase-adapter'],
  },
  images: {
    domains: [
      'cdn.sanity.io',
      'source.unsplash.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
