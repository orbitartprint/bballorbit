import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/shot-selection.md?raw';

export const shotSelection = {
  slug: "shot-selection",
  title: "Basketball Shot Selection: Build a Smarter Offense",
  excerpt:
    "Learn how to define valuable shots, teach the ROB test, use simple analytics, and design practices that build smarter basketball shot selection.",
  author: "Chris Bernhard",
  category: "Offense",
  tags: [
    "Shot Selection",
    "Basketball Offense",
    "Shooting",
    "Decision Making",
    "Small-Sided Games",
    "Practice Design"
  ],
  heroImage: "/lovable-uploads/shot-selection-hero.webp",
  heroImageAlt: "Basketball player rising into a contested jump shot during a game",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2026-08-29",
  featured: true,
  youtubeUrl: "https://youtu.be/FCQAAHUS188",
  related: [
    {
      title: "Basketball Practice Planning: From Drill Ideas to a Clear Plan",
      link: "/blog/basketball-practice-planning"
    },
    {
      title: "Why I Stopped Running Traditional Drills",
      link: "/blog/small-sided-games-vs-traditional-drills"
    },
    {
      title: "Basketball Orbit Practice Planner",
      link: "https://app.bballorbit.com/"
    }
  ]
};
