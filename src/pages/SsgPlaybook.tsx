import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const SsgPlaybook = () => {
  return (
    <>
      <Helmet>
        <title>The Ultimate SSG Playbook - Basketball Orbit</title>
        <meta
          name="description"
          content="100+ competitive, game-like small-sided games to teach decision-making, player IQ, and game intensity for every age group."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen bg-[#111111] pt-[120px] pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#f5f5f5]">
                  The Ultimate SSG Playbook – 100+ Competitive, Game-Like Drills
                </h1>
                
                <p className="text-xl md:text-2xl text-[#f5f5f5]/90 font-medium leading-relaxed">
                  Teach decision-making, player IQ, and game intensity with 100+ ready-to-use small-sided games for every age group.
                </p>
                
                <p className="text-lg text-[#f5f5f5]/70 font-medium">
                  Turn Every Practice Into Real Basketball.
                </p>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  className="bg-[#f57520] hover:bg-[#f57520]/90 text-white font-bold text-lg px-12 py-6 h-auto rounded-full"
                >
                  Get the Playbook Now
                </Button>

                {/* Micro-Trust Elements */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-[#f5f5f5]/60">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f57520]" />
                    <span>30,000+ coaches trust Basketball Orbit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f57520]" />
                    <span>Modern game-based coaching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#f57520]" />
                    <span>Instant digital download</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Playbook Mockup */}
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#f57520]/20 to-[#2d32f1]/20 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-[#f57520]/30">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto bg-[#f57520] rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-[#f5f5f5]">
                    Playbook Mockup
                  </p>
                  <p className="text-[#f5f5f5]/60">
                    100+ Game-Like Drills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Offer Section */}
      <section className="bg-[#050816] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center space-y-8">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5]">
              Limited Time Launch Price
            </h2>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-[#f5f5f5]/80 leading-relaxed max-w-2xl mx-auto">
              For the launch of The Ultimate SSG Playbook, you can get full access for a special price of $27. After the launch period, the regular price will be $47.
            </p>

            {/* Price Display */}
            <div className="flex items-center justify-center gap-6 py-6">
              <div className="text-[#f5f5f5]/50 text-2xl line-through">
                $47
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f57520]">
                $27 <span className="text-2xl md:text-3xl text-[#f5f5f5]/70">Launch Price</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3">
              <Button 
                size="lg"
                className="bg-[#f57520] hover:bg-[#f57520]/90 text-white font-bold text-lg px-12 py-6 h-auto rounded-full"
              >
                Download the Playbook Now
              </Button>

              {/* Subtext */}
              <p className="text-sm text-[#f5f5f5]/50">
                The launch price is available for a limited time only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SsgPlaybook;
