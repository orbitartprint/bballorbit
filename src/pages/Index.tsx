import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/sections/hero-section";
import VideoSection from "@/components/sections/video-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
