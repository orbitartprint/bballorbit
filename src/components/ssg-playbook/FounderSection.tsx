import PrimaryButton from "./PrimaryButton";
import chrisPhoto1 from "@/assets/chris-photo-1.webp";

const FounderSection = () => {
  return (
    <section className="bg-[#0b1020] py-14 lg:py-20 border-t border-[#f5f5f5]/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Founder Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[#f57520]/20 to-[#2d32f1]/20 rounded-2xl border-2 border-[#f5f5f5]/20 flex items-center justify-center">
              <img 
                src={chrisPhoto1}
                alt="Chris - Basketball Orbit Founder"
                loading="lazy"
                decoding="async"
                className="rounded-lg shadow-orange w-80 h-96 object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5]">
              Meet the Coach Behind This Playbook
            </h2>

            <p className="text-lg text-[#f5f5f5]/80 leading-relaxed">
              Chris Bernhard is a youth coach, content creator and founder of Basketball Orbit. With over 30,000 subscribers and millions of views, his modern, game-based approach has helped thousands of coaches bring more decision-making, player IQ and real-game habits into their practices.
            </p>

            <PrimaryButton asChild className="convertkit-button">
              <a href="https://guide.bballorbit.com/products/ssg-playbook?step=checkout" data-commerce>
                Get the Playbook Now
              </a>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
