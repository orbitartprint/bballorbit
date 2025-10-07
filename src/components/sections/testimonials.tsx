import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "This video is amazing! I've watched it over and over...",
      author: "Coach Mike"
    },
    {
      text: "You help me be a better coach. Great videos!",
      author: "Sarah L."
    },
    {
      text: "You've really helped me see that any basic drill can be developed...",
      author: "Tom R."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            What Coaches Are Saying
          </h2>

          <div className="relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full text-center transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <Quote className="w-12 h-12 text-[#f57520] mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-6 italic">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-gray-400 not-italic">
                  — {testimonial.author}
                </cite>
              </div>
            ))}
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#f57520] w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
