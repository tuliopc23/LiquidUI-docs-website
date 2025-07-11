import nextra from 'nextra';

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    scrollRestoration: true,
    reactCompiler: false,
  },

  // Turbopack configuration (stable)
  turbo: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
  },

  // Server configuration
  serverExternalPackages: ['liquidify'],

  // Code quality enforcement
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Custom webpack configuration
  webpack: (config, { isServer }) => {
    // Only externalize liquidify on server to avoid React hook issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('liquidify');
    }
    return config;
  },

  // Development optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Production-ready security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io https://cdn.segment.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://plausible.io https://api.npmjs.org https://registry.npmjs.org",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Static assets caching
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes security
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

  // Environment-specific redirects
  async redirects() {
    return [
      // Redirect old documentation URLs
      {
        source: '/docs/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.liquidify-docs.vercel.app' }],
        destination: 'https://liquidify-docs.vercel.app/:path*',
        permanent: true,
      },
    ];
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

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    generateEtags: false,
    trailingSlash: false,
  }),
};

export default withNextra(nextConfig);
