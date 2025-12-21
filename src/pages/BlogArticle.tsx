// src/pages/BlogArticle.tsx

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Calendar, User, Share2, Link2, Mail, Facebook, Twitter } from "lucide-react";
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
import ShareBar from "@/components/ShareBar";
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

  const currentIndex = blogArticles.findIndex((a) => a.slug === slug);
  const nextArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null;
  const prevArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null;
  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <>
      <Helmet>
        <title>{article.title} | Basketball Orbit</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.heroImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Basketball Orbit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.heroImage} />
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

                <ShareBar title={article.title} slug={article.slug} />

                {/* Hero Image */}
                <Dialog open={isHeroImageModalOpen} onOpenChange={setIsHeroImageModalOpen}>
                  <DialogTrigger asChild>
                    <div className="mb-8 cursor-pointer rounded-lg overflow-hidden">
                      <img
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        loading="lazy"
                        decoding="async"
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
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {/* Table of Contents (Mobile) */}
                <div className="lg:hidden mb-8">
                  <TableOfContents containerSelector="#article-content" />
                </div>

                {/* Article Content */}
                <div id="article-content"
                  className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
                  prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                  prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
                  prose-h5:text-lg prose-h5:mt-4 prose-h5:mb-2
                  prose-h6:text-base prose-h6:mt-4 prose-h6:mb-2
                  prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-secondary
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground prose-em:italic
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:my-1 prose-li:text-foreground prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-card/30
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6 prose-pre:overflow-x-auto
                  prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-foreground
                  prose-img:rounded-lg prose-img:my-6 prose-img:shadow-lg prose-img:border prose-img:border-border
                  prose-hr:border-border prose-hr:my-8
                  prose-table:w-full prose-table:my-6 prose-table:border-collapse
                  prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:border prose-td:border-border prose-td:p-3
                  prose-tr:border-b prose-tr:border-border">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
                    components={{
                      a: ({ href, children }) => {
                        const isExternal = href && !href.startsWith("/") && !href.includes("bballorbit.com");
                        return (
                          <a
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="text-primary hover:underline"
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
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

                <div className="mt-8">
                  <ShareBar title={article.title} slug={article.slug} />
                </div>

                {/* Navigation to Previous/Next Articles */}
                <div className="mt-12 pt-8 border-t border-border flex justify-between gap-4">
                  {/* Previous Article (lower index) */}
                  {prevArticle && (
                    <Link
                      to={`/blog/${prevArticle.slug}`}
                      className="group flex items-center gap-3 w-1/2 hover:bg-muted/50 transition-all duration-300 rounded-xl p-3"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={prevArticle.heroImage}
                          alt={prevArticle.title}
                          className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">← Previous Article</p>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {prevArticle.title}
                        </h3>
                      </div>
                    </Link>
                  )}
                
                  {/* Next Article (higher index) */}
                  {nextArticle && (
                    <Link
                      to={`/blog/${nextArticle.slug}`}
                      className="group flex items-center justify-end gap-3 w-1/2 hover:bg-muted/50 transition-all duration-300 rounded-xl p-3 text-right"
                    >
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Next Article →</p>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {nextArticle.title}
                        </h3>
                      </div>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={nextArticle.heroImage}
                          alt={nextArticle.title}
                          className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8 self-start">
              <div className="hidden lg:block">
                <TableOfContents containerSelector="#article-content" />
              </div>
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
