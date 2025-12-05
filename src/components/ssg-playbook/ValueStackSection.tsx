import { Check } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const ValueStackSection = () => {
  const valueItems = [
    { name: "The Ultimate SSG Playbook", value: "$49" },
    { name: "Constraint Master List", value: "$19" },
    { name: "SSG Warm-Up Blueprint", value: "$12" },
    { name: "Practice Template", value: "$17" },
    { name: "Transition Mini-Pack", value: "$14" },
  ];

  return (
    <section className="bg-[#111111] py-14 lg:py-20 border-t border-[#f57520]/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="space-y-10">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
            Get Over $111 in Modern Coaching Material — For Only $27 Today
          </h2>

          {/* Value Stack Card */}
          <div className="bg-[#111827] rounded-xl p-6 md:p-8 border border-[#f5f5f5]/10 max-w-2xl mx-auto">
            <div className="space-y-4">
              {valueItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4 py-2 border-b border-[#f5f5f5]/10 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#f57520] flex-shrink-0" />
                    <span className="text-lg text-[#f5f5f5]">{item.name}</span>
                  </div>
                  <span className="text-lg text-[#f5f5f5]/60">{item.value} value</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-8 pt-6 border-t-2 border-[#f57520]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-[#f5f5f5]">Total Value:</span>
                <span className="text-xl text-[#f5f5f5]/70 line-through">$111</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-[#f5f5f5]">Regular Price:</span>
                <span className="text-xl text-[#f5f5f5]/70 line-through">$47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#f5f5f5]">Launch Price:</span>
                <span className="text-3xl font-bold text-[#f57520]">$27</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
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

export default ValueStackSection;
