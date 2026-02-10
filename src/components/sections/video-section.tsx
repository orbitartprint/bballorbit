import { useEffect, useState } from "react";
import { Play } from "lucide-react";

const VideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  useEffect(() => {
    const allowed =
      !(window as any).cookieyes?.consent ||
      (window as any).cookieyes?.consent?.marketing !== false;
  
    setMarketingAllowed(allowed);
  }, []);

  // 🔸 Hier änderst du nur diese eine Zeile:
  const videoId = "TX8U5Zav8e4";
  // const videoId = "01rcPig8FNg";
  const videoTitle ="The Horns Offense Breakdown: Every Option From One Setup";
  // const videoTitle ="How to Attack Every Pick-and-Roll Coverage";

  // Automatische URLs basierend auf videoId
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const [thumbnailUrl, setThumbnailUrl] = useState(
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    );
    
    useEffect(() => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      setThumbnailUrl(
        `https://img.youtube.com/vi/${videoId}/${isDesktop ? "maxresdefault" : "hqdefault"}.jpg`
      );
    }, [videoId]);
  return (
    <section className="py-6 lg:py-10 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Latest from Basketball Orbit
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch my newest drill breakdown and coaching insights
          </p>

          {/* ✅ Lazy YouTube Embed mit Cookie Consent Check */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-glow bg-black">
            {!marketingAllowed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/80 p-6">
                <p className="mb-4 text-lg">
                  ⚠️ This video is blocked because marketing cookies are disabled.
                </p>
                <button
                  onClick={() => window.cookieyes && window.cookieyes.resetConsent()}
                  className="bg-[#f57520] text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Change Cookie Settings
                </button>
              </div>
            ) : !isVideoLoaded ? (
              <button
                className="w-full h-full relative"
                onClick={() => setIsVideoLoaded(true)}
                aria-label="Play video"
              >
                <img
                  src={thumbnailUrl}
                  alt={videoTitle}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback auf hq, falls maxres nicht existiert
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition">
                  <Play size={64} className="text-white" />
                </div>
              </button>
            ) : (
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Subscribe to my{" "}
              <a 
                href="https://www.youtube.com/@basketballorbit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors underline decoration-primary/30 hover:decoration-primary"
              >
                YouTube channel
              </a>{" "}
              for more basketball drill breakdowns and coaching tips.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
