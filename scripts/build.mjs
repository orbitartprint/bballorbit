import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { prepareYouTubeVideoPosters } from "./youtube-video-posters.mts";

const root = fileURLToPath(new URL("../", import.meta.url));
const { posters, downloads, missing } = await prepareYouTubeVideoPosters(root);
if (missing.length) console.warn(`YouTube thumbnails unavailable for ${missing.join(", ")}; publishing with the video placeholders.`);

const define = { __YOUTUBE_VIDEO_POSTERS__: JSON.stringify(posters) };
await build({ root, define });
for (const poster of downloads) {
  const file = join(root, "dist", poster.src);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, poster.bytes);
}
await build({ root, define, build: { ssr: "src/entry-server.tsx", outDir: "dist-ssr" } });
