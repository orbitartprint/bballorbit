// src/components/RelatedArticles.tsx

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogArticle } from "@/data/blogArticles";
import { formatDate } from "@/utils/blogHelpers";

interface RelatedArticlesProps {
  articles: BlogArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <Card className="bg-card/50 backdrop-blur border-border">
      <CardHeader>
        <CardTitle className="text-lg">Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block group"
            >
              <div className="flex gap-4">
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishDate)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;
