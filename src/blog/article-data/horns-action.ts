import type { BlogArticle } from '../../data/blogArticles';
import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/horns-action.md?raw';

export const hornsAction = {
  slug: 'horns-action',
  title: 'Horns Offense Explained: Actions, Reads, and Spacing',
  excerpt:
    'Learn the Horns offense with clear diagrams for pick-and-roll, handoffs, split action, high-low, and Zoom, plus the spacing and reads behind each option.',
  category: 'Offense',
  tags: [
    'Horns Offense',
    'Basketball Strategy',
    'Offensive Concepts',
    'Pick and Roll',
    'Coaching Tips',
  ],
  heroImage: '/lovable-uploads/horns-action-hero.webp',
  heroImageFit: 'contain',
  heroImageAlt:
    'Basketball player in a purple number 5 jersey holding the ball and signaling Horns with a raised hand',
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: '2026-11-19',
} satisfies BlogArticle;
