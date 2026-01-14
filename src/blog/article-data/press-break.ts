import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/press-break.md?raw';

export const pressBreak = {
  slug: "press-break",
  title: "How to Break Any Press in Basketball (Without Memorizing Plays)",
  excerpt:
    "A principle-based approach to breaking any full-court press in basketball — without memorizing set plays. Learn how to prepare your players to make better decisions under pressure.",
  author: "Chris Bernhard",
  category: "Offense",
  tags: [
    "Press Break",
    "Full Court Press",
    "Basketball Strategy",
    "Small-Sided Games",
    "Decision Making",
    "Spacing",
    "Transition Offense",
    "Offensive Concepts"
  ],
  heroImage: "/lovable-uploads/press-break-hero.webp",
  heroImageAlt: "Players on the Basketball court trapping the offense player",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "2026-01-18",
  featured: true,
  youtubeUrl: "https://youtu.be/I9q8LFG6rpk",
  related: [
    {
      title: "How to Break Any Press (Free PDF)",
      link: "https://guide.bballorbit.com/press-break"
    },
    {
      title: "How to Build an Unstoppable Transition Offense",
      link: "/blog/transition-offense"
    }
  ]
};
