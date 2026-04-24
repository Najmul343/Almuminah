import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Dynamic Sitemap XML
  app.get("/sitemap.xml", (req, res) => {
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
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robots = `User-agent: *
Allow: /
Sitemap: https://almuminah.com/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
