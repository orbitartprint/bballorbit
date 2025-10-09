import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import { formatDate } from "@/utils/blogHelpers";

const LatestBlogPosts = () => {
  const latestPosts = blogArticles.slice(0, 3);

  return (
    <section className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest from the Blog
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            New coaching ideas, drills, and strategies — updated regularly.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="group bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-[#f57520] border-2 border-transparent h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#f57520] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f57520] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full border-[#f57520]/50 text-white hover:bg-[#f57520] hover:text-white hover:border-[#f57520] group-hover:bg-[#f57520] transition-all"
                      >
                        Read More
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
