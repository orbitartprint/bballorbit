import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import feedback from "@/data/coachingFeedback.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <section className="py-20 bg-[#0d0d0d]" aria-labelledby="feedback-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <h2 id="feedback-heading" className="text-3xl md:text-4xl font-bold text-white mb-10">What Coaches Are Saying</h2>
        <div aria-live="polite" aria-atomic="true" className="min-h-[250px]">
          <Quote aria-hidden="true" className="w-12 h-12 text-[#f57520] mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-6 italic">“{feedback[currentIndex]}”</blockquote>
          <p className="text-gray-400">— YouTube viewer</p>
        </div>
        <div className="flex justify-center items-center gap-2 mt-6" aria-label="Choose viewer feedback">
          <button type="button" className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-primary" aria-label="Previous testimonial" onClick={() => setCurrentIndex(index => (index + feedback.length - 1) % feedback.length)}><ChevronLeft aria-hidden="true" /></button>
          {feedback.map((_, index) => <button type="button" key={index} onClick={() => setCurrentIndex(index)} aria-label={`Show testimonial ${index + 1}`} aria-pressed={index === currentIndex} className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-primary"><span className={`h-3 rounded-full ${index === currentIndex ? "bg-[#f57520] w-8" : "bg-gray-600 w-3"}`} /></button>)}
          <button type="button" className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-primary" aria-label="Next testimonial" onClick={() => setCurrentIndex(index => (index + 1) % feedback.length)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
