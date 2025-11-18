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
    title: "1v1 Kick-Out Shooting",
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
    youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: ["Shooting", "Competition", "Individual", "Skill Development", "Decision Making"],
  },
  {
    id: "2v2-baseline-reload",
    title: "2v2 Baseline Reload",
    subtitle: "Continuous 2-on-2 Baseline Transition Drill",
    focusArea: "Transition",
    mainGoal: "Develop fast transition reactions, continuous play, and defensive communication under pressure.",
    description: [
      "Start with two offensive players and two defenders playing live 2-on-2.",
      "Two additional offensive players wait behind the baseline on each side of the floor.",
      "Limit each possession to a single shot attempt to keep the tempo high.",
      "After a missed shot or turnover, one of the waiting players behind the baseline grabs the ball and attacks the other basket with their teammate.",
      "The former offensive players instantly switch to defense, while the original defenders step off and wait behind the baseline for their next turn.",
      "The drill continues in a fast, back-and-forth rhythm with constant possession changes and no breaks.",
    ],
    constraints: [
      "Vary the starting spots of the waiting players.",
      "Adjust the court size — for example, play only on one side of the floor.",
      "Limit the time allowed for each offensive possession.",
      "Disallow passes within the backcourt to increase tempo and decision-making speed.",
      "Offensive player who last touched the ball must touch sideline before defending.",
    ],
    thumbnail: "/lovable-uploads/2v2-baseline-reload.webp",
    videoMp4: "/videos/2v2-baseline-reload.mp4",
    images: ["/lovable-uploads/2v2-baseline-reload-c1.webp","/lovable-uploads/2v2-baseline-reload-c2.webp"],
    tags: ["Transition", "Competition", "Conditioning", "Decision Making"],
  },
  {
    id: "2v2-rolling-break",
    title: "2v2 Rolling Break",
    subtitle: "Continuous 2-on-2 Transition Drill",
    focusArea: "Transition",
    mainGoal: "Improve transition awareness, quick defensive reactions, and offensive flow in small-sided situations.",
    description: [
      "Start with two offensive players and two defenders playing live 2-on-2.",
      "Two additional players wait out of bounds on each side at the free-throw line extended.",
      "When the defense gains possession or the offense scores, both offensive players step off the court.",
      "One defender picks up the ball and immediately transitions to offense, attacking the opposite basket.",
      "The two sideline players quickly step in as the new defenders — keeping the drill continuous.",
      "This sequence repeats back and forth, emphasizing quick transitions and communication."
    ],
    constraints: [
      "Vary the starting spots of the waiting players, e.g. one player at the baseline and the other player at the midline.",
      "Adjust the court size — for example, play only on one side of the floor.",
      "Limit the time allowed for each offensive possession.",
      "Disallow passes within the backcourt to increase tempo and decision-making speed.",
    ],
    thumbnail: "/lovable-uploads/2v2-rolling-break.webp",
    videoMp4: "/videos/2v2-rolling-break.mp4",
    images: ["/lovable-uploads/2v2-rolling-break-c1.webp","/lovable-uploads/2v2-rolling-break-c2.webp"],
    tags: ["Transition", "Competition", "Conditioning", "Decision Making"],
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
