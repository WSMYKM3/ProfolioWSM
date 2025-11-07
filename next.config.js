/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/ProfolioWSM', // Required for GitHub Pages when repo name is not username.github.io
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

