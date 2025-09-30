// src/blog/article-data/basketball-fundamentals-guide.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/basketball-fundamentals-guide.md?raw';

export const basketballFundamentalsGuide = {
  slug: "basketball-fundamentals-guide",
  title: "Mastering Basketball Fundamentals: A Complete Guide",
  excerpt: "Whether you're just starting out or looking to refine your skills, understanding and practicing the core fundamentals will elevate your game to the next level. Learn the essential skills every player needs.",
  heroImage: "/lovable-uploads/basketball-fundamentals-hero.webp",
  heroImageAlt: "Basketball player practicing dribbling drills on an outdoor court at sunset",
  category: "Skills & Training",
  tags: ["Fundamentals", "Dribbling", "Shooting", "Defense", "Training", "Basketball Skills"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-01-15",
};
