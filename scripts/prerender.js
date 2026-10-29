import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadSiteData } from "./load-blog-articles.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distPath = process.env.BBALLORBIT_DIST_DIR ? resolve(process.env.BBALLORBIT_DIST_DIR) : join(root, "dist");
const baseHtml = readFileSync(join(distPath, "index.html"), "utf8");
const escapeHtml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeXml = (value = "") => escapeHtml(value).replace(/'/g, "&apos;");
const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const writeRoute = (route, html) => {
  const target = join(distPath, route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
};

const setMeta = (html, attribute, name, value) => {
  const pattern = new RegExp(`<meta\\s+${attribute}="${name}"[^>]*>`, "gi");
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(value)}" data-react-helmet="true" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `${tag}\n</head>`);
};

const renderMetadata = (metadata, canonical, image, type = "website", jsonLd) => {
  let html = baseHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-react-helmet="true">${escapeHtml(metadata.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" data-react-helmet="true" />`);
  for (const [attribute, name, value] of [
    ["name", "description", metadata.description],
    ["name", "robots", metadata.noindex ? "noindex, nofollow" : "index, follow"],
    ["property", "og:title", metadata.title],
    ["property", "og:description", metadata.description],
    ["property", "og:url", canonical],
    ["property", "og:type", type],
    ["property", "og:image", image],
    ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description],
    ["name", "twitter:image", image],
  ]) html = setMeta(html, attribute, name, value);
  if (jsonLd) html = html.replace("</head>", `<script type="application/ld+json" data-react-helmet="true">${jsonForHtml(jsonLd)}</script>\n</head>`);
  return html;
};

const lastModified = (value) => {
  if (!value || !Number.isFinite(Date.parse(value))) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const main = async () => {
  const { articles, seo, publicConfig } = await loadSiteData(root);
  const { SITE_URL, staticPageMetadata, canonicalForPath, absoluteImage, articleStructuredData } = seo;
  const supabaseUrl = process.env.VITE_SUPABASE_URL || publicConfig.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || publicConfig.SUPABASE_PUBLISHABLE_KEY;
  const fields = "library_item_id,version_id,public_slug,seo_title,seo_description,thumbnail_path,cached_payload,rendered_at";
  const endpoint = new URL("/rest/v1/public_library_pages", supabaseUrl);
  endpoint.search = new URLSearchParams({ select: fields, kind: "eq.drill", cache_status: "eq.published", order: "seo_title.asc" }).toString();
  const response = await fetch(endpoint, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Public Drill Library request failed (${response.status}).`);
  const drills = await response.json();
  if (!Array.isArray(drills) || drills.length === 0) throw new Error("No published drills received; refusing to publish an incomplete library.");

  const sitemap = new Map();
  const drillSlugs = new Set();
  const articleSlugs = new Set();
  writeFileSync(join(distPath, "drill-library-snapshot.json"), JSON.stringify(drills), "utf8");

  for (const [route, metadata] of Object.entries(staticPageMetadata)) {
    writeRoute(route, renderMetadata(metadata, canonicalForPath(route), absoluteImage(metadata.image)));
    if (!metadata.noindex) sitemap.set(route, "");
  }

  for (const article of articles) {
    if (!slugPattern.test(article.slug) || articleSlugs.has(article.slug)) throw new Error(`Invalid or duplicate article slug: ${article.slug}`);
    articleSlugs.add(article.slug);
    const route = `/blog/${article.slug}`;
    writeRoute(route, renderMetadata({ title: `${article.title} | Basketball Orbit`, description: article.excerpt }, canonicalForPath(route), absoluteImage(article.heroImage), "article", articleStructuredData(article)));
    sitemap.set(route, lastModified(article.updatedDate || article.publishDate));
  }

  for (const row of drills) {
    const slug = row.public_slug;
    if (!slugPattern.test(slug || "") || drillSlugs.has(slug)) throw new Error(`Invalid or duplicate drill slug: ${slug}`);
    drillSlugs.add(slug);
    const payload = row.cached_payload || {};
    const title = payload.title || row.seo_title;
    if (typeof title !== "string" || !title.trim()) throw new Error(`Missing drill title: ${slug}`);
    const description = String(payload.excerpt || payload.description || row.seo_description || "Basketball drill from Basketball Orbit.").replace(/\s+/g, " ").trim().slice(0, 200);
    const thumbnailPath = payload.thumbnailPath || row.thumbnail_path;
    const image = absoluteImage(thumbnailPath ? (/^https?:\/\//i.test(thumbnailPath) ? thumbnailPath : `${supabaseUrl}/storage/v1/object/public/library-media/${thumbnailPath}`) : undefined);
    const phases = Array.isArray(payload.phases) && payload.phases.length ? payload.phases : [{ title: "Overview", notes: description }];
    const jsonLd = { "@context": "https://schema.org", "@type": "HowTo", name: title, description, image, step: phases.map((phase, index) => ({ "@type": "HowToStep", name: phase.title || `Phase ${index + 1}`, text: phase.notes || "" })) };
    const route = `/drills/${slug}`;
    writeRoute(route, renderMetadata({ title: `${title} - Basketball Orbit`, description }, canonicalForPath(route), image, "website", jsonLd));
    sitemap.set(route, lastModified(row.rendered_at));
  }

  // GitHub Pages keeps real HTTP 404 responses for unknown paths.
  const notFound = setMeta(baseHtml.replace(/<link rel="canonical"[^>]*>/i, "").replace(/<title[^>]*>[\s\S]*?<\/title>/i, '<title data-react-helmet="true">Page not found - Basketball Orbit</title>'), "name", "robots", "noindex, follow");
  writeFileSync(join(distPath, "404.html"), notFound, "utf8");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(sitemap, ([route, date]) => `  <url><loc>${escapeXml(canonicalForPath(route))}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
  writeFileSync(join(distPath, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(distPath, "public-route-manifest.json"), JSON.stringify({ routes: [...sitemap.keys()], drillSlugs: [...drillSlugs], articleSlugs: [...articleSlugs] }, null, 2), "utf8");
  console.log(`Generated metadata for ${Object.keys(staticPageMetadata).length} static routes, ${articles.length} articles and ${drills.length} published drills at ${SITE_URL}.`);
};

main().catch((error) => { console.error(error); process.exitCode = 1; });
