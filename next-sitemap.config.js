// Helper functions for SEO optimization
function getPriorityForPath(path) {
  if (path === '/') return 1.0;
  if (path.startsWith('/components')) return 0.9;
  if (path.startsWith('/design-system')) return 0.8;
  if (path.startsWith('/physics-system')) return 0.8;
  if (path.startsWith('/hooks')) return 0.7;
  if (path.startsWith('/playground')) return 0.7;
  if (path.startsWith('/docs')) return 0.6;
  if (path.startsWith('/examples')) return 0.6;
  if (path.startsWith('/apple-hig')) return 0.7;
  if (path.startsWith('/getting-started')) return 0.8;
  if (path.startsWith('/developers')) return 0.6;
  if (path.startsWith('/accessibility')) return 0.7;
  if (path.startsWith('/design-tokens')) return 0.8;
  if (path.startsWith('/utilities')) return 0.5;
  return 0.5;
}

function getChangefreqForPath(path) {
  if (path === '/') return 'daily';
  if (path.startsWith('/components')) return 'weekly';
  if (path.startsWith('/design-system')) return 'weekly';
  if (path.startsWith('/physics-system')) return 'weekly';
  if (path.startsWith('/hooks')) return 'weekly';
  if (path.startsWith('/playground')) return 'weekly';
  if (path.startsWith('/docs')) return 'monthly';
  if (path.startsWith('/examples')) return 'monthly';
  if (path.startsWith('/apple-hig')) return 'weekly';
  if (path.startsWith('/getting-started')) return 'weekly';
  if (path.startsWith('/developers')) return 'monthly';
  if (path.startsWith('/accessibility')) return 'weekly';
  if (path.startsWith('/design-tokens')) return 'weekly';
  return 'monthly';
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env['NEXT_PUBLIC_APP_URL'] || 'https://liquidify-docs.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  
  // App Router exclusions - exclude Next.js App Router conventions
  exclude: [
    '/api/*',           // API routes
    '/404',             // Error pages
    '/500',             // Error pages
    '/server-sitemap-index.xml',
    '/_next/*',         // Next.js internal files
    '/_error',          // Error page
    '/_document',       // Document page
    '/_app',            // App page
    '/layout',          // Layout files (App Router)
    '/loading',         // Loading UI (App Router)
    '/error',           // Error UI (App Router)
    '/not-found',       // Not found UI (App Router)
    '/global-error',    // Global error UI (App Router)
    '/template',        // Template files (App Router)
    '/route',           // Route handlers (App Router)
    '/page',            // Direct page files (App Router)
    '/default',         // Default files (App Router)
    '/opengraph-image', // OpenGraph image files
    '/twitter-image',   // Twitter image files
    '/icon',            // Icon files
    '/apple-icon',      // Apple icon files
    '/favicon',         // Favicon files
    '/manifest',        // Manifest files
    '/robots',          // Robots.txt files
    '/sitemap',         // Sitemap files
    '/pages/*',
    // Next.js 15 specific exclusions
    '/_app/*',          // App directory internal files
    '/_document/*',     // Document directory internal files
    '/middleware',      // Middleware file
    '/instrumentation', // Instrumentation file
    '/*.config.js',     // Config files
    '/*.config.ts',     // Config files
    '/*.config.mjs',    // Config files
    '/*.config.cjs',    // Config files
  ],
  
  // Additional paths for dynamic routes specific to App Router structure
  additionalPaths: async () => [
    // Home page
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    
    // Main sections
    {
      loc: '/components',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/physics-system',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/hooks',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/playground',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/docs',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    
    // Component categories
    {
      loc: '/components/actions',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/containment',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/data',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/layout',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/presentation',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    
    // Individual components
    {
      loc: '/components/actions/glass-button',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/actions/glass-button-group',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/actions/glass-floating-action',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/actions/glass-icon-button',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/actions/glass-toggle-button',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Input components
    {
      loc: '/components/inputs/glass-checkbox',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-date-picker',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-file-upload',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-input',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-radio',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-search',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-select',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-slider',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-switch',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/inputs/glass-textarea',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Navigation components
    {
      loc: '/components/navigation/glass-breadcrumb',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-dropdown',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-menu',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-mobile-nav',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-navbar',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-sidebar',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/navigation/glass-tabs',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Presentation components
    {
      loc: '/components/presentation/glass-avatar',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/presentation/glass-badge',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/presentation/glass-loading',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/presentation/glass-tooltip',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Containment components
    {
      loc: '/components/containment/glass-card',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/containment/glass-command',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/containment/glass-modal',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/containment/glass-popover',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Data components
    {
      loc: '/components/data/glass-progress',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/data/glass-table',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Layout components
    {
      loc: '/components/layout/glass-responsive-button',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/components/layout/glass-responsive-card',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Design System pages
    {
      loc: '/design-system/colors',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/design-tokens',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/design-tokens/visual-guide',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/glass-effect-system',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/icons',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/liquid-glass',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/spacing',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/design-system/typography',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Physics System pages
    {
      loc: '/physics-system/constants',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/physics-system/core-classes',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/physics-system/demos',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/physics-system/hooks',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/physics-system/utilities',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Hooks pages
    {
      loc: '/hooks/use-content-aware-glass',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/hooks/use-glass-effect-performance',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/hooks/use-liquid-glass',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/hooks/use-performance-monitor',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: [
          '/api/',
          '/404',
          '/500',
          '/_next/',
          '/_error',
          '/_document',
          '/_app',
          '/layout',
          '/loading',
          '/error',
          '/not-found',
          '/global-error',
          '/template',
          '/route',
          '/page',
          '/default',
          '/opengraph-image',
          '/twitter-image',
          '/icon',
          '/apple-icon',
          '/favicon',
          '/manifest',
          '/robots',
          '/sitemap'
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env['NEXT_PUBLIC_APP_URL'] || 'https://liquidify-docs.vercel.app'}/sitemap.xml`,
    ],
  },
  
  // Transform function optimized for App Router paths
  transform: async (config, path) => {
    // Custom transform for better SEO with App Router awareness
    const priority = getPriorityForPath(path);
    const changefreq = getChangefreqForPath(path);

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  
  // Generate files in public directory
  outDir: './public',
  
  // Ensure compatibility with ESM and standalone mode
  trailingSlash: false,
};

export default config;
