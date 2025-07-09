import nextra from 'nextra';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  serverExternalPackages: ['liquidify'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle React 19 compatibility issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom',
        'react/jsx-runtime': 'commonjs react/jsx-runtime',
        'react/jsx-dev-runtime': 'commonjs react/jsx-dev-runtime',
      });
    }

    // Add fallbacks for React APIs
    config.resolve.fallback = {
      ...config.resolve.fallback,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };

    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default withNextra(nextConfig);
