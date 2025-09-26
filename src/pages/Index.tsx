import Navigation from "@/components/ui/navigation";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/sections/hero-section";
import VideoSection from "@/components/sections/video-section";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
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
