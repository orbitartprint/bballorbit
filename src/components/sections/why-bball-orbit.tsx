import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flame, Brain, FileText, Video, Globe } from "lucide-react";

const WhyBballOrbit = () => {
  const features = [
    {
      icon: Flame,
      text: "Modern drills that players love"
    },
    {
      icon: Brain,
      text: "Proven strategies for real-game success"
    },
    {
      icon: FileText,
      text: "Free downloadable PDFs"
    },
    {
      icon: Video,
      text: "In-depth video breakdowns"
    },
    {
      icon: Globe,
      text: "Trusted by 30,000+ coaches worldwide"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Why Basketball Orbit?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Basketball Orbit helps coaches modernize their training with game-realistic drills, smart strategies, and creative challenges that players love. Whether you coach youth or senior teams, you'll find practical tools to build confidence, improve skills, and have fun doing it.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-[#f57520] mb-4" />
                <p className="text-gray-300 font-medium">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <Link to="/drills">
              <Button 
                size="lg"
                className="bg-[#f57520] hover:bg-[#f57520]/90 text-white font-semibold px-8 py-6 text-lg"
              >
                Explore the Drill Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBballOrbit;
