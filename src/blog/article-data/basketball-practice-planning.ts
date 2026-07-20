import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/basketball-practice-planning.md?raw';

export const basketballPracticePlanning = {
  slug: "basketball-practice-planning",
  title: "Basketball Practice Planning: From Drill Ideas to a Clear Plan",
  excerpt:
    "Turn scattered basketball drills into a focused practice with clear goals, smart progressions, realistic timing, constraints, and coaching cues.",
  author: "Chris Bernhard",
  category: "Practice Planning",
  tags: [
    "Basketball Practice Planning",
    "Practice Design",
    "Basketball Drills",
    "Constraints Led Approach",
    "Orbit AI",
    "Coaching Tips"
  ],
  heroImage: "/lovable-uploads/basketball-practice-planning-hero.webp",
  heroImageAlt: "Basketball coach organizing drill sketches into a structured practice plan beside the court",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2026-07-20",
  featured: true,
  youtubeUrl: "",
  related: [
    {
      title: "Basketball Drill Library",
      link: "/drills"
    },
    {
      title: "The Constraints-Led Approach Revolution",
      link: "/blog/constraints-led-approach"
    },
    {
      title: "Basketball Orbit Practice Planner",
      link: "https://app.bballorbit.com/"
    }
  ]
};
