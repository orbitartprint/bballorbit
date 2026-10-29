export const SITE_URL = "https://bballorbit.com";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`;

export type PageMetadata = { title: string; description: string; image?: string; noindex?: boolean };

/** Shared by route metadata and the static build. */
export const staticPageMetadata: Record<string, PageMetadata> = {
  "/": { title: "Basketball Orbit — Modern Drills. Smarter Coaching. Better Players.", description: "Your go-to hub for modern basketball coaching: small-sided games, constraints-led coaching, and ready-to-use drills and resources." },
  "/drills": { title: "Basketball Drill Library - Basketball Orbit", description: "Explore modern, game-like basketball drills, review court diagrams and coaching cues, and build your next practice." },
  "/resources": { title: "Free & Premium Coaching Resources - Basketball Orbit", description: "Browse Basketball Orbit coaching PDFs and resources. Get free guides or explore the Ultimate SSG Playbook for your next practice." },
  "/free-resources": { title: "Free Coaching Resources Library - Basketball Orbit", description: "Download the free Basketball Orbit coaching PDFs and guides.", noindex: true },
  "/about": { title: "About Chris - Basketball Orbit | Modern Coaching Strategies", description: "Meet Chris, the founder of Basketball Orbit, and learn about his approach to helping basketball coaches build smarter players and stronger teams." },
  "/blog": { title: "Basketball Orbit Blog - Coaching, Drills & Practice Planning", description: "Practical basketball coaching guides on small-sided games, tactics, player development, and planning better practices." },
  "/contact": { title: "Contact Basketball Orbit – Get in Touch with Chris", description: "Have questions about drills, plays, or coaching strategies? Contact Chris at Basketball Orbit." },
  "/privacy": { title: "Privacy Policy - Basketball Orbit", description: "Privacy Policy for Basketball Orbit and the BballOrbit Practice Planner.", noindex: true },
  "/data-deletion": { title: "Account & Data Deletion - Basketball Orbit", description: "Find out how to request deletion of your Basketball Orbit Practice Planner account and associated personal data." },
  "/legal": { title: "Legal Notice - Basketball Orbit", description: "Legal notice, provider details, and contact information for Basketball Orbit." },
  "/terms": { title: "Terms of Service | Basketball Orbit", description: "Terms of Service for Basketball Orbit, the Practice Planner, subscriptions, digital coaching resources, and AI-assisted practice planning tools." },
  "/affiliate": { title: "Affiliate Disclosure - Basketball Orbit", description: "How affiliate links and partnerships help support Basketball Orbit's basketball coaching resources." },
  "/ssg-playbook": { title: "The Ultimate SSG Playbook - Basketball Orbit", description: "100+ competitive, game-like small-sided games with diagrams, coaching points, and progressions for basketball coaches. Digital PDF, $39 one-time purchase.", image: `${SITE_URL}/lovable-uploads/playbook-ssg-thumbnail.webp` },
};

export const normalizePath = (path: string) => path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
export const canonicalForPath = (path: string) => {
  const normalized = normalizePath(path);
  return `${SITE_URL}${normalized === "/" ? "/" : `${normalized}/`}`;
};
export const absoluteImage = (image?: string) => {
  try {
    const url = new URL(image || DEFAULT_IMAGE, SITE_URL);
    return ["https:", "http:"].includes(url.protocol) ? url.href : DEFAULT_IMAGE;
  } catch {
    return DEFAULT_IMAGE;
  }
};

export type ArticleSeoData = { slug: string; title: string; excerpt: string; heroImage: string; publishDate: string };
export const articleStructuredData = (article: ArticleSeoData) => ({
  "@context": "https://schema.org", "@type": "Article",
  headline: article.title, description: article.excerpt,
  image: absoluteImage(article.heroImage), datePublished: article.publishDate,
  author: { "@type": "Person", name: "Chris Bernhard", url: canonicalForPath("/about") },
  publisher: { "@type": "Organization", name: "Basketball Orbit", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": canonicalForPath(`/blog/${article.slug}`) },
});
