import { useState } from "react";
import { Play } from "lucide-react";
import { useConsent } from "@/hooks/useConsent";

export default function ConsentYouTube({ videoId, title, poster, posterSrcSet }: { videoId: string; title: string; poster?: string; posterSrcSet?: string }) {
  const [playing, setPlaying] = useState(false);
  const { advertisement } = useConsent();
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;
  return <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-glow not-prose">
    {advertisement && playing ? <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <>
      {poster && <img src={poster} srcSet={posterSrcSet} sizes="(min-width: 1024px) 896px, calc(100vw - 32px)" width={1280} height={720} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover" />}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/65 px-4">
        {advertisement ? <button type="button" onClick={() => setPlaying(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`Play ${title}`}><Play aria-hidden="true" />Play video</button> : <>
          <p className="max-w-md text-xs text-white md:text-base">Allow marketing cookies to load this YouTube video. Loading it sends data to YouTube.</p>
          <button type="button" className="cky-banner-element rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Cookie preferences</button>
        </>}
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-white underline underline-offset-4">Watch on YouTube (opens in a new tab)</a>
      </div>
    </>}
  </div>;
}

export function ArticleVideo({ src, title = "Basketball Orbit video" }: { src?: string; title?: string }) {
  let videoId: string | undefined;
  try {
    const url = new URL(src || "");
    if (url.protocol !== "https:" || !["www.youtube.com", "www.youtube-nocookie.com", "youtube.com"].includes(url.hostname)) return null;
    const match = url.pathname.match(/^\/embed\/([A-Za-z0-9_-]{11})$/);
    videoId = match?.[1];
  } catch { return null; }
  return videoId ? <ConsentYouTube key={videoId} videoId={videoId} title={title} /> : null;
}
