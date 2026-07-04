import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distPath = join(root, "dist");
const baseHtml = readFileSync(join(distPath, "index.html"), "utf8");
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://oxavwwowalaepqxygzkt.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YXZ3d293YWxhZXBxeHlnemt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODgxODAsImV4cCI6MjA3NDY2NDE4MH0.3XWC9LomrGnCL7HVyw4GIfpqzzIrVYm5xW7S0dSeqe4";
const siteUrl = "https://bballorbit.com";

const escapeHtml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeXml = (value = "") => escapeHtml(value).replace(/'/g, "&apos;");

const writeRoute = (route, html) => {
  const target = join(distPath, route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
};

const replaceMeta = (html, { title, description, canonical, image, jsonLd }) => {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  let result = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${safeDescription}" />`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${safeCanonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${safeDescription}" />`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${safeCanonical}" />`);
  if (image) result = result.replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  if (jsonLd) result = result.replace("</head>", `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>\n</head>`);
  return result;
};

const fetchPublicDrills = async () => {
  const fields = "library_item_id,version_id,public_slug,seo_title,seo_description,thumbnail_path,cached_payload,rendered_at";
  const endpoint = `${supabaseUrl}/rest/v1/public_library_pages?select=${fields}&kind=eq.drill&cache_status=eq.published&order=seo_title.asc`;
  const response = await fetch(endpoint, { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } });
  if (!response.ok) throw new Error(`Public Drill Library request failed (${response.status}).`);
  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) throw new Error("Public Drill Library returned no published drills.");
  return rows;
};

const staticRoutes = ["/", "/drills", "/resources", "/free-resources", "/about", "/blog", "/contact", "/privacy", "/legal", "/terms", "/affiliate", "/blog/transition-offense", "/blog/zoom-action", "/blog/constraints-led-approach", "/blog/small-sided-games-vs-traditional-drills", "/blog/press-break", "/ssg-playbook"];
const sitemapRoutes = [...staticRoutes];

const main = async () => {
  const drills = await fetchPublicDrills();
  writeFileSync(join(distPath, "drill-library-snapshot.json"), JSON.stringify(drills), "utf8");

  for (const route of staticRoutes) {
    const html = route === "/drills"
      ? replaceMeta(baseHtml, { title: "Basketball Drill Library - Basketball Orbit", description: "Explore modern, game-like basketball drills and start a complete practice plan in seconds.", canonical: `${siteUrl}/drills` })
      : baseHtml;
    writeRoute(route, html);
  }

  for (const row of drills) {
    const payload = row.cached_payload || {};
    const slug = row.public_slug;
    const title = payload.title || row.seo_title;
    const description = (payload.excerpt || payload.description || row.seo_description || "Basketball drill from Basketball Orbit.").slice(0, 240);
    const canonical = `${siteUrl}/drills/${slug}`;
    const thumbnailPath = payload.thumbnailPath || row.thumbnail_path;
    const image = thumbnailPath ? (/^https?:\/\//i.test(thumbnailPath) ? thumbnailPath : `${supabaseUrl}/storage/v1/object/public/library-media/${thumbnailPath}`) : `${siteUrl}/og-image.webp`;
    const phases = Array.isArray(payload.phases) && payload.phases.length > 0 ? payload.phases : [{ title: "Overview", notes: payload.description || row.seo_description || "" }];
    const jsonLd = { "@context": "https://schema.org", "@type": "HowTo", name: title, description, image, step: phases.map((phase, index) => ({ "@type": "HowToStep", name: phase.title || `Phase ${index + 1}`, text: phase.notes || "" })) };
    writeRoute(`/drills/${slug}`, replaceMeta(baseHtml, { title: `${title} - Basketball Orbit`, description, canonical, image, jsonLd }));
    sitemapRoutes.push(`/drills/${slug}`);
  }

  const now = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(new Set(sitemapRoutes)).map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route === "/" ? "/" : route}`)}</loc><lastmod>${now}</lastmod></url>`).join("\n")}\n</urlset>\n`;
  writeFileSync(join(distPath, "sitemap.xml"), sitemap, "utf8");
  console.log(`Prerendered ${staticRoutes.length} static routes and ${drills.length} published drills.`);
};

main().catch((error) => { console.error(error); process.exitCode = 1; });
