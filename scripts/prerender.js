import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { publicConfiguration, publicationFingerprint } from "./publication.mjs";

process.env.NODE_ENV = "production";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distPath = process.env.BBALLORBIT_DIST_DIR ? resolve(process.env.BBALLORBIT_DIST_DIR) : join(root, "dist");
const baseHtml = readFileSync(join(distPath, "index.html"), "utf8");
const escapeXml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Raster images embedded repeatedly in public diagrams become shared hashed assets.
// SVG/data documents stay untouched; never publish active content as an HTML-origin asset.
const externalizeImages = (value) => {
  if (Array.isArray(value)) return value.map(externalizeImages);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    const match = key === "dataUrl" && typeof item === "string" && item.match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)$/);
    if (!match) return [key, externalizeImages(item)];
    const bytes = Buffer.from(match[2], "base64");
    const hash = createHash("sha256").update(bytes).digest("hex");
    const filename = `${hash}.${match[1] === "jpeg" ? "jpg" : match[1]}`;
    mkdirSync(join(distPath, "drill-assets"), { recursive: true });
    writeFileSync(join(distPath, "drill-assets", filename), bytes);
    return [key, `/drill-assets/${filename}`];
  }));
};

const lastModified = (value) => {
  if (!value || !Number.isFinite(Date.parse(value))) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const main = async () => {
  const { blogArticles: articles, seo, renderPage, parsePublicDrills } = await import(pathToFileURL(join(root, "dist-ssr/entry-server.js")).href);
  const { SITE_URL, staticPageMetadata, canonicalForPath } = seo;
  const { url: supabaseUrl, publishableKey: supabaseKey } = publicConfiguration();
  const fields = "library_item_id,version_id,public_slug,seo_title,seo_description,thumbnail_path,cached_payload,rendered_at";
  const endpoint = new URL("/rest/v1/public_library_pages", supabaseUrl);
  endpoint.search = new URLSearchParams({ select: fields, kind: "eq.drill", cache_status: "eq.published", order: "seo_title.asc" }).toString();
  const response = await fetch(endpoint, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Public Drill Library request failed (${response.status}).`);
  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) throw new Error("No published drills received; refusing to publish an incomplete library.");
  const snapshot = externalizeImages(rows);
  const drills = parsePublicDrills(snapshot);
  if (drills.length !== rows.length) throw new Error("Published drill payload validation failed; refusing an incomplete render.");

  const sitemap = new Map();
  const drillSlugs = new Set();
  const articleSlugs = new Set();
  writeFileSync(join(distPath, "drill-library-snapshot.json"), JSON.stringify(snapshot), "utf8");
  const shell = baseHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<(?:meta|link)\b[^>]*data-react-helmet="true"[^>]*>/gi, "");
  if (!shell.includes('<div id="root"></div>')) throw new Error("Missing application root in the build shell.");

  const renderHtml = async (route, notFound = false) => {
    const rendered = await renderPage(route, drills);
    if (!/<h1\b/i.test(rendered.html)) throw new Error(`Missing readable H1: ${route}`);
    const head = notFound ? rendered.head.replace(/<link[^>]*rel="canonical"[^>]*>/gi, "") : rendered.head;
    return shell.replace("</head>", `${head}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${rendered.html}</div><script id="page-bootstrap" type="application/json">${jsonForHtml(rendered.bootstrap)}</script>`);
  };
  const writeRoute = async (route) => {
    const target = join(distPath, route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, await renderHtml(route), "utf8");
  };

  for (const [route, metadata] of Object.entries(staticPageMetadata)) {
    await writeRoute(route);
    if (!metadata.noindex) sitemap.set(route, "");
  }
  for (const article of articles) {
    if (!slugPattern.test(article.slug) || articleSlugs.has(article.slug)) throw new Error(`Invalid or duplicate article slug: ${article.slug}`);
    articleSlugs.add(article.slug);
    const route = `/blog/${article.slug}`;
    await writeRoute(route);
    sitemap.set(route, lastModified(article.updatedDate || article.publishDate));
  }
  for (const row of snapshot) {
    const slug = row.public_slug;
    if (!slugPattern.test(slug || "") || drillSlugs.has(slug)) throw new Error(`Invalid or duplicate drill slug: ${slug}`);
    drillSlugs.add(slug);
    const route = `/drills/${slug}`;
    await writeRoute(route);
    sitemap.set(route, lastModified(row.rendered_at));
  }

  writeFileSync(join(distPath, "404.html"), await renderHtml("/404", true), "utf8");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(sitemap, ([route, date]) => `  <url><loc>${escapeXml(canonicalForPath(route))}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
  writeFileSync(join(distPath, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(distPath, "public-route-manifest.json"), JSON.stringify({ publicationFingerprint: publicationFingerprint(rows), generatedAt: new Date().toISOString(), routes: [...sitemap.keys()], drillSlugs: [...drillSlugs], articleSlugs: [...articleSlugs] }, null, 2), "utf8");
  console.log(`Rendered full HTML for ${Object.keys(staticPageMetadata).length} static routes, ${articles.length} articles and ${drills.length} published drills at ${SITE_URL}.`);
};

main().catch((error) => { console.error(error); process.exitCode = 1; });
