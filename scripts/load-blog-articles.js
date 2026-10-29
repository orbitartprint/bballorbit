import { createServer } from "vite";

// Read the same registry as the app, including its TypeScript and ?raw imports.
// This prevents newly published articles from silently missing their HTML files.
export async function loadSiteData(root) {
  const vite = await createServer({
    root,
    configFile: false,
    optimizeDeps: { noDiscovery: true, entries: [] },
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });
  try {
    const articles = (await vite.ssrLoadModule("/src/data/blogArticles.ts")).blogArticles;
    const seo = await vite.ssrLoadModule("/src/lib/seo.ts");
    const publicConfig = await vite.ssrLoadModule("/src/integrations/supabase/config.ts");
    return { articles, seo, publicConfig };
  } finally {
    await vite.close();
  }
}

export async function loadBlogArticles(root) {
  return (await loadSiteData(root)).articles;
}
