import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://almuminah.com";
  const routes = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.8", changefreq: "weekly" },
    { url: "/admissions", priority: "0.9", changefreq: "monthly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
    { url: "/curriculum", priority: "0.8", changefreq: "monthly" },
    { url: "/events", priority: "0.8", changefreq: "weekly" },
    { url: "/gallery", priority: "0.7", changefreq: "weekly" },
    { url: "/management", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.9", changefreq: "daily" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).send(sitemap);
}
