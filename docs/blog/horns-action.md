# Horns Action: editorial and asset handoff

## Article

- Title: **Horns Offense Explained: Actions, Reads, and Spacing**
- Route after deployment: `https://bballorbit.com/blog/horns-action/`
- Source: `src/blog/content/horns-action.md`
- Metadata: `src/blog/article-data/horns-action.ts`
- Registration: `src/data/blogArticles.ts`, category **Offense**.
- Article date: November 19, 2026. This is metadata, not a publication scheduler.
- English US, tactical explanation centered on Chris's own video. No quotes or copied passages from research sites.

Editorial source of truth: `Data/Youtube/Basketball Orbit/#045_Horns Action/Transcript.txt`, the supplied diagrams, and the linked video at `https://www.youtube.com/watch?v=TX8U5Zav8e4`.

The article follows both ball-screen and elbow-entry families: pick-and-roll/pop, twist, flare, double drag, handoff, split, high-low, and Zoom. Text and captions identify the actual player numbers in each diagram. Roll/pop alternatives in the handoff drawing are explicitly alternatives, not simultaneous instructions.

Research consulted for background and cross-checking:

- [The Hoops Geek Horns guide](https://www.thehoopsgeek.com/basketball-horns-offense/)
- [FIBA Europe Horns play](https://coaching.fibaeurope.com/Default.asp?cid=%7B15897918-BDCF-4E6B-A175-FC13FEE8BABC%7D&marked=true&parent=%7B15897918-BDCF-4E6B-A179-FC13FEE8BABC%7D&playID=%7B66DAE735-A7DC-4A11-B0F5-F2CA73F5F72F%7D)
- [WABC Level 3 coaching manual, Horns section](https://assets.fiba.basketball/image/upload/documents-corporate-wabc-coaching-manual-level-3-eng.pdf)

## Assets

All 21 PNG diagrams from the supplied `pdf` folder are included, converted to lossless WebP at their original **1200 × 1085** resolution. No diagram content was redrawn, cropped, or altered. Figures are grouped in responsive pairs where the phases belong together; they stack on mobile. The setup and introductory split/PnR figures are full width.

All files live in `public/lovable-uploads/`.

| Source | WebP destination | Article placement |
| --- | --- | --- |
| `horns-setup.png` | `horns-setup.webp` | Starting alignment |
| `horns-pick-and-roll-1.png` | `horns-pick-and-roll-1.webp` | Two ball-screen choices |
| `horns-pick-and-roll-2.png` | `horns-pick-and-roll-2.webp` | 4 rolls, 5 pops |
| `horns-pick-and-roll-3.png` | `horns-pick-and-roll-3.webp` | 4 pops, 5 dives |
| `horns-recreen-1.png` | `horns-rescreen-1.webp` | First screen and roll |
| `horns-recreen-2.png` | `horns-rescreen-2.webp` | Second screen/twist |
| `horns-flare-screen-1.png` | `horns-flare-screen-1.webp` | Flare entry |
| `horns-flare-screen-2.png` | `horns-flare-screen-2.webp` | 4 uses 5's flare screen |
| `horns-double-drag-1.png` | `horns-double-drag-1.webp` | Sequential screens |
| `horns-double-drag-2.png` | `horns-double-drag-2.webp` | First screener pops, second rolls |
| `horns-handoff-1.png` | `horns-handoff-1.webp` | Elbow entry |
| `horns-handoff-2.png` | `horns-handoff-2.webp` | Pass and follow |
| `horns-handoff-3png.png` | `horns-handoff-3.webp` | Opposite-big basket cut |
| `horns-handoff-4.png` | `horns-handoff-4.webp` | Roll/pop alternatives |
| `horns-split-1.png` | `horns-split-1.webp` | Split entry |
| `horns-split-2.png` | `horns-split-2.webp` | Basket-cut option |
| `horns-split-3.png` | `horns-split-3.webp` | Flare and roll option |
| `horns-high-low-1.png` | `horns-high-low-1.webp` | Dive on elbow entry |
| `horns-high-low-2.png` | `horns-high-low-2.webp` | Inside feed and outside exchange |
| `horns-zoom-1.png` | `horns-zoom-1.webp` | Elbow entry to 4 |
| `horns-zoom-2.png` | `horns-zoom-2.webp` | 5 screens 3 into 4's handoff |
| `Thumbnail_Horns.jpg` | `horns-action-video-thumbnail.webp` | Locally hosted linked YouTube thumbnail |
| `Horns.png` | `horns-action-hero.webp` | Horizontally extended hero |

The hero was edited with built-in Imagegen: extend the portrait horizontally to 16:9, preserve the player, gesture, ball, uniform and pose, and continue the softly blurred arena on both sides without sharp additional players. It is an AI-extended source image, not a new claimed documentary event. The original source remains untouched. The resulting hero is **1672 × 941** and uses `heroImageFit: 'contain'` to preserve the complete composition, including the hand signal and ball.

Imagegen prompt used:

```text
Use case: compositing / horizontal outpainting.
Edit target: the supplied portrait basketball photograph, used as a blog hero.
Expand the canvas horizontally to a wide 16:9 landscape image by adding realistic basketball arena background on BOTH sides of the existing image. Keep the full original portrait content centered and fully visible from the player's hair through the visible shorts. The original player, face, raised Horns hand gesture, exact fingers, pose, ball, arms, purple LIONS number 5 uniform, lighting and photographic detail must be preserved as faithfully as possible. Do not redesign the player or jersey. Do not zoom in, crop the head, crop the ball, or cut off the raised hand. Make the original photo occupy roughly the center 37.5% of the wide frame, with added background filling the sides. Continue the existing softly blurred dark crowd, basketball arena seating and plausible court environment, matching perspective, depth of field, color and lighting. Any distant people must remain naturally blurred background silhouettes, no new sharp foreground players. Professional photorealistic sports photography with seamless transitions. No added titles, labels, watermarks or new logos. The only requested change is horizontal background extension.
```

## Links and remaining dependency

- Video: `https://www.youtube.com/watch?v=TX8U5Zav8e4`, linked with the supplied local thumbnail and in the conclusion; opens in a new tab.
- **PDF funnel: `https://guide.bballorbit.com/horns`. Explicitly authorized before it exists. Chris will create the landingpage; the PDF will be authored in the next step. No PDF file or landingpage was created by this article task. Check this destination before production release.**
- Internal links: Zoom Action, basketball practice planning, and Drill Library.
- Final app CTA: `https://app.bballorbit.com/`, tied to drawing Horns phases and organizing visuals, timing, and coaching cues.
- The CTA uses the existing `drill-creator.webp` screenshot, which directly illustrates the phase-by-phase drawing workflow described in the text.

## Verification: November 19, 2026

- TypeScript and ESLint passed without errors or warnings.
- All 37 existing website tests passed.
- Production client/SSR build, HTML prerendering, hydration bootstrap checks and SEO verification passed for 10 articles and 43 published drills.
- Desktop 1440 × 1000 and mobile 390 × 844 checked from the actual production build. No horizontal overflow; diagram pairs stack on mobile.
- All 21 supplied diagrams appear exactly once and load at their original resolution. All 23 new WebP assets total **668,802 bytes** (about 669 KB).
- H1 uniqueness, heading IDs, canonical, social image, PDF-link attributes, video-thumbnail link, final CTA, sitemap entry, blog-list registration, TOC navigation, and diagram lightbox tested.
- Corrected a small renderer issue: explicit local `data-video-poster` markers are preserved, so clicking the local video thumbnail does not also open the image lightbox. Ordinary diagram enlargement remains intact.
- Local browser QA blocks third-party scripts, including CookieYes and analytics. No local page errors or failed local requests were observed. No YouTube iframe is loaded by this linked-thumbnail article.
- The only remaining release dependency is the explicitly prelinked Horns PDF landingpage and PDF.

## Delivery

Integrated locally in the main website repository. No commit, push, or production deployment is authorized by this task. The registered article and assets will be included in the next normal site build/deployment.
