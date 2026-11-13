import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { downloadFeaturedVideoPoster, localFeaturedVideoPoster, readFeaturedVideoId } from "./featured-video-poster.mts";

const root = fileURLToPath(new URL("../", import.meta.url));
const id = readFeaturedVideoId(root);
const localPoster = localFeaturedVideoPoster(root, id);
const downloadedPoster = localPoster ? null : await downloadFeaturedVideoPoster(id);
const poster = localPoster ?? (downloadedPoster ? { src: downloadedPoster.src } : null);
if (!poster && id) console.warn("Featured video thumbnail unavailable; publishing with the video placeholder.");

const define = { __FEATURED_VIDEO_POSTER__: JSON.stringify(poster) };
await build({ root, define });
if (downloadedPoster) {
  const file = join(root, "dist", downloadedPoster.src);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, downloadedPoster.bytes);
}
await build({ root, define, build: { ssr: "src/entry-server.tsx", outDir: "dist-ssr" } });
