export interface Drill {
  id: string;
  title: string;
  subtitle?: string;
  focusArea: string;
  mainGoal: string;
  description: string[];
  constraints?: string[];
  videoMp4?: string;
  images?: string[];
  youtubeUrl?: string;
  tags: string[];
}

export const drills: Drill[] = [
  {
    id: "1v1-kick-out-shooting",
    title: "1v1 Kick Out Shooting",
    subtitle: "Competitive shooting under pressure",
    focusArea: "Shooting",
    mainGoal: "Develop shooting consistency under pressure while maintaining proper technique across various court positions",
    description: [
      "Set up 5 shooting spots around the arc (corners, wings, top of key)",
      "Player must make 2 shots from each spot before advancing to the next",
      "If a shot is missed, player returns to the previous spot",
      "First player to complete all 5 spots wins the challenge",
      "Add time limits or consequences for added pressure"
    ],
    constraints: [
      "Must use proper shooting form on every attempt",
      "No moving onto the next spot until 2 makes are achieved",
      "Time limit of 10 minutes to complete the entire circuit"
    ],
    videoMp4: "/videos/1v1-kick-out.mp4",
    images: ["/lovable-uploads/basketball-fundamentals-hero.webp"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["Shooting", "Competition", "Individual", "Skill Development"],
  },
  {
    id: "closeout-shell-drill",
    title: "Closeout Shell Drill",
    subtitle: "Master defensive positioning and rotations",
    focusArea: "Defense",
    mainGoal: "Master defensive rotations, closeouts, and help positioning while maintaining proper stance and intensity",
    description: [
      "Position 4 defenders in a shell formation around the paint",
      "Offense passes the ball around the perimeter - no dribbling initially",
      "On each pass, the on-ball defender must closeout with high hands",
      "Off-ball defenders must adjust position to provide help-side defense",
      "Progress to live situations once proper positioning is established"
    ],
    constraints: [
      "Sprint to closeout but arrive under control with choppy feet",
      "Maintain help-side positioning at all times",
      "High hands on every closeout to contest potential shots"
    ],
    videoMp4: "/videos/closeout-shell.mp4",
    images: ["/lovable-uploads/run-and-jump-pdf.webp", "/lovable-uploads/zoom-action-pdf.webp"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["Defense", "Team", "Positioning", "Closeouts"],
  },
  {
    id: "transition-advantage-game",
    title: "3v2 to 2v1 Transition Game",
    subtitle: "Fast-paced decision-making in transition",
    focusArea: "Transition",
    mainGoal: "Improve court vision, decision-making speed, and finishing ability in transition advantage situations",
    description: [
      "Start with 3 offensive players at half court and 2 defenders at the basket",
      "Offense attacks 3v2 trying to score quickly",
      "After the shot (make or miss), 2 offensive players sprint back on defense",
      "The 2 defenders now become offense with 1 new player joining them for a 3v2 advantage going the other way",
      "Continuous transition back and forth for 2-3 minutes per group"
    ],
    constraints: [
      "Attack the rim immediately on the catch - no hesitation",
      "Must get a shot off within 7 seconds of gaining possession",
      "Defenders sprint back immediately after the shot attempt"
    ],
    videoMp4: "/videos/transition-game.mp4",
    images: ["/lovable-uploads/zoom-action-pdf.webp", "/lovable-uploads/basketball-fundamentals-hero.webp", "/lovable-uploads/run-and-jump-pdf.webp"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["Transition", "Decision-Making", "Game-Like", "Conditioning"],
  },
  {
    id: "pick-and-roll-reads",
    title: "Pick and Roll Reads Progression",
    subtitle: "Systematic approach to reading coverages",
    focusArea: "Offense",
    mainGoal: "Develop the ability to recognize defensive coverage and make the correct read in pick and roll situations",
    description: [
      "Start with no defense - establish proper spacing and timing between ball handler and screener",
      "Add passive defense showing 'drop coverage' - ball handler attacks downhill",
      "Defense shows 'hedge and recover' - ball handler uses hesitation moves",
      "Defense shows 'switch' - ball handler recognizes mismatch opportunities",
      "Live 2v2 with defense varying coverages - ball handler must read and react"
    ],
    constraints: [
      "Eyes on the low man - read their positioning before making a decision",
      "Screener must set solid screens at the proper angle",
      "Ball handler waits for screen to be set before attacking"
    ],
    images: ["/lovable-uploads/basketball-fundamentals-hero.webp"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["Offense", "Ball Handling", "Decision-Making", "Pick and Roll"],
  },
];

// Get all unique tags from drills
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  drills.forEach(drill => drill.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};

export const focusAreas = ["All", "Shooting", "Defense", "Offense", "Transition", "Conditioning"] as const;

export type FocusAreaFilter = typeof focusAreas[number];
