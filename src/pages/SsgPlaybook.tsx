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
      <section className="min-h-screen bg-[#f8f8f8] pt-[120px] pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#111111]">
                  The Ultimate SSG Playbook – 100+ Competitive, Game-Like Drills
                </h1>
                
                <p className="text-xl md:text-2xl text-[#1e1e1e] font-medium leading-relaxed">
                  Teach decision-making, player IQ, and game intensity with 100+ ready-to-use small-sided games for every age group.
                </p>
                
                <p className="text-lg text-[#1e1e1e]/80 font-medium">
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-[#1e1e1e]/70">
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
              <div className="aspect-[3/4] bg-gradient-to-br from-[#f57520]/20 to-[#2d32f1]/20 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-[#f57520]/20">
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
                  <p className="text-2xl font-bold text-[#111111]">
                    Playbook Mockup
                  </p>
                  <p className="text-[#1e1e1e]/60">
                    100+ Game-Like Drills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SsgPlaybook;
