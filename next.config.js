const isCloudflarePages = process.env.CF_PAGES === '1';
const basePath = process.env.NODE_ENV === 'production' && !isCloudflarePages
  ? '/ProfolioWSM'
  : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Cloudflare Pages serves from `/`; GitHub project Pages serves from `/ProfolioWSM`.
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
