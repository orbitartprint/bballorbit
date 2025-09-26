import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-10 lg:py-16 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Latest from Basketball Orbit
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch my newest drill breakdown and coaching insights
          </p>

          {/* Video Embed */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-glow bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/u7dRADmLkZ4"
              title="Why Every Coach Should Be Running This 5-Out Entry - Zoom Action"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Subscribe to our{" "}
              <a 
                href="https://www.youtube.com/@basketballorbit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors underline decoration-primary/30 hover:decoration-primary"
              >
                YouTube channel
              </a>{" "}
              for more basketball drill breakdowns and coaching tips
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
