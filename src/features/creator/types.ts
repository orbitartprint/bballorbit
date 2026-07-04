import type { RichTextDocument } from "./richText";

export type CourtTemplate = "nba" | "ncaa" | "fiba" | "high-school";

export type CourtSize = "half" | "full-vertical" | "full-horizontal";

export type CourtTheme = "clean" | "wood" | "hardwood" | "gray" | "gray-wood";

export type CreatorMode = "draw" | "animate" | "notes" | "output";

export type Point = {
  x: number;
  y: number;
};

export type PlayerKind = "offense" | "defense" | "defense-stance";

export type Player = Point & {
  id: string;
  kind: PlayerKind;
  number: string;
  color?: string;
  /** Facing direction in court-coordinate degrees for Defense Stance players. */
  angle?: number;
  /** Legacy possession marker migrated into DiagramPhase.ball. */
  hasBall?: boolean;
};

export type DiagramBall =
  | {
      id: string;
      mode: "attached";
      playerId: string;
      offset?: Point;
    }
  | (Point & {
      id: string;
      mode: "loose";
    });

export type ActionType = "pass" | "cut" | "dribble" | "screen" | "shot" | "handoff";

export type ActionShape = "straight" | "curved" | "zigzag" | "custom";

export type ActionPointRole = "start" | "controlStart" | "control" | "controlEnd" | "end";

export type DiagramAction = {
  id: string;
  type: ActionType;
  start: Point;
  controlStart?: Point;
  control?: Point;
  controlEnd?: Point;
  end: Point;
  shape?: ActionShape;
  actorId?: string | null;
  /** Keeps this action's start attached to another action's end. */
  startAnchorActionId?: string | null;
  receiverId?: string | null;
  /** Keeps a pass target attached to another action's start or end point. */
  receiverAnchorActionId?: string | null;
  receiverAnchorPoint?: "start" | "end" | null;
  /** Handoff participants may be represented by the end of a Cut or Dribble action. */
  handoffActorActionId?: string | null;
  handoffReceiverActionId?: string | null;
  endTarget?: "rim" | null;
  optional?: boolean;
  animation?: {
    enabled?: boolean;
    duration?: "quick" | "normal" | "slow";
    simultaneousWithPrevious?: boolean;
  };
  animationPreview?: {
    pathProgress?: number;
  };
  color?: string;
};

export type DiagramObject =
  | (Point & {
      id: string;
      type: "cone";
      label?: string;
      color?: string;
      size?: number;
    })
  | (Point & {
      id: string;
      type: "text";
      text: string;
      color?: string;
      fontSize?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      align?: "left" | "center" | "right" | "justify";
    });

export type DiagramPhase = {
  id: string;
  title: string;
  players: Player[];
  balls?: DiagramBall[];
  /** Legacy single-ball field migrated into balls. */
  ball?: DiagramBall | null;
  actions: DiagramAction[];
  objects: DiagramObject[];
  notes: string;
  notesDocument?: RichTextDocument | null;
};

export type DiagramState = {
  schemaVersion: 1;
  metadata: {
    title: string;
    description: string;
    descriptionDocument?: RichTextDocument | null;
    tags: string[];
  };
  court: {
    template: CourtTemplate;
    size: CourtSize;
    theme: CourtTheme;
    showGrid: boolean;
    margin?: number;
    elementScale?: number;
  };
  phases: DiagramPhase[];
  activePhaseId: string;
};

export type Tool =
  | { type: "select" }
  | { type: "player"; kind: PlayerKind; number: string; hasBall?: boolean }
  | { type: "action"; actionType: ActionType }
  | { type: "object"; objectType: "cone" | "text" };

export type SelectionItem =
  | { type: "player"; id: string }
  | { type: "ball"; id: string }
  | { type: "action"; id: string }
  | { type: "object"; id: string };

export type Selection =
  | SelectionItem
  | { type: "multi"; items: SelectionItem[] }
  | null;

