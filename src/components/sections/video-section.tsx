import ConsentYouTube from "@/components/ConsentYouTube";
import featuredVideo from "@/data/featuredVideo.json";

const posterBase = `/optimized-home/video-${featuredVideo.id}`;

const VideoSection = () => {
  return (
    <section className="bg-card py-6 lg:py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Latest from Basketball Orbit</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">Watch my newest drill breakdown and coaching insights</p>
          <ConsentYouTube videoId={featuredVideo.id} title={featuredVideo.title} poster={`${posterBase}-1280.webp`} posterSrcSet={`${posterBase}-360.webp 360w, ${posterBase}-720.webp 720w, ${posterBase}-1280.webp 1280w`} />
          <p className="mt-8 text-muted-foreground">Subscribe to my <a href="https://www.youtube.com/@basketballorbit" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/50 underline-offset-4 hover:text-primary">YouTube channel</a> for more basketball drill breakdowns and coaching tips.</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
