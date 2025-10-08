// src/blog/article-data/transition-offense.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/transition-offense.md?raw';

export const transitionOffense = {
  slug: "transition-offense",
  title: "How to Build an Unstoppable Transition Offense",
  excerpt:
    "Turn every defensive stop into instant offense. Discover the principles, drills, and mindset behind a fast, modern transition offense that creates advantages and high-percentage shots.",
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
  heroImage: "/lovable-uploads/transition-offense-hero.webp",
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

