import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/sections/hero-section";
import VideoSection from "@/components/sections/video-section";
import WhyBballOrbit from "@/components/sections/why-bball-orbit";
import MoreVideos from "@/components/sections/more-videos";
import Testimonials from "@/components/sections/testimonials";
import BlogPromotion from "@/components/sections/blog-promotion";

const Index = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "BballOrbit.com",
    "url": "https://www.bballorbit.com",
    "logo": "https://www.bballorbit.com/logo.png",
    "sameAs": [
      // Fügen Sie hier Ihre Social-Media-Links ein, z.B.:
      // "https://twitter.com/WeightVs",
      // "https://facebook.com/WeightVsOfficial"
    ]
  };

  const websiteSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "BballOrbit.com - Modern Drills. Smarter Coaching. Better Players.",
    "url": "https://www.bballorbit.com"
    // "potentialAction" ist weggelassen, da keine Suchseite vorhanden ist
  };
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
