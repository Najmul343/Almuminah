import type { VercelRequest, VercelResponse } from '@vercel/node';

async function fetchBlogSlugs() {
  const SHEET_ID = '1xGnhNgSHR-JE7uAXM5xvsPX4bYB1uNBXwYBLtVoYgIo';
  const tabName = 'Blogs';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&headers=1`;
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
    if (!match) return [];
    
    const json = JSON.parse(match[1]);
    const table = json.table;
    const cols = table.cols.map((col: any) => (col.label || col.id).toLowerCase().replace(/\s+/g, ''));
    const titleIdx = cols.indexOf('title');
    
    if (titleIdx === -1) return [];

    return table.rows.map((row: any) => {
      const title = row.c[titleIdx]?.v || "Untitled Blog";
      return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    });
  } catch (e) {
    console.error('Error fetching blogs for sitemap:', e);
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://almuminah.com";
  const staticRoutes = [
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

  const blogSlugs = await fetchBlogSlugs();
  const dynamicRoutes = blogSlugs.map(slug => ({
    url: `/blog/${slug}`,
    priority: "0.8",
    changefreq: "weekly"
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).send(sitemap);
}
