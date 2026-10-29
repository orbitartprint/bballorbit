import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import logoImg from "@/assets/basketball-orbit-logo-display.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <picture>
      <source media="(max-width: 767px)" srcSet="/optimized-home/arena-960.webp" />
      <img
        src="/optimized-home/arena-1920.webp"
        width={1920}
        height={960}
        alt="Basketball Training Hall"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      </picture>
      {/* Gradient unten */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#252525]" />

      {/* Optional: Dark Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Optional: keep your geometric accents if you like */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-primary"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full border-2 border-secondary"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-primary"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 pt-12 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-4 flex justify-center py-10">
            <img 
              src={logoImg}
              width={320}
              height={256}
              alt="Basketball Orbit" 
              className="h-24 md:h-32 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-orange">Modern Practice.</span>
            <br />
            <span className="text-foreground">Smarter Coaching.</span>
            <br />
            <span className="text-secondary">Better Players.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Build your next practice with game-like drills, court diagrams, and practical coaching PDFs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              asChild
              className="max-w-full whitespace-normal text-base sm:text-lg px-4 sm:px-8 py-6 shadow-orange transition-bounce hover:scale-105"
            >
              <Link to="/resources">
                Get Free Coaching Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button 
              variant="secondary" 
              size="lg" 
              asChild
              className="text-lg px-8 py-6 shadow-blue transition-bounce hover:scale-105"
            >
              <Link to="/drills">
                <PlayCircle className="mr-2 h-5 w-5" />
                Explore Drill Library
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <p className="font-semibold text-lg mb-2 text-primary">Modern Drills</p>
              <p className="text-muted-foreground">Innovative training methods for today's game</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <p className="font-semibold text-lg mb-2 text-primary">Easy to Implement</p>
              <p className="text-muted-foreground">Step-by-step instructions for quick setup</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <p className="font-semibold text-lg mb-2 text-primary">For Every Youth Coach</p>
              <p className="text-muted-foreground">Suitable for all skill levels and age groups</p>
            </div>
          </div>

          {/* Coaching Philosophy */}
          <div className="mt-12 bg-[#101010] border border-[#2d32f1]/30 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-center shadow-lg">
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              At Basketball Orbit, we build <span className="text-[#f57520] font-semibold">smarter players</span> —
              not through endless repetition, but through real decisions.
              Every drill here is a {" "}
              <Link to="/ssg-playbook" className="text-[#2d32f1] font-semibold hover:underline underline-offset-2">small-sided game 
              </Link>
              {" "} designed around the {" "}
              <Link to="/blog/constraints-led-approach" className="text-[#2d32f1] font-semibold hover:underline underline-offset-2">Constraints-Led Approach 
              </Link>
              {" "} to teach the game — not just the moves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
