import { useState } from "react";
import { Play } from "lucide-react";

const VideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

          {/* ✅ Lazy YouTube Embed */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-glow bg-black">
            {!isVideoLoaded ? (
              <button
                className="w-full h-full relative"
                onClick={() => setIsVideoLoaded(true)}
                aria-label="Play video"
              >
                {/* YouTube Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/rTVDgsR5cV0/hqdefault.jpg"
                  alt="How to Teach the Zoom Action – 3 Game-Realistic Drills"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition">
                  <Play size={64} className="text-white" />
                </div>
              </button>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/rTVDgsR5cV0?autoplay=1"
                title="How to Teach the Zoom Action – 3 Game-Realistic Drills"
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
