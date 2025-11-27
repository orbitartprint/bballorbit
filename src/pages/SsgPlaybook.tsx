import { Helmet } from "react-helmet";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import PrimaryButton from "@/components/ssg-playbook/PrimaryButton";
import BonusSection from "@/components/ssg-playbook/BonusSection";

const SsgPlaybook = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
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
      <section className="min-h-screen bg-[#111111] pt-[120px] pb-14">
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
                <PrimaryButton>
                  Get the Playbook Now
                </PrimaryButton>

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
      <section className="bg-[#050816] py-14 lg:py-20 border-t border-[#f57520]/20">
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
              <PrimaryButton>
                Download the Playbook Now
              </PrimaryButton>

              {/* Subtext */}
              <p className="text-sm text-[#f5f5f5]/50">
                The launch price is available for a limited time only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Pain Section */}
      <section className="bg-[#1e2d5c] py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-10">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
              Stop Wasting Time on Drills That Don't Transfer to Games.
            </h2>

            {/* Body Copy */}
            <div className="space-y-4 text-center">
              <p className="text-lg md:text-xl text-[#f5f5f5]/70 leading-relaxed">
                Most youth teams struggle because traditional drills don't teach real decisions, spacing or game flow.
              </p>
              <p className="text-lg md:text-xl text-[#f5f5f5]/70 leading-relaxed">
                Players stand still. Practices feel repetitive. Transition never clicks.
              </p>
              <p className="text-lg md:text-xl text-[#f5f5f5]/70 leading-relaxed">
                And coaches spend hours searching for drills — only to realize they still don't fit together.
              </p>
              <p className="text-xl md:text-2xl text-[#f5f5f5] font-semibold pt-4">
                This playbook fixes all of that.
              </p>
            </div>

            {/* Bullet List */}
            <div className="bg-[#111827] rounded-xl p-6 md:p-8 border border-[#f5f5f5]/10 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Real basketball situations, not scripted patterns
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Instant engagement and game speed
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Players learn through decisions, not explanations
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Zero theory overload — just plug-and-play SSGs
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Perfect for every age group and every level
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4">
              <PrimaryButton>
                Download the Playbook Now
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Fascination Bullets Section */}
      <section className="bg-[#050816] py-14 lg:py-20 border-t border-[#2d32f1]/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-10">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
              Inside the Playbook, You Will Discover…
            </h2>

            {/* Fascination Bullets */}
            <div className="space-y-6 max-w-3xl mx-auto pt-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  The exact SSG framework I use to build player IQ, spacing and decision-making — in any age group.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  A drill variation that forces players to make real decisions every 1–2 seconds — no more scripted patterns.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  The competitive scoring rules that turn every drill into a high-intensity challenge players love.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  The #1 spacing constraint that fixes overcrowded offenses in under 5 minutes.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  How to turn every defensive stop into an instant fast break — building speed, spacing and "go-mode" instincts without ever explicitly coaching it.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f57520] rounded-full flex-shrink-0 mt-3" />
                <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
                  My go-to SSG for teams that struggle with ball pressure — teaches toughness without shouting.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4">
              <PrimaryButton>
                Download the Playbook Now
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-[#0b1020] py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="space-y-10">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
              What's Inside the Ultimate SSG Playbook?
            </h2>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-[#f5f5f5]/80 text-center leading-relaxed max-w-3xl mx-auto">
              A complete game-based training system built around spacing, decision-making, player IQ and competitive habits.
            </p>

            {/* Bullets */}
            <div className="bg-[#111827] rounded-xl p-6 md:p-8 border border-[#f5f5f5]/10 max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    100+ game-like small-sided games for all phases of the game
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Clear coaching points for every SSG
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Variations, constraints & progressions for each drill
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    High-quality court diagrams for instant clarity
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Categorized system: offense, defense, transition, spacing, 1v1, 2v2, 3v3, advantage/disadvantage
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#f57520] flex-shrink-0 mt-1" />
                  <p className="text-lg text-[#f5f5f5]/80">
                    Perfect for youth, club and school programs
                  </p>
                </div>
              </div>
            </div>

            {/* Image Preview Gallery */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-[#f5f5f5] text-center mb-8">
                Preview Pages
              </h3>
              <ImageGallery />
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4">
              <PrimaryButton>
                Download the Playbook Now
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <BonusSection />
    </>
  );
};

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const images = [
    { id: 1, label: "Preview Image 1" },
    { id: 2, label: "Preview Image 2" },
    { id: 3, label: "Preview Image 3" },
    { id: 4, label: "Preview Image 4" },
    { id: 5, label: "Preview Image 5" },
  ];

  return (
    <>
      {/* Desktop: Horizontal Gallery */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <button
                className="aspect-[3/4] bg-gradient-to-br from-[#f57520]/10 to-[#2d32f1]/10 rounded-lg border-2 border-[#f5f5f5]/20 hover:border-[#f57520] transition-all cursor-pointer flex items-center justify-center group"
                onClick={() => setSelectedImage(image.id)}
              >
                <span className="text-[#f5f5f5]/60 group-hover:text-[#f5f5f5] transition-colors text-sm text-center px-2">
                  {image.label}
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-[#111111] border-[#f5f5f5]/20">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#f57520]/20 to-[#2d32f1]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#f5f5f5] text-2xl">{image.label}</span>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Mobile: Stacked Vertical Gallery */}
      <div className="md:hidden space-y-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <button
                className="w-full aspect-[3/4] bg-gradient-to-br from-[#f57520]/10 to-[#2d32f1]/10 rounded-lg border-2 border-[#f5f5f5]/20 hover:border-[#f57520] transition-all cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedImage(image.id)}
              >
                <span className="text-[#f5f5f5]/60 text-sm">{image.label}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] bg-[#111111] border-[#f5f5f5]/20">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#f57520]/20 to-[#2d32f1]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#f5f5f5] text-xl">{image.label}</span>
              </div>
            </DialogContent>
          </Dialog>
        ))}
        <Footer />
      </div>
    </>
  );
};

export default SsgPlaybook;
