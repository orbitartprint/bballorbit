export interface Drill {
  id: string;
  title: string;
  subtitle?: string;
  focusArea: string | string[];
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
    id: "2v2-pick-and-roll-variations",
    title: "2v2 Pick & Roll Variations",
    subtitle: "Constraint-based 2v2 to train reads: reject, roll, pop, slip + different coverages",
    focusArea: ["Offense", "Decision Making"],
    mainGoal:
      "Improve ball-handler and screener decision making in the on-ball screen game by manipulating coverage and finishing constraints (reject / use screen, roll / pop / slip, finish vs. help).",
    description: [
      "Set up 2 offensive players at the three-point line: a ball-handler (screen receiver) and a screener. The on-ball defender guards the ball-handler. The screener’s defender starts under the rim.",
      "The screener sets an on-ball screen for the ball-handler. The ball-handler attacks immediately (initially a 2v1) and looks to score or create an advantage.",
      "As soon as an offensive player enters the paint, the second defender (starting under the rim) is allowed to actively defend—turning the action into live 2v2.",
      "Play until a score, stop, or defensive rebound. Reset quickly and rotate roles/positions."
    ],
    constraints: [
      "Coverage constraints (choose one): On-ball defender must go OVER every time / must go UNDER every time / must ICE (force sideline) every time.",
      "Finish constraints (choose one): Offense can only score with layups OR threes / Offense must finish in 0–1 dribbles after the catch on the roll/pop.",
      "Help defender constraints (starting under rim): cannot jump / must keep one hand behind the back / must stay inside the restricted area until paint entry / may start moving when the screen is set.",
      "Offense option constraints (choose one): Ball-handler must REJECT the screen on the first rep / must USE the screen on the first rep; screener must ROLL every time / must POP every time / must SLIP every time.",
      "Add a time pressure: Shot must happen within 4 seconds after the screen.",
      "Progression: Start with help defender 'limited' (static/no jump), then gradually remove limitations to increase realism."
    ],
    thumbnail: "/lovable-uploads/2v2-pick-and-roll-variations.webp",
    videoMp4: "/videos/2v2-pick-and-roll-variations.mp4",
    images: ["/lovable-uploads/2v2-pick-and-roll-variations.webp","/lovable-uploads/2v2-pick-and-roll-variations-2.webp"],
    // youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: [
      "Pick & Roll", "On-Ball Screen", "2v2", "Decision Making", "Ball Screen Reads", "Reject", "Roll", "Pop", "Slip", "Screen Defense"]
  },
  {
    id: "1v1-corner-skip-closeout",
    title: "1v1 Corner Skip Closeout",
    subtitle: "Sprint recovery, closeout technique, and immediate decision-making",
    focusArea: ["Shooting","Defense"],
    mainGoal: "Train defenders to sprint into controlled closeouts after ball movement, while offensive players learn to attack or shoot decisively under pressure.",
    description: [
      "A defender starts with the ball in one corner and passes it to a passer/coach at the free-throw line.",
      "As soon as the pass is made, the defender sprints across to the opposite corner to prepare for a closeout.",
      "The passer quickly skips the ball to that opposite corner, where an offensive player receives the pass.",
      "The defender arrives on the catch and plays a live 1v1 closeout situation, focusing on balance, angles, and recovery speed.",
      "The possession continues until a shot, drive, or stop.",
    ],
    constraints: [
      "Change the starting positions of the defender, offensive player, and/or passer to vary angles and timing.",
      "Limit the offensive player to two dribbles maximum.",
      "Allow the offensive player to use the passer for a give-and-go if the initial advantage disappears.",
      "Expand the drill into 2v2 by adding a help defender and a second offensive player.",
    ],
    thumbnail: "/lovable-uploads/1v1-corner-skip-closeout.webp",
    videoMp4: "/videos/1v1-corner-skip-closeout.mp4",
    images: ["/lovable-uploads/1v1-corner-skip-closeout-1.webp","/lovable-uploads/1v1-corner-skip-closeout-2.webp"],
    // youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: ["Shooting", "Closeout", "Decision Making", "1v1"],
  },
  {
    id: "1v1-escape-warm-up",
    title: "Tag & Escape Warm-Up (1v1)",
    subtitle: "Quick reactions, agility, and evasion under pressure",
    focusArea: ["Warm Up", "Conditioning"],
    mainGoal: "Improve first-step quickness and evasive movement while training the defender to react explosively and protect space.",
    description: [
      "One offensive player (the runner) starts on the baseline.",
      "A defender (the tagger) stands at the free-throw line, holding a ball with both hands.",
      "Two cones are placed to the left and right of the defender.",
      "The drill begins when the runner initiates movement. The runner must try to reach either cone without being tagged by the tagger’s ball.",
      "The tagger may only tag using the ball held with two hands — no reaching or swinging with arms allowed.",
    ],
    constraints: [
      "The runner must dribble while escaping (adds complexity and ball control).",
      "Vary the distance and positioning of the cones to change difficulty.",
      "Move the tagger’s starting position (wider, narrower, angled).",
      "Add a time limit (e.g., reach a cone within 4 seconds).",
      "The runner must perform at least one cross over (behind the back / between the legs)."
    ],
    thumbnail: "/lovable-uploads/1v1-escape-warm-up.webp",
    videoMp4: "/videos/1v1-escape-warm-up.mp4",
    images: ["/lovable-uploads/1v1-escape-warm-up.webp",],
    // youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: ["Warm Up", "Competition", "Agility", "1v1"],
  },
  {
    id: "chase-the-shooter",
    title: "Chase the Shooter",
    subtitle: "Create separation and shoot under pressure",
    focusArea: ["Shooting"],
    mainGoal: "Train shooters to create separation, sprint into space, and knock down shots while a trailing defender applies late pressure.",
    description: [
      "A shooter and defender start at designated cone-marked positions in the half court, with the shooter holding a small head start.",
      "The drill begins when the shooter takes off toward a shooting spot.",
      "Upon arrival, the shooter receives a pass from a passer and take a shot while being chased by the defender, who tries to contest late.",
      "The emphasis is on speed into the shot, balance under pressure, and decision-making if the defender recovers quickly."
    ],
    constraints: [
      "Vary starting positions to change angles, distance, and level of advantage.",
      "Allow the shooter to drive instead of shooting, but assign fewer points to drives than to jump shots.",
      "Remove the passer and require the shooter to dribble into a pull-up instead of catching and shooting.",
      "Permit the shooter to fake before starting, forcing the defender to react.",
      "The defender begins with both hands behind their back and may raise their hands for only 1 second to contest the shot. After that, they must defend without using their hands."
    ],
    thumbnail: "/lovable-uploads/chase-the-shooter-1.webp",
    videoMp4: "/videos/chase-the-shooter.mp4",
    images: ["/lovable-uploads/chase-the-shooter-1.webp","/lovable-uploads/chase-the-shooter-2.webp"],
    // youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: ["Shooting"],
  },
  {
    id: "2v2-corner-drive",
    title: "2v2 Corner Drive",
    subtitle: "Competitive shooting under pressure",
    focusArea: ["Shooting","Defense","Offense"],
    mainGoal: "Force a paint touch and create a high-quality finish or kick-out against help defense.",
    description: [
      "The ball handler and primary defender start in the corner, both outside the 3-point line. This gives the attacker an initial driving advantage.",
      "The attacker must penetrate and achieve a paint touch before attempting a finish.",
      "A second defender waits under the basket, ready to help as the attacker enters the lane.",
      "The defender immediately follows the pass and closes out hard to contest the shot.",
      "A second attacker stands in the opposite corner, positioned for a kick-out pass.",
      "Once the paint touch occurs, the drill becomes fully live 2v2."
    ],
    constraints: [
      "Award extra points for made 3-pointers after the kick-out.",
      "Second defender may only help from inside the paint — no early cheating.",
      "Play in a reduced space (below FT line extended) for tighter spacing decisions.",
    ],
    thumbnail: "/lovable-uploads/2v2-corner-drive-1.webp",
    videoMp4: "/videos/2v2-corner-drive.mp4",
    images: ["/lovable-uploads/2v2-corner-drive-1.webp","/lovable-uploads/2v2-corner-drive-2.webp"],
    // youtubeUrl: "https://youtu.be/9th4smk0MR0?start=102",
    tags: ["Shooting", "Decision Making", "Passing", "2v2"],
  },
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
    tags: ["Shooting", "Competition", "Individual", "Skill Development", "Decision Making", "1v1"],
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
    tags: ["Transition", "Competition", "Conditioning", "Decision Making", "2v2"],
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
    tags: ["Transition", "Competition", "Conditioning", "Decision Making", "2v2"],
  },
  {
    id: "1v1-catch-and-shoot",
    title: "1v1 Catch and Shoot",
    subtitle: "Shooting with Decision Making under Pressure",
    focusArea: "Shooting",
    mainGoal: "Create maximum separation from a trailing defender and get into a catch-and-shoot or drive under pressure.",
    description: [
      "The shooter starts at the 3-point line, while the defender waits below the free throw line.",
      "An additional passer waits at the free-throw to feed the shooter.",
      "The shooter may only start once the defender starts moving around one of the cones at the elbow, then moves lateral to create maximum distance.",
      "The shooter receives the ball from the passer and goes for a catch-and-shoot 3 while the defender tries to contest the shot.",
      "The shooter must use speed, angles, and quick footwork to gain separation.",
    ],
    constraints: [
      "Allow the shooter to choose drive or shoot.",
      "Vary the cone positions to change chase angles and timing.",
      "Limit the shooter to two dribbles when driving.",
    ],
    thumbnail: "/lovable-uploads/1v1-catch-and-shoot.webp",
    videoMp4: "/videos/1v1-catch-and-shoot.mp4",
    //images: ["/lovable-uploads/1v1-catch-and-shoot.webp"],
    tags: ["Shooting", "Decision Making", "1v1"],
  },
  
];

// Get all unique tags from drills
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  drills.forEach(drill => drill.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};

export const focusAreas = ["All", "Warm Up", "Shooting", "Defense", "Offense", "Transition", "Conditioning"] as const;

export type FocusAreaFilter = typeof focusAreas[number];
