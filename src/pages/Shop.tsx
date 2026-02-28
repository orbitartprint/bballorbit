import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shop - Basketball Orbit</title>
        <meta name="description" content="Basketball Orbit shop coming soon. Stay tuned for exciting basketball training products and resources." />
        <link rel="canonical" href="https://bballorbit.com/shop" />
      </Helmet>
      
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]" role="main">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
            {/* Basketball Icon */}
            <div className="w-32 h-32">
              <div className="text-6xl">🏀</div>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              🏀 Shop Coming Soon!
            </h1>
            
            {/* Subline */}
            <p className="text-xl text-white/80 mb-8 max-w-md">
              I am working on something exciting – stay tuned.
            </p>
            
            {/* YouTube Button */}
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => window.open('https://youtube.com/@basketballorbit', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Check Out My YouTube Channel
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
