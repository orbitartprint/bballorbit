import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadSiteData } from "./load-blog-articles.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = process.env.BBALLORBIT_DIST_DIR ? resolve(process.env.BBALLORBIT_DIST_DIR) : join(root, "dist");
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const { articles, seo } = await loadSiteData(root);
const manifest = JSON.parse(readFileSync(join(dist, "public-route-manifest.json"), "utf8"));
const snapshot = JSON.parse(readFileSync(join(dist, "drill-library-snapshot.json"), "utf8"));
const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const htmlFor = (path) => readFileSync(join(dist, path, "index.html"), "utf8");

for (const path of ["free-resources", "privacy"]) {
  assert.doesNotMatch(sitemap, new RegExp(`/${path}(?:[</])`), `${path} must stay out of the sitemap`);
  assert.match(htmlFor(path), /<meta name="robots" content="noindex, nofollow" data-react-helmet="true"\s*\/>/, `${path} must be noindex before JavaScript runs`);
}

for (const article of articles) {
  const path = `blog/${article.slug}`;
  const html = htmlFor(path);
  assert.match(sitemap, new RegExp(`<loc>https://bballorbit.com/${path}/</loc>`));
  assert.match(html, new RegExp(`<link rel="canonical" href="https://bballorbit.com/${path}/"`));
  assert.doesNotMatch(html, /<meta name="robots"[^>]*noindex/);
  assert.ok(html.includes(article.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + " | Basketball Orbit</title>"), `Missing article title for ${path}`);
}

// These previously returned real 404s even though the SPA displayed an article.
for (const slug of ["tagging-up", "basketball-practice-planning", "shot-selection"]) {
  assert.ok(articles.some((article) => article.slug === slug));
  assert.ok(existsSync(join(dist, "blog", slug, "index.html")));
}

for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  assert.equal(url.origin, "https://bballorbit.com");
  assert.ok(url.pathname.endsWith("/"), `Sitemap URL must target the final directory URL: ${url.href}`);
  const html = htmlFor(url.pathname.replace(/^\//, ""));
  assert.ok(html.includes(`<link rel="canonical" href="${url.href}"`), `Canonical must match sitemap URL: ${url.href}`);
  assert.doesNotMatch(html, /<meta name="robots"[^>]*noindex/);
}

for (const path of ["about", "contact", "resources", "terms", "blog", "drills"]) {
  assert.match(htmlFor(path), new RegExp(`<link rel="canonical" href="https://bballorbit.com/${path}/"`));
}

for (const [route, metadata] of Object.entries(seo.staticPageMetadata)) {
  const html = htmlFor(route.replace(/^\//, ""));
  assert.ok(html.includes(`${escapeHtml(metadata.title)}</title>`), `Wrong static title: ${route}`);
  assert.ok(html.includes(`name="description" content="${escapeHtml(metadata.description)}"`), `Wrong static description: ${route}`);
  assert.ok(html.includes(`name="twitter:title" content="${escapeHtml(metadata.title)}"`), `Wrong Twitter title: ${route}`);
  assert.doesNotMatch(html, /@lovable_dev|SearchAction/);
}

assert.equal(new Set(manifest.drillSlugs).size, snapshot.length, "Every published drill must have exactly one generated route");
for (const drill of snapshot) {
  assert.ok(manifest.drillSlugs.includes(drill.public_slug), `Missing published drill: ${drill.public_slug}`);
  const path = `drills/${drill.public_slug}`;
  assert.ok(existsSync(join(dist, path, "index.html")), `Missing drill HTML: ${path}`);
  assert.ok(sitemap.includes(`<loc>${seo.canonicalForPath(`/${path}`)}</loc>`), `Missing drill sitemap URL: ${path}`);
}
for (const article of articles) {
  const html = htmlFor(`blog/${article.slug}`);
  assert.ok(html.includes('"@type":"Article"'), `Missing Article schema before JavaScript: ${article.slug}`);
  assert.ok(html.includes(`name="twitter:image" content="${escapeHtml(seo.absoluteImage(article.heroImage))}"`), `Wrong Twitter image: ${article.slug}`);
}
const notFound = readFileSync(join(dist, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex, follow"/);
assert.doesNotMatch(notFound, /rel="canonical"/);
assert.ok(sitemap.includes(`<loc>${seo.SITE_URL}/</loc></url>`), "Static pages must not get a fictitious build-date lastmod");

console.log(`SEO checks passed: ${articles.length} articles, ${snapshot.length} published drills, static metadata, social cards, canonicals, noindex and 404 fallback.`);
