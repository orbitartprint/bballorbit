export interface Drill {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  focusArea: string;
  mainGoal: string;
  drillType: string;
  keyCoachingPoint: string;
  tags: string[];
  youtubeUrl?: string;
  filePath?: string;
  pdfAvailable: boolean;
}

export const drills: Drill[] = [
  {
    slug: "shooting-ladder-challenge",
    title: "Shooting Ladder Challenge",
    description: "A competitive shooting drill that builds consistency and mental toughness through progressive challenges at multiple spots.",
    thumbnail: "/lovable-uploads/basketball-fundamentals-hero.webp",
    focusArea: "Shooting",
    mainGoal: "Develop shooting consistency under pressure while maintaining proper technique across various court positions",
    drillType: "Competitive Drill",
    keyCoachingPoint: "Focus on shot preparation and follow-through - every rep should look identical regardless of the score",
    tags: ["Shooting", "Competition", "Individual", "Skill Development"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    pdfAvailable: false,
  },
  {
    slug: "closeout-shell-drill",
    title: "Closeout Shell Drill",
    description: "A defensive positioning drill that teaches proper closeout technique and off-ball help defense in a controlled 4-on-4 setting.",
    thumbnail: "/lovable-uploads/run-and-jump-pdf.webp",
    focusArea: "Defense",
    mainGoal: "Master defensive rotations, closeouts, and help positioning while maintaining proper stance and intensity",
    drillType: "Team Defense Drill",
    keyCoachingPoint: "Sprint to closeout but arrive under control - choppy feet in the last 3 steps prevent blow-bys",
    tags: ["Defense", "Team", "Positioning", "Closeouts"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    filePath: "/pdfs/run-and-jump-defense.pdf",
    pdfAvailable: true,
  },
  {
    slug: "transition-advantage-game",
    title: "3v2 to 2v1 Transition Game",
    description: "A fast-paced transition drill that creates decision-making opportunities in advantage situations going both ways.",
    thumbnail: "/lovable-uploads/zoom-action-pdf.webp",
    focusArea: "Transition",
    mainGoal: "Improve court vision, decision-making speed, and finishing ability in transition advantage situations",
    drillType: "Small-Sided Game",
    keyCoachingPoint: "Attack the rim immediately on the catch - every second of hesitation gives defense time to recover",
    tags: ["Transition", "Decision-Making", "Game-Like", "Conditioning"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    filePath: "/pdfs/zoom-action.pdf",
    pdfAvailable: true,
  },
  {
    slug: "pick-and-roll-reads",
    title: "Pick and Roll Reads Progression",
    description: "A systematic approach to teaching ball handlers how to read and attack different pick and roll coverages.",
    thumbnail: "/lovable-uploads/basketball-fundamentals-hero.webp",
    focusArea: "Offense",
    mainGoal: "Develop the ability to recognize defensive coverage and make the correct read in pick and roll situations",
    drillType: "Skill Development Drill",
    keyCoachingPoint: "Eyes on the low man - their decision dictates whether you attack downhill or find the roller",
    tags: ["Offense", "Ball Handling", "Decision-Making", "Pick and Roll"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    pdfAvailable: false,
  },
];

export const focusAreas = ["All", "Shooting", "Defense", "Offense", "Transition", "Conditioning"] as const;
export const drillTypes = ["All", "Competitive Drill", "Team Defense Drill", "Small-Sided Game", "Skill Development Drill"] as const;

export type FocusAreaFilter = typeof focusAreas[number];
export type DrillTypeFilter = typeof drillTypes[number];
