import nextra from 'nextra';

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
    reactCompiler: false,
  },
  // Turbopack configuration (now stable)
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
  },
  serverExternalPackages: ['liquidify'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only externalize liquidify on server to avoid React hook issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('liquidify');
    }

    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default withNextra(nextConfig);
