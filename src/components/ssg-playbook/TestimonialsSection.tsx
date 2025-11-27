import PrimaryButton from "./PrimaryButton";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "I used many of Chris' concepts — including his 5-Out principles and SSG ideas — with my 4th & 5th graders and the transformation was unbelievable. All kids were involved, no boring drills, and we went undefeated in my first year coaching. His game-like approach really works.",
      author: "Coach Carlos, USA",
    },
    {
      text: "Christian's drills and explanations are so clear that I keep coming back to study them. The game-like variations helped me overhaul my practices and keep my players engaged. This is some of the best modern coaching material online.",
      author: "Coach Robert, U14",
    },
    {
      text: "Christian's game-based approach stands out. Clear explanations, great animations and drills that are methodically structured and truly game-realistic. His SSG philosophy has improved my understanding of how to teach real decisions.",
      author: "Coach Thomas, Germany",
    },
    {
      text: "This playbook gave me more clarity in one week than years of random drill searching. Every SSG is well structured and easy to run. It completely changed how I plan my practices.",
      author: "Youth Coach, Canada",
    },
  ];

  return (
    <section className="bg-[#0d1117] py-14 lg:py-20 border-t border-[#2d32f1]/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="space-y-10">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f5] text-center">
            What Coaches Are Saying
          </h2>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#1a1f2c] rounded-xl p-6 border border-[#f5f5f5]/10 shadow-lg"
              >
                <blockquote className="text-[#f5f5f5]/80 text-base leading-relaxed mb-4">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-[#f57520] font-medium not-italic">
                  — {testimonial.author}
                </cite>
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

export default TestimonialsSection;
