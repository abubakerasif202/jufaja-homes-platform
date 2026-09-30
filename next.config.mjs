/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'casaview.com.au' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.productreview.com.au' },
    ],
  },
};

export default nextConfig;
