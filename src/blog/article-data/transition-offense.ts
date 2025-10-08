// src/blog/article-data/transition-offense.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/basketball-fundamentals-guide.md?raw';

export const articleData = {
  slug: "transition-offense",
  title: "How to Build a Relentless Transition Offense",
  excerpt:
    "Learn how to turn defense into instant offense. Discover the principles, drills, and mindset behind a fast, modern transition offense that creates advantages and high-percentage shots.",
  author: "Chris Bernhard",
  date: "2025-10-06",
  category: "Offense",
  tags: [
    "Transition Offense",
    "Fast Break",
    "Coaching Philosophy",
    "Constraint Led Approach",
    "Modern Basketball"
  ],
  heroImage: "/lovable-uploads/basketball-fundamentals-hero.webp",
  heroImageAlt: "Basketball player practicing dribbling drills on an outdoor court at sunset",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2025-10-11",
  featured: true,
  youtubeUrl: "https://youtu.be/WIUktpk29iI",
  related: [
    {
      title: "4 Drills to Train Transition Offense",
      link: "https://youtu.be/DTqeh4D-agI"
    },
    {
      title: "Principles Over Rules in Coaching",
      link: "https://transformingbball.com/principles-over-rules/"
    },
    {
      title: "Explore All Free Coaching PDFs",
      link: "/resources"
    }
  ]
};

