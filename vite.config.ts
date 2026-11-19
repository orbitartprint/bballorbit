import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { componentTagger } from "lovable-tagger";
import { prepareYouTubeVideoPosters } from "./scripts/youtube-video-posters.mts";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, isSsrBuild, command }) => {
  const { posters, downloads } = await prepareYouTubeVideoPosters(root, command === "serve");
  const thumbnails = new Map(downloads.map(({ src, bytes }) => [src, bytes]));
  return {
    define: {
      __YOUTUBE_VIDEO_POSTERS__: JSON.stringify(posters),
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger(), {
      name: "youtube-video-posters",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const image = thumbnails.get(request.url?.split("?")[0] ?? "");
          if (!image) return next();
          response.setHeader("Content-Type", "image/webp");
          response.setHeader("Content-Length", image.length);
          response.end(image);
        });
      },
    }].filter(Boolean),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    assetsInclude: ['**/*.md'],
    build: {
      copyPublicDir: !isSsrBuild,
    },
  };
});
