// src/components/BlogCard.tsx

import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/utils/blogHelpers";
import { BlogArticle } from "@/data/blogArticles";

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

const BlogCard = ({ article, featured = false }: BlogCardProps) => {
  return (
    <Card className={`h-full flex flex-col bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 ${featured ? 'lg:col-span-3' : ''}`}>
      <Link to={`/blog/${article.slug}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            loading="lazy"
            decoding="async"
            className={`w-full transition-transform duration-300 hover:scale-105 ${
              featured
                ? "h-[400px] object-cover object-[50%_20%]"
                : "h-48 object-cover"
            }`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        
          {/* Gradient Overlay (nur für featured) */}
          {featured && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
          )}
        
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {article.category}
          </Badge>
        </div>
      </Link>
      <CardHeader>
        <Link to={`/blog/${article.slug}`}>
          <h3 className={`font-bold text-foreground hover:text-primary transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {article.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={`text-muted-foreground ${featured ? 'text-base' : 'text-sm'}`}>
          {article.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t border-border">
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTimeMinutes} min
          </span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/blog/${article.slug}`}>
            Read More →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
