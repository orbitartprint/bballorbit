export interface Drill {
  id: string;
  title: string;
  subtitle?: string;
  focusArea: string;
  mainGoal: string;
  description: string[];
  constraints?: string[];
  thumbnail: string;
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
    mainGoal: "Develop shooting consistency under pressure and decision making",
    description: [
      "Start with a 1-on-1 situation and one additional shooter positioned anywhere around the arc.",
      "The ball handler attacks the basket and must get at least one foot into the paint before making any pass.",
      "After driving into the paint, the ball handler kicks the ball out to the perimeter shooter.",
      "The defender immediately follows the pass and closes out hard to contest the shot.",
      "Once the pass is made, the ball handler sprints behind the arc to become a passing option again.",
      "The shooter has the option to shoot or to pass."
    ],
    constraints: [
      "Players must vary the starting positions after each rep.",
      "Adjust the scoring system to highlight whatever skill you want to focus on.",
      "Allow or disallow penetrations.",
      "Limit the number of passes or dribbles."
    ],
    thumbnail: "/lovable-uploads/1v1-kick-out.webp",
    videoMp4: "/videos/1v1-kick-out.mp4",
    // images: ["/lovable-uploads/basketball-fundamentals-hero.webp"],
    youtubeUrl: "https://youtu.be/9th4smk0MR0?si=ektgDdCJyxScY9A9&t=102",
    tags: ["Shooting", "Competition", "Individual", "Skill Development", "Decision Making"],
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
