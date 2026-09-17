import { createServer } from "vite";

// Read the same registry as the app, including its TypeScript and ?raw imports.
// This prevents newly published articles from silently missing their HTML files.
export async function loadBlogArticles(root) {
  const vite = await createServer({
    root,
    configFile: false,
    optimizeDeps: { noDiscovery: true, entries: [] },
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });
  try {
    return (await vite.ssrLoadModule("/src/data/blogArticles.ts")).blogArticles;
  } finally {
    await vite.close();
  }
}
