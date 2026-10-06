/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Dynamic routes (/contact) otherwise stream <title>/<meta> after the shell; block on metadata for every client so it is in the first HTML.
  htmlLimitedBots: /.*/,
  outputFileTracingRoot: process.cwd(),
  images: {
    qualities: [75, 80, 85, 88, 90],
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
};

export default nextConfig;
