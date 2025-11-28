import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PrimaryButton from "./PrimaryButton";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this playbook suitable for beginners?",
      answer: "Yes. The SSGs work for all levels and include clear coaching points.",
    },
    {
      question: "Can I use these drills with young players?",
      answer: "Absolutely — the majority of SSGs are ideal for U10–U18.",
    },
    {
      question: "Do I need much preparation before running these SSGs?",
      answer: "No. Every SSG includes diagrams and instructions for instant use.",
    },
    {
      question: "Is this a physical book?",
      answer: "No, it's a digital PDF you can access immediately.",
    },
    {
      question: "Are updates included?",
      answer: "Yes, all future updates to the playbook are included for free.",
    },
  ];

  return (
    <section className="bg-[#0b1020] py-14 lg:py-20 border-t border-[#f5f5f5]/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#111827] rounded-xl border border-[#f5f5f5]/10 px-6"
              >
                <AccordionTrigger className="text-lg text-[#f5f5f5] font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#f5f5f5]/70 text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

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

export default FAQSection;
