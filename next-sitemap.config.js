/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://254sextonight.uno',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://254sextonight.uno/server-sitemap.xml',
    ],
  },
};
