import PrimaryButton from "./PrimaryButton";

const bonuses = [
  {
    number: 1,
    title: "The Constraint Master List",
    description: "25+ proven constraints to instantly increase decision-making, spacing and intensity.",
    value: 19,
  },
  {
    number: 2,
    title: "The SSG Warm-Up Blueprint",
    description: "10 warm-up SSGs extracted and formatted for instant use — high-energy starts in every session.",
    value: 12,
  },
  {
    number: 3,
    title: "The Modern Practice Template",
    description: "A ready-to-use practice planning system you can apply immediately.",
    value: 17,
  },
  {
    number: 4,
    title: "Transition SSG Mini-Pack",
    description: "5 transition-focused SSGs curated for building automatic fast-break instincts.",
    value: 14,
  },
];

const BonusSection = () => {
  return (
    <section className="bg-[#050816] py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="space-y-10">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
            Plus These Exclusive Bonuses (Included Forever)
          </h2>

          {/* Bonus Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {bonuses.map((bonus) => (
              <div
                key={bonus.number}
                className="bg-[#111827] rounded-xl p-6 border border-[#f5f5f5]/10 shadow-lg shadow-black/20 hover:border-[#f57520]/30 transition-colors"
              >
                {/* Bonus Label */}
                <div className="text-[#f57520] text-sm font-bold tracking-wider mb-3">
                  BONUS #{bonus.number}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[#f5f5f5] mb-3">
                  {bonus.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#f5f5f5]/70 leading-relaxed mb-4">
                  {bonus.description}
                </p>
                
                {/* Value */}
                <div className="text-[#2d32f1] font-semibold">
                  (Value: ${bonus.value})
                </div>
              </div>
            ))}
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
  );
};

export default BonusSection;
