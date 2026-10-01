/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    qualities: [75, 80, 85, 88, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'casaview.com.au' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.productreview.com.au' },
    ],
  },
};

export default nextConfig;
