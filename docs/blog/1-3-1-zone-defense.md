# 1-3-1 Zone Defense: editorial and asset handoff

## Article

- Title: **1-3-1 Zone Defense: A Complete Guide to Roles and Rotations**
- Canonical after deployment: `https://bballorbit.com/blog/1-3-1-zone-defense/`
- Source: `src/blog/content/1-3-1-zone-defense.md`
- Metadata: `src/blog/article-data/1-3-1-zone-defense.ts`
- Registered in `src/data/blogArticles.ts`; category **Defense**.
- Planned article date: Sunday, November 8, 2026, aligned with the video release. This date does not schedule publication; the site includes registered articles when deployed.
- Language and scope: English US; explanations of this coverage, not general zone defense, drills, an installation plan, or a separate offense against it.

The editorial source of truth is Chris's `Voice_Over_EN.md`, the current 20-page cheat sheet updated November 4, 2026, and his own diagrams. The article adds reasoning around the same assignments rather than combining different defensive systems. In particular, on the right-side high-post entry, **X3 + X5 double, X1 + X2 protect below, and X4 covers the nearby perimeter outlet**.

The main coverage contains high and hard-traps baseline corners. Non-trapping corner coverage and three-quarter-court pressure are explicitly separate options.

## Asset mapping

All destination files are in `public/lovable-uploads/`. Except for the hero, the originals are from the video's `pdf` image folder. Source artwork is unchanged: court diagrams are lossless WebP conversions; the hero uses WebP quality 88 and keeps transparency. The two 600px originals are not artificially enlarged. The article provides click-to-enlarge for close inspection.

Destination filenames below use the common prefix `1-3-1-zone-defense-` and suffix `.webp`.

| Original | Destination stem | Placement / purpose |
| --- | --- | --- |
| `1-3-1-Basketballverteidigung.png` | `hero` | Five-player tactical illustration at the top and in social metadata |
| `1-3-1-the-5-roles.png` | `roles` | Setup and X1-X5 role labels |
| `03_Ball on Right_2.png` | `ball-high` | Half-court containment with the ball high right |
| `04_Right-wing coverage.png` | `wing-coverage` | How the wing catch changes the perimeter coverage |
| `05_Baseline Corner_1.png` | `corner-rotation` | Movement on the pass to the right corner |
| `05_Baseline Corner_2.png` | `corner-coverage` | Trap and completed inside exchange |
| `06_High right-to-left reversal_01.png` | `reversal-rotation` | Curved wing recovery and baseline crossing |
| `06_High right-to-left reversal_02.png` | `reversal-coverage` | Responsibilities after the reversal |
| `07_1.png` | `skip-corner-rotation` | Weak-side wing closes first on the skip |
| `07_2.png` | `skip-corner-coverage` | New corner trap |
| `08_1.png` | `skip-wing-rotation` | Closeout route accounts for the next corner pass |
| `08_2.png` | `skip-wing-coverage` | Completed new ball-side coverage |
| `09_1.png` | `high-post-double` | High-post pressure and low protection |
| `09_2.png` | `high-post-exit` | Pass out to the left wing and curved recovery |
| `10_2.png` | `low-post-coverage` | Recovery after post denial is beaten; brief baseline help |
| `11_1.png` | `drive-rotation` | Middle steps up and low defenders fill behind |
| `11_2.png` | `drive-help` | Interior containment and recovery |
| `12_1.png` | `extended-soft-trap` | Three-quarter-court pickup and softer sideline pressure |
| `13_1.png` | `extended-hard-trap` | Hard pressure near halfway and back-three anticipation |
| `14.png` | `rebounding` | Five-player responsibilities after the corner shot |

Omitted as redundant: `1-3-1-setup.png`, `03_Ball on Right_1.png`, and `10_1.png`. The retained figures explain their situations without another near-identical image.

The 20 new assets total **792,706 bytes** (about 0.79 MB decimal). The hero is 289,302 bytes; every diagram is below 44 KB. The source hero is a recognizable composite, not presented as a documentary photograph. Its article-only `heroImageFit: 'contain'` setting keeps all five players visible and disables the crop-inducing hover zoom. Existing articles retain their original hero behavior.

## Links and release

- PDF funnel: `https://guide.bballorbit.com/1-3-1-zone-defense` (HTTP 200 verified); both article links open in a new tab with `noopener noreferrer`.
- YouTube watch link: `https://www.youtube.com/watch?v=FHlkZy5N5eo`.
- Player: `https://www.youtube-nocookie.com/embed/FHlkZy5N5eo`, through the existing consent component; no automatic third-party player load.
- User-stated article and video release: Sunday, November 8, 2026. No pre-release notice appears in the article.
- No fabricated video upload date, duration, or VideoObject schema.
- Internal contextual routes: `/resources`, `/blog/press-break`, `/blog/basketball-practice-planning`.
- Final primary CTA: `https://app.bballorbit.com/`, tied to drawing coverage in the Drill Creator and organizing visuals, cues, and timing in the Practice Planner.
- The words **Practice Planner** in the concluding paragraph also link to the app. YouTube links open in a new tab. The Markdown renderer preserves explicit link targets rather than discarding them for subdomain links.

## Editorial revision

- Replaced the opening scene and questions with a factual two-sentence introduction.
- Changed role-plus-number references to parentheses, including the high-post explanation; standalone X-number references remain unchanged.
- Removed the diagram legend and the video pre-release sentence as requested.

## Verification: November 4, 2026

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: **37 passed**, run from the physical C: checkout path. Running via its D: alias initially loaded duplicate React instances; the physical-path run passes without code or dependency changes.
- `npm run build`, prerendering and automated SEO checks: passed, including all 9 articles and 40 public drills.
- `git diff --check`: passed.
- Independent article audit: exactly one H1, valid heading hierarchy, unique IDs, 151-character description, canonical and social image, Article JSON-LD, sitemap entry, internal routes, alt attributes, and exact built image copies passed.
- Desktop 1440x1000 and mobile 390x844 visually checked; no horizontal overflow. Pairs render in two columns on desktop and stack on mobile.
- TOC navigation, expanded diagrams on desktop/mobile, blog-list registration, previous-article navigation, and copying the canonical sharing URL verified in the browser.
- CTA stacks on mobile and uses the existing orange/dark infobox. Hero transparency checked on the actual dark page background.
- Video player remains unloaded without marketing consent (zero third-party iframes in that state). **Local limitation:** CookieYes rejects the local preview's domain, so the live consent dialog and post-consent playback could not be fully tested locally. Production consent settings were not changed. The video is also not public until its stated release.

## Deployment status

This handoff records a locally integrated and checked repository state. **No commit, push, upload to a remote image service, or production deployment was performed.** The WebP assets are already in the site's normal public-assets directory and the production build; they become publicly available with the normal website deployment. Deploying this state publishes both the registered article and its images. If release is intended for Sunday, deploy on Sunday; changing only the article date does not hold it back.
