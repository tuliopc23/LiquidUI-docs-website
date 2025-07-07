const { withSentryConfig } = require('@sentry/nextjs');
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  // Enhanced Nextra 4.3-style features
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
  readingTime: true,
  // Enhanced search functionality (FlexSearch equivalent)
  flexsearch: {
    codeblocks: false
  },
  // MDX options for remark-emoji and enhanced functionality
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  // Moved from experimental as per Next.js 15 requirements
  serverExternalPackages: ['@sentry/profiling-node'],
  transpilePackages: ["liquidify"],
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enhanced security headers (Nextra 4.3 equivalent)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  // Enhanced performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
    styledComponents: true,
  },
  
  // SEO and caching optimizations
  generateEtags: true,
  poweredByHeader: false,
  compress: true,
  
  // Static optimization
  trailingSlash: false,
  
  
  // Webpack configuration (used when Turbopack is not active)
  webpack: (config, { dev, isServer }) => {
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Production optimizations for webpack builds
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.moduleIds = 'deterministic';
    }
    
    return config;
  },
};

// Apply configurations in order: Nextra -> Bundle Analyzer -> Sentry
module.exports = withSentryConfig(
  withBundleAnalyzer(withNextra(nextConfig)),
  {
    // Sentry webpack plugin options
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    
    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,
    
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
    
    // Source maps configuration
    sourcemaps: {
      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,
      // Delete source maps after upload to reduce deployment size
      deleteSourcemapsAfterUpload: true,
    },
    
    // Exclude server routes from instrumentation if needed
    excludeServerRoutes: [
      '/health',
      '/api/health',
    ],
    
    // Advanced webpack plugin options (unstable)
    unstable_sentryWebpackPluginOptions: {
      applicationKey: "liquidify-docs",
    },
  }
);
