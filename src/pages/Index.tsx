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

const Index = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  return (
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
  );
};

export default Index;
