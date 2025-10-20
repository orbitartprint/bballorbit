import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: [
        // Static routes
        '/',
        '/drills',
        '/resources',
        '/free-resources',
        '/about',
        '/blog',
        '/shop',
        '/contact',
        '/privacy',
        '/legal',
        '/terms',
        '/affiliate',
        // Dynamic drill routes
        '/drills/1v1-kick-out-shooting',
        // Dynamic blog routes
        '/blog/transition-offense',
        '/blog/zoom-action',
      ],
      renderer: 'react',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md'],
}));
