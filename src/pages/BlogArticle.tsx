// src/pages/BlogArticle.tsx

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TableOfContents from "@/components/TableOfContents";
import RelatedArticles from "@/components/RelatedArticles";
import { blogArticles, getRelatedArticles } from "@/data/blogArticles";
import { formatDate } from "@/utils/blogHelpers";
import { useEffect, useState } from "react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);
  const [isHeroImageModalOpen, setIsHeroImageModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <>
      <Helmet>
        <title>{article.title} - Basketball Orbit Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://www.bballorbit.com/blog/${article.slug}`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-10">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="bg-card/50 backdrop-blur p-6 md:p-8 rounded-lg border border-border">
                {/* Header */}
                <header className="mb-8">
                  <Badge className="mb-4 bg-primary text-primary-foreground">
                    {article.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    {article.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Chris - Basketball Orbit
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.publishDate)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {article.readTimeMinutes} min read
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </header>

                {/* Hero Image */}
                <Dialog open={isHeroImageModalOpen} onOpenChange={setIsHeroImageModalOpen}>
                  <DialogTrigger asChild>
                    <div className="mb-8 cursor-pointer rounded-lg overflow-hidden">
                      <img
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        className="w-full h-auto max-h-[500px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl w-full p-0 bg-transparent border-none">
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
                  prose-h1:text-4xl prose-h1:mb-6
                  prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                  prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
                  prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-foreground prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:text-foreground prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:my-2 prose-li:text-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
                  prose-code:text-primary prose-code:bg-card prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6 prose-pre:overflow-x-auto
                  prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg
                  prose-hr:border-border prose-hr:my-8
                  prose-table:text-foreground prose-table:border-collapse
                  prose-th:border prose-th:border-border prose-th:bg-card prose-th:p-3
                  prose-td:border prose-td:border-border prose-td:p-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {/* Author Bio */}
                <Card className="mt-12 bg-card/30 border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                        C
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          About Chris
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Basketball coach and trainer at Basketball Orbit, dedicated to helping players of all levels improve their fundamentals and reach their full potential.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation to Previous/Next Articles */}
                <div className="mt-8 pt-8 border-t border-border flex justify-between">
                  {blogArticles.findIndex(a => a.slug === slug) < blogArticles.length - 1 && (
                    <Button variant="outline" asChild>
                      <Link to={`/blog/${blogArticles[blogArticles.findIndex(a => a.slug === slug) + 1].slug}`}>
                        ← Previous Article
                      </Link>
                    </Button>
                  )}
                  {blogArticles.findIndex(a => a.slug === slug) > 0 && (
                    <Button variant="outline" asChild className="ml-auto">
                      <Link to={`/blog/${blogArticles[blogArticles.findIndex(a => a.slug === slug) - 1].slug}`}>
                        Next Article →
                      </Link>
                    </Button>
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              <TableOfContents />
              <RelatedArticles articles={relatedArticles} />
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogArticle;
