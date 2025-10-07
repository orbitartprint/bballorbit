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
  images?: string[];
  steps?: string[];
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
    images: ["/lovable-uploads/basketball-fundamentals-hero.webp"],
    steps: [
      "Set up 5 shooting spots around the arc (corners, wings, top of key)",
      "Player must make 2 shots from each spot before advancing to the next",
      "If a shot is missed, player returns to the previous spot",
      "First player to complete all 5 spots wins the challenge",
      "Add time limits or consequences for added pressure"
    ],
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
    images: ["/lovable-uploads/run-and-jump-pdf.webp", "/lovable-uploads/zoom-action-pdf.webp"],
    steps: [
      "Position 4 defenders in a shell formation around the paint",
      "Offense passes the ball around the perimeter - no dribbling initially",
      "On each pass, the on-ball defender must closeout with high hands",
      "Off-ball defenders must adjust position to provide help-side defense",
      "Progress to live situations once proper positioning is established"
    ],
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
    images: ["/lovable-uploads/zoom-action-pdf.webp", "/lovable-uploads/basketball-fundamentals-hero.webp", "/lovable-uploads/run-and-jump-pdf.webp"],
    steps: [
      "Start with 3 offensive players at half court and 2 defenders at the basket",
      "Offense attacks 3v2 trying to score quickly",
      "After the shot (make or miss), 2 offensive players sprint back on defense",
      "The 2 defenders now become offense with 1 new player joining them for a 3v2 advantage going the other way",
      "Continuous transition back and forth for 2-3 minutes per group"
    ],
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
    steps: [
      "Start with no defense - establish proper spacing and timing between ball handler and screener",
      "Add passive defense showing 'drop coverage' - ball handler attacks downhill",
      "Defense shows 'hedge and recover' - ball handler uses hesitation moves",
      "Defense shows 'switch' - ball handler recognizes mismatch opportunities",
      "Live 2v2 with defense varying coverages - ball handler must read and react"
    ],
  },
];

export const focusAreas = ["All", "Shooting", "Defense", "Offense", "Transition", "Conditioning"] as const;
export const drillTypes = ["All", "Competitive Drill", "Team Defense Drill", "Small-Sided Game", "Skill Development Drill"] as const;

export type FocusAreaFilter = typeof focusAreas[number];
export type DrillTypeFilter = typeof drillTypes[number];
