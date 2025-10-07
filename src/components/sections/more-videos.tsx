import { Play } from "lucide-react";

const MoreVideos = () => {
  const videos = [
    {
      id: "YVFqsTxJxQ0",
      url: "https://youtu.be/YVFqsTxJxQ0",
      title: "Basketball Training Video 1"
    },
    {
      id: "9th4smk0MR0",
      url: "https://youtu.be/9th4smk0MR0",
      title: "Basketball Training Video 2"
    },
    {
      id: "NC1-3nrGHyc",
      url: "https://youtu.be/NC1-3nrGHyc",
      title: "Basketball Training Video 3"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            More from Basketball Orbit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#f57520]/20 transition-all duration-300 hover:scale-105"
            >
              {/* YouTube Thumbnail */}
              <div className="relative aspect-video bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreVideos;
