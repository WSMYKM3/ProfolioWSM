/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Only use basePath in production builds (for GitHub Pages)
  // In development, basePath is empty so routes work at localhost:3000/work
  basePath: process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

