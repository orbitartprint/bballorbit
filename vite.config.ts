import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { componentTagger } from "lovable-tagger";
import { localFeaturedVideoPoster, readFeaturedVideoId } from "./scripts/featured-video-poster.mts";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  define: {
    __FEATURED_VIDEO_POSTER__: JSON.stringify(localFeaturedVideoPoster(root, readFeaturedVideoId(root))),
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    copyPublicDir: !isSsrBuild,
  },
}));
