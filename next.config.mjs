/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp/**',
        port: '**',
        pathname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
