import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/tagging-up.md?raw';

export const taggingUp = {
  slug: "tagging-up",
  title: "Tagging Up in Basketball: Win the Glass and Stop Transition",
  excerpt:
    "Learn how Tagging Up connects five-player offensive rebounding with immediate transition defense, plus the rules, risks, and drills to teach it.",
  author: "Chris Bernhard",
  category: "Rebounding",
  tags: [
    "Tagging Up",
    "Offensive Rebounding",
    "Transition Defense",
    "Basketball Strategy",
    "Basketball Drills",
    "Practice Design"
  ],
  heroImage: "/lovable-uploads/tagging-up-hero.webp",
  heroImageAlt: "Basketball players making contact and fighting for rebounding position under the rim",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2026-08-26",
  featured: true,
  youtubeUrl: "https://youtu.be/s4CsyR3EpJs",
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
