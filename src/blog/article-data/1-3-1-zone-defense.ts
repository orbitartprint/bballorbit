import type { BlogArticle } from '../../data/blogArticles';
import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/1-3-1-zone-defense.md?raw';

export const oneThreeOneZoneDefense = {
  slug: '1-3-1-zone-defense',
  title: '1-3-1 Zone Defense: A Complete Guide to Roles and Rotations',
  excerpt:
    'Understand the 1-3-1 zone defense: five roles, corner traps, skip-pass rotations, inside help, and rebounding, with clear diagrams for every situation.',
  category: 'Defense',
  tags: [
    '1-3-1 Zone Defense',
    'Zone Defense',
    'Basketball Strategy',
    'Coaching Tips',
  ],
  heroImage: '/lovable-uploads/1-3-1-zone-defense-hero.webp',
  heroImageFit: 'contain',
  heroImageAlt:
    'Composite illustration of five basketball defenders in blue uniforms arranged in a 1-3-1 formation',
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: '2026-11-08',
} satisfies BlogArticle;
