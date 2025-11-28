import PrimaryButton from "./PrimaryButton";

const FinalCTASection = () => {
  return (
    <section className="bg-[#111111] py-16 lg:py-20 border-t border-[#f57520]/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5]">
            Ready to Transform Your Practices?
          </h2>

          <p className="text-lg md:text-xl text-[#f5f5f5]/80 leading-relaxed">
            If you're like most coaches, you want your players to make smarter decisions, move with purpose, and play real basketball — not memorize patterns. This playbook gives you everything you need to make that happen.
          </p>

          <div className="space-y-4 pt-4">
            <PrimaryButton>
              Download the Playbook Now
            </PrimaryButton>

            <p className="text-sm text-[#f5f5f5]/50 italic">
              P.S. The launch price of $27 is only available for a limited time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
