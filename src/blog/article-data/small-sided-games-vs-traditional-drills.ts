// src/blog/article-data/small-sided-games-vs-traditional-drills.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/small-sided-games-vs-traditional-drills.md?raw';

export const smallSidedGamesVsTraditionalDrills = {
  slug: "small-sided-games-vs-traditional-drills",
  title: "Why I Stopped Running Traditional Drills – And What I Do Instead",
  excerpt:
    "Why traditional basketball drills often fail to transfer to games — and how small-sided games help coaches design practices that develop real decision-making, spacing, and player IQ.",
  author: "Chris Bernhard",
  category: "Coaching Philosophy",
  tags: [
    "Small-Sided Games",
    "Basketball Practice Design",
    "Game-Based Coaching",
    "Modern Basketball Coaching",
    "Player Development",
  ],
  heroImage: "/lovable-uploads/small-sided-games-vs-traditional-drills-hero.webp",
  heroImageAlt: "Girls playing basketball 1-on-1 in a gym",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2025-12-22",
  featured: true,
  youtubeUrl: "",
  related: [
    {
      title: "The Constraints-Led Approach Revolution: Rethinking How We Coach Basketball",
      link: "/blog/constraints-led-approach",
    },
    {
      title: "The Ultimate SSG Playbook – 100+ Competitive, Game-Like Drills",
      link: "/ssg-playbook",
    },
    {
      title: "Get Free Coaching PDFs and Drill Resources",
      link: "/resources",
    },
  ],
};
