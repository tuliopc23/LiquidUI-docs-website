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
  // Stable Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
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
    // Keep React properties needed for animations
    reactRemoveProperties: false,
    styledComponents: true,
  },

  // SEO and caching optimizations
  generateEtags: true,
  poweredByHeader: false,
  compress: true,

  // Static optimization
  trailingSlash: false,

  // Simplified webpack configuration for Turbopack compatibility
  
};

module.exports = withBundleAnalyzer(withNextra(nextConfig));
