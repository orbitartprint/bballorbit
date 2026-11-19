import type { BlogArticle } from '../../data/blogArticles';
import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/horns-action.md?raw';

export const hornsAction = {
  slug: 'horns-action',
  title: 'Horns Offense Explained: Actions, Reads, and Spacing',
  excerpt:
    'One familiar setup. So many ways to hurt a defense. Discover why Horns is a go-to choice for coaches and how its simple spacing creates connected scoring threats.',
  category: 'Offense',
  tags: [
    'Horns Offense',
    'Basketball Strategy',
    'Offensive Concepts',
    'Pick and Roll',
    'Coaching Tips',
  ],
  heroImage: '/lovable-uploads/horns-action-hero-v2.webp',
  heroImageFit: 'contain',
  heroImageAlt:
    'Basketball player in a purple number 5 jersey holding the ball and signaling Horns with a raised hand',
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: '2026-11-19',
} satisfies BlogArticle;
