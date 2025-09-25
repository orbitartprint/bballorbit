import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Latest from Basketball Orbit
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch our newest drill breakdown and coaching insights
          </p>

          {/* Video Embed */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-glow bg-muted group">
            {/* Placeholder for YouTube embed - replace with actual video */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-bounce cursor-pointer">
                  <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                </div>
                <p className="text-foreground font-semibold">
                  Click to watch our latest drill video
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Replace this with actual YouTube embed
                </p>
              </div>
            </div>
            
            {/* YouTube iframe would go here */}
            {/* 
            <iframe
              className="w-full h-full"
              src="https://youtu.be/u7dRADmLkZ4"
              title="Why Every Coach Should Be Running This 5-Out Entry - Zoom Action"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            */}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Subscribe to our <a href="https://www.youtube.com/@basketballorbit"> YouTube channel</a> for more drill breakdowns and coaching tips
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
