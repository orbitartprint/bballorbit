// src/blog/article-data/constraint-led-approach.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/constraints-led-approach.md?raw';

export const constraintsLedApproach = {
  slug: "constraints-led-approach",
  title: "The Constraints-Led Approach Revolution: Rethinking How We Coach Basketball",
  excerpt:
    "Discover how modern coaching is shifting from control to creativity. The Constraints-Led Approach (CLA) blends science, intuition, and real-game learning — transforming how players think, adapt, and perform.",
  author: "Chris Bernhard",
  category: "Coaching Philosophy",
  tags: [
    "Constraints Led Approach",
    "Ecological Dynamics",
    "Skill Acquisition",
    "Modern Coaching",
    "Basketball Learning",
  ],
  heroImage: "/lovable-uploads/constraints-led-approach-hero.webp",
  heroImageAlt: "Coach guiding basketball players in a dynamic practice setting",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2025-10-31",
  featured: true,
  youtubeUrl: "",
  related: [
    {
      title: "4 Drills to Train Decision-Making in Basketball",
      link: "https://youtu.be/DTqeh4D-agI",
    },
    {
      title: "Principles Over Rules: The Foundation of Modern Coaching",
      link: "https://transformingbball.com/principles-over-rules/",
    },
    {
      title: "Get Free Coaching PDFs and Drill Resources",
      link: "/resources",
    },
  ],
};
