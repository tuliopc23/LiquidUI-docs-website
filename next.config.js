import nextra from 'nextra';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static generation with optimizations
  trailingSlash: true,
  generateBuildId: () => 'liquidify-docs-static',
  distDir: '.next',

  // Server configuration
  serverExternalPackages: ['liquidify'],

  // Code quality enforcement
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimize static generation
  staticPageGenerationTimeout: 60,

  experimental: {
    scrollRestoration: true,
    reactCompiler: false,
  },

  // Turbopack configuration (stable)
  // turbo: {}, // Disabled until stable

  // Custom webpack configuration
  webpack: (config, { isServer }) => {
    // No special webpack configuration needed
    return config;
  },

  // Development optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  // Compression
  compress: true,
  poweredByHeader: false,

  // Output configuration for static export
  // output: 'export', // Enable once all MDX components use static rendering
};

export default withNextra(nextConfig);
