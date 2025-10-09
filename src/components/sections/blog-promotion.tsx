import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BlogPromotion = () => {
  return (
    <section className="py-20 px-6 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/50 rounded-2xl p-8 md:p-12 shadow-xl border border-white/5"
        >
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🧠 Stay Ahead of the Game
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Discover detailed breakdowns, practical strategies, and modern coaching insights in the Basketball Orbit Blog. 
              Every post helps you coach smarter and build better teams.
            </p>
          </div>

          {/* Right Column - CTA */}
          <div className="flex justify-center md:justify-end">
            <Link to="/blog">
              <Button 
                size="lg" 
                className="bg-[#f57520] hover:bg-[#f57520]/90 text-white font-semibold px-8 py-6 text-lg group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#f57520]/30"
              >
                Explore the Blog
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPromotion;
