import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/zoom-action.md?raw';

export const zoomAction = {
  slug: "zoom-action",
  title: "Mastering the Zoom Action: The Most Versatile Trigger in Modern 5-Out Offense",
  excerpt:
    "Discover how the Zoom Action creates space, triggers decisions and unlocks high-percentage offense. Learn the principles, coaching cues and drills — plus a complete PDF guide to master it with small-sided games and the constraints-led approach.",
  author: "Chris Bernhard",
  category: "Offense",
  tags: [
    "Zoom Action",
    "5-Out",
    "Basketball Drills",
    "Small-Sided Games",
    "Constraints Led Approach",
    "Offensive Concepts"
  ],
  heroImage: "/lovable-uploads/zoom-action-hero.webp",
  heroImageAlt: "Players on the Basketball court setting a screen",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2025-10-19",
  featured: true,
  youtubeUrl: "https://youtu.be/u7dRADmLkZ4",
  related: [
    {
      title: "Zoom Action — Drills & Variations",
      link: "https://youtu.be/rTVDgsR5cV0"
    },
    {
      title: "Complete Zoom Action Guide (Free PDF)",
      link: "https://guide.bballorbit.com/zoom"
    },
    {
      title: "How to Build an Unstoppable Transition Offense",
      link: "/blog/transition-offense"
    }
  ]
};
