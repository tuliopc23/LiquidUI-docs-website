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
  // Disable static generation for SSR issues
  trailingSlash: false,
  generateBuildId: () => 'build-id',
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

  // Skip static generation for pages with liquidify components
  staticPageGenerationTimeout: 30,

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
  // output: 'export', // Temporarily disabled to debug build issues
};

export default withNextra(nextConfig);
