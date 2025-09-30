// src/data/blogArticles.ts

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  tags: string[];
  content: string;
  readTimeMinutes: number;
  publishDate: string;
}

import { basketballFundamentalsGuide } from '../blog/article-data/basketball-fundamentals-guide';

// Export array of all blog articles
export const blogArticles: BlogArticle[] = [
  basketballFundamentalsGuide,
  // Add more articles here as you create them
].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

// Helper functions
export const getCategories = (): string[] => {
  const categories = blogArticles.map(article => article.category);
  return Array.from(new Set(categories));
};

export const getTags = (): string[] => {
  const tags = blogArticles.flatMap(article => article.tags);
  return Array.from(new Set(tags));
};

export const getRelatedArticles = (currentSlug: string, count: number = 3): BlogArticle[] => {
  const currentArticle = blogArticles.find(article => article.slug === currentSlug);
  if (!currentArticle) return [];

  const related = blogArticles
    .filter(article => article.slug !== currentSlug)
    .filter(article =>
      article.category === currentArticle.category ||
      article.tags.some(tag => currentArticle.tags.includes(tag))
    )
    .sort((a, b) => {
      const aScore = (a.category === currentArticle.category ? 2 : 0) +
        a.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      const bScore = (b.category === currentArticle.category ? 2 : 0) +
        b.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, count);

  return related;
};
