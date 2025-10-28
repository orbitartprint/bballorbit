// src/blog/article-data/constraint-led-approach.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/constraint-led-approach.md?raw';

export const constraintLedApproach = {
  slug: "constraint-led-approach",
  title: "The Constraint-Led Approach Revolution: Rethinking How We Coach Basketball",
  excerpt:
    "Discover how modern coaching is shifting from control to creativity. The Constraint-Led Approach (CLA) blends science, intuition, and real-game learning — transforming how players think, adapt, and perform.",
  author: "Chris Bernhard",
  category: "Coaching Philosophy",
  tags: [
    "Constraint Led Approach",
    "Ecological Dynamics",
    "Skill Acquisition",
    "Modern Coaching",
    "Basketball Learning",
  ],
  heroImage: "/lovable-uploads/constraint-led-approach-hero.webp",
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
