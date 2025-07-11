/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://liquidify-docs.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/404',
    '/500',
    '/server-sitemap-index.xml',
  ],
  additionalPaths: async (config) => [
    // Add dynamic routes
    {
      loc: '/components',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/getting-started',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/playground',
      changefreq: 'weekly',
      priority: 0.7,
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
        disallow: ['/api/', '/404', '/500'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://liquidify-docs.vercel.app'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform for better SEO
    const priority = getPriorityForPath(path);
    const changefreq = getChangefreqForPath(path);

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

function getPriorityForPath(path) {
  if (path === '/') return 1.0;
  if (path.startsWith('/getting-started')) return 0.9;
  if (path.startsWith('/components')) return 0.8;
  if (path.startsWith('/playground')) return 0.7;
  if (path.startsWith('/examples')) return 0.6;
  return 0.5;
}

function getChangefreqForPath(path) {
  if (path === '/') return 'daily';
  if (path.startsWith('/getting-started')) return 'monthly';
  if (path.startsWith('/components')) return 'weekly';
  if (path.startsWith('/playground')) return 'weekly';
  return 'monthly';
}
