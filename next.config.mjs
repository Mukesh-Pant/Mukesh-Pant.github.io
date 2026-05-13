// next.config.mjs
// next.config.ts is not supported in Next.js 14; using .mjs instead

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default config
