import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const maxThumbnailBytes = 2 * 1024 * 1024;
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;

export type VideoPoster = { src: string; srcSet?: string };
type DownloadedPoster = { src: string; bytes: Buffer };

/** Discover embeds, thumbnail links and literal video IDs without a separate registry. */
export function readYouTubeVideoIds(root: string) {
  const ids = new Set<string>();
  const featuredVideo = join(root, "src/data/featuredVideo.json");
  if (existsSync(featuredVideo)) {
    const { id } = JSON.parse(readFileSync(featuredVideo, "utf8"));
    if (typeof id === "string" && videoIdPattern.test(id)) ids.add(id);
  }
  const scan = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (entry.isFile() && /\.(?:[cm]?[jt]sx?|mdx?|json)$/.test(entry.name)) {
        const source = readFileSync(path, "utf8");
        const patterns = [
          /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|watch\?v=)|youtu\.be\/|(?:i\.ytimg\.com|img\.youtube\.com)\/vi(?:_webp)?\/)([A-Za-z0-9_-]{11})(?=[^A-Za-z0-9_-]|$)/g,
          /(?:\bvideoId["']?\s*:\s*["']|\bvideoId\s*=\s*\{?["'])([A-Za-z0-9_-]{11})["']/g,
        ];
        for (const pattern of patterns) {
          for (const match of source.matchAll(pattern)) ids.add(match[1]);
        }
      }
    }
  };
  scan(join(root, "src"));
  return [...ids].sort();
}

export function localVideoPoster(root: string, id: string): VideoPoster | null {
  if (!videoIdPattern.test(id)) return null;
  const urls = [360, 720, 1280].map((width) => ({ width, src: `/optimized-home/video-${id}-${width}.webp` }))
    .filter(({ src }) => existsSync(join(root, "public", src)));
  if (!urls.length) return null;
  return {
    src: urls[urls.length - 1].src,
    srcSet: urls.length > 1 ? urls.map(({ src, width }) => `${src} ${width}w`).join(", ") : undefined,
  };
}

export async function downloadVideoPoster(id: string): Promise<DownloadedPoster | null> {
  if (!videoIdPattern.test(id)) return null;
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
      return { src: `/video-thumbnails/${id}-${hash}.webp`, bytes };
    } catch {
      // An unavailable thumbnail or a network failure must not block publishing.
    }
  }
  return null;
}

export async function prepareYouTubeVideoPosters(root: string, download = true) {
  const results = await Promise.all(readYouTubeVideoIds(root).map(async (id) => {
    const local = localVideoPoster(root, id);
    const image = !local && download ? await downloadVideoPoster(id) : null;
    return { id, poster: local ?? (image ? { src: image.src } : null), image };
  }));
  const posters: Record<string, VideoPoster> = {};
  const downloads: DownloadedPoster[] = [];
  for (const { id, poster, image } of results) {
    if (poster) posters[id] = poster;
    if (image) downloads.push(image);
  }
  return { posters, downloads, missing: results.filter(({ poster }) => !poster).map(({ id }) => id) };
}
