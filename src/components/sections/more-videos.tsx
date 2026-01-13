import { Play } from "lucide-react";

const MoreVideos = () => {
  // 🔸 Hier brauchst du nur die Video-IDs und Titel anzugeben
  const videos = [
    {
      id: "dtNQNdSTcRg",
      title: "The Drill Format You’re Not Using - But Make Your Players Elite"
    },
    {
      id: "v6WQI4eV7aI",
      title: "10 Offensive Triggers to Create an Advantage in Your 5-Out Offense"
    },
    {
      id: "rTVDgsR5cV0",
      title: "How to Teach the Zoom Action – 3 Game-Realistic Drills"
    },

  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            More from Basketball Orbit
          </h2>
        </div>

        {/* ✅ Automatisch generierte Thumbnails & Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map(({ id, title }) => {
            const youtubeUrl = `https://youtu.be/${id}`;
            const thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

            return (
              <a
                key={id}
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#f57520]/20 transition-all duration-300 hover:scale-105"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black">
                  <img
                    src={thumbnailUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white">
                      <Play className="w-12 h-12 text-[#f57520]" fill="#f57520" />
                      <span className="text-lg font-semibold">Play on YouTube</span>
                    </div>
                  </div>

                  {/* Orange glow border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f57520] rounded-xl transition-colors duration-300 pointer-events-none" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoreVideos;
