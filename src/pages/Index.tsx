import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/sections/hero-section";
import VideoSection from "@/components/sections/video-section";
import WhyBballOrbit from "@/components/sections/why-bball-orbit";
import MoreVideos from "@/components/sections/more-videos";
import Testimonials from "@/components/sections/testimonials";
import BlogPromotion from "@/components/sections/blog-promotion";
import LatestBlogPosts from "@/components/sections/latest-blog-posts";
import { Helmet } from "react-helmet";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Basketball Orbit — Modern Drills. Smarter Coaching. Better Players.</title>
        <meta
          name="description"
          content="Your go-to hub for modern basketball coaching: small-sided games, constraint-led approach, and ready-to-use drills and resources."
        />
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Basketball Orbit",
            url: "https://www.bballorbit.com",
            logo: "https://www.bballorbit.com/logo.png",
            sameAs: [
              "https://www.youtube.com/@BasketballOrbit",
              "https://www.instagram.com/basketball_orbit"
            ]
          })}
        </script>
        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BballOrbit.com - Modern Drills. Smarter Coaching. Better Players.",
            url: "https://www.bballorbit.com"
            // Wenn du später eine Suche hast, kannst du "potentialAction" ergänzen
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <VideoSection />
          <WhyBballOrbit />
          <MoreVideos />
          <Testimonials />
          <BlogPromotion />
          <LatestBlogPosts />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
