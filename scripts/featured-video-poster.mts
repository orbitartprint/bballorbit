import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const maxThumbnailBytes = 2 * 1024 * 1024;

export function readFeaturedVideoId(root: string) {
  const { id } = JSON.parse(readFileSync(join(root, "src/data/featuredVideo.json"), "utf8"));
  return typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

export function localFeaturedVideoPoster(root: string, id: string | null) {
  if (!id) return null;
  const urls = [360, 720, 1280].map((width) => ({ width, src: `/optimized-home/video-${id}-${width}.webp` }))
    .filter(({ src }) => existsSync(join(root, "public", src)));
  if (!urls.length) return null;
  return {
    src: urls[urls.length - 1].src,
    srcSet: urls.length > 1 ? urls.map(({ src, width }) => `${src} ${width}w`).join(", ") : undefined,
  };
}

export async function downloadFeaturedVideoPoster(id: string | null) {
  if (!id) return null;
  for (const variant of ["maxresdefault", "hqdefault"]) {
    try {
      const response = await fetch(`https://i.ytimg.com/vi_webp/${id}/${variant}.webp`, {
        redirect: "error",
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok || !response.body || response.headers.get("content-type") !== "image/webp") {
        await response.body?.cancel();
        continue;
      }
      const chunks = [];
      let total = 0;
      for await (const chunk of response.body) {
        total += chunk.length;
        if (total > maxThumbnailBytes) break;
        chunks.push(chunk);
      }
      if (total > maxThumbnailBytes) continue;
      const bytes = Buffer.concat(chunks);
      if (bytes.length < 20 || bytes.toString("ascii", 0, 4) !== "RIFF"
          || bytes.readUInt32LE(4) !== bytes.length - 8
          || bytes.toString("ascii", 8, 12) !== "WEBP") continue;
      const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
      return { src: `/optimized-home/video-${id}-${hash}.webp`, bytes };
    } catch {
      // An unavailable thumbnail or a network failure must not block publishing.
    }
  }
  return null;
}
