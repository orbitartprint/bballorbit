// src/pages/Blog.tsx

import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Helmet } from "react-helmet";
import BlogCard from "@/components/BlogCard";
import { blogArticles } from "@/data/blogArticles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const Blog = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Extract all available categories and tags
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogArticles.forEach(article => categories.add(article.category));
    return Array.from(categories).sort();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogArticles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Filter articles based on search query, category, and tag
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesSearch = searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null || article.category === selectedCategory;
      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Featured Article: First article from filtered list
  const featuredArticle = useMemo(() => {
    return filteredArticles.length > 0 ? filteredArticles[0] : null;
  }, [filteredArticles]);

  // Articles for pagination (excluding featured article)
  const articlesForPagination = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.slice(1);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  const totalPages = Math.ceil(articlesForPagination.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articlesForPagination.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== null || selectedTag !== null;

  return (
    <>
      <Helmet>
        <title>Basketball Orbit Blog - Tips, Training & Basketball Insights</title>
        <meta name="description" content="Discover expert basketball tips, training techniques, and insights to improve your game. From fundamentals to advanced strategies." />
        <link rel="canonical" href="https://www.bballorbit.com/blog" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-12 pt-20">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Basketball Orbit <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, training guides, and basketball insights to elevate your game
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 bg-card/50 backdrop-blur border-border"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-end justify-center">
              <div className="w-full sm:w-auto min-w-[200px]">
                <Label htmlFor="category" className="text-sm text-muted-foreground mb-2 block">
                  Category
                </Label>
                <Select
                  value={selectedCategory || "all"}
                  onValueChange={(value) => {
                    setSelectedCategory(value === "all" ? null : value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger id="category" className="bg-card/50 backdrop-blur border-border">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto min-w-[200px]">
                <Label htmlFor="tag" className="text-sm text-muted-foreground mb-2 block">
                  Tag
                </Label>
                <Select
                  value={selectedTag || "all"}
                  onValueChange={(value) => {
                    setSelectedTag(value === "all" ? null : value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger id="tag" className="bg-card/50 backdrop-blur border-border">
                    <SelectValue placeholder="All Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={clearFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 justify-center">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-2">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-primary">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-2">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-primary">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedTag && (
                  <Badge variant="secondary" className="gap-2">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag(null)} className="ml-1 hover:text-primary">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <BlogCard article={featuredArticle} featured />
                </div>
              )}

              {/* Regular Articles Grid */}
              {currentArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentArticles.map((article) => (
                    <BlogCard key={article.slug} article={article} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
