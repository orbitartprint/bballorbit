import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadBlogArticles } from "./load-blog-articles.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const articles = await loadBlogArticles(root);
const htmlFor = (path) => readFileSync(join(dist, path, "index.html"), "utf8");

for (const path of ["free-resources", "privacy"]) {
  assert.doesNotMatch(sitemap, new RegExp(`/${path}(?:[</])`), `${path} must stay out of the sitemap`);
  assert.match(htmlFor(path), /<meta name="robots" content="noindex, nofollow" data-react-helmet="true"\s*\/>/, `${path} must be noindex before JavaScript runs`);
}

for (const article of articles) {
  const path = `blog/${article.slug}`;
  const html = htmlFor(path);
  assert.match(sitemap, new RegExp(`<loc>https://bballorbit.com/${path}</loc>`));
  assert.match(html, new RegExp(`<link rel="canonical" href="https://bballorbit.com/${path}"`));
  assert.doesNotMatch(html, /<meta name="robots"[^>]*noindex/);
  assert.doesNotMatch(html, /<title>Basketball Orbit - Modern Basketball Drills &amp; Coaching<\/title>/);
}

// These previously returned real 404s even though the SPA displayed an article.
for (const slug of ["tagging-up", "basketball-practice-planning", "shot-selection"]) {
  assert.ok(articles.some((article) => article.slug === slug));
  assert.ok(existsSync(join(dist, "blog", slug, "index.html")));
}

for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  assert.equal(url.origin, "https://bballorbit.com");
  const html = htmlFor(url.pathname.replace(/^\//, ""));
  assert.doesNotMatch(html, /<meta name="robots"[^>]*noindex/);
}

for (const path of ["about", "contact", "resources", "terms", "blog", "drills"]) {
  assert.match(htmlFor(path), new RegExp(`<link rel="canonical" href="https://bballorbit.com/${path}"`));
}

console.log(`SEO checks passed: ${articles.length} blog routes, all sitemap targets, noindex exclusions and page canonicals.`);
