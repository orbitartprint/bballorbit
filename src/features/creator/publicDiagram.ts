import { z } from "zod";
import type { DiagramAction, DiagramPhase, DiagramState } from "./types";

const pointSchema = z.object({ x: z.number().finite(), y: z.number().finite() });
const playerSchema = pointSchema.extend({
  id: z.string(), kind: z.enum(["offense", "defense", "defense-stance"]), number: z.string(),
  color: z.string().optional(), angle: z.number().optional(), hasBall: z.boolean().optional(),
});
const ballSchema = z.union([
  z.object({ id: z.string(), mode: z.literal("attached"), playerId: z.string(), offset: pointSchema.optional() }),
  pointSchema.extend({ id: z.string(), mode: z.literal("loose") }),
]);
const actionSchema = z.object({
  id: z.string(), type: z.enum(["pass", "cut", "dribble", "screen", "shot", "handoff"]), start: pointSchema,
  controlStart: pointSchema.optional(), control: pointSchema.optional(), controlEnd: pointSchema.optional(), end: pointSchema,
  shape: z.enum(["straight", "curved", "zigzag", "custom"]).optional(), actorId: z.string().nullable().optional(),
  startAnchorActionId: z.string().nullable().optional(), receiverId: z.string().nullable().optional(),
  receiverAnchorActionId: z.string().nullable().optional(), receiverAnchorPoint: z.enum(["start", "end"]).nullable().optional(),
  handoffActorActionId: z.string().nullable().optional(), handoffReceiverActionId: z.string().nullable().optional(),
  endTarget: z.literal("rim").nullable().optional(), optional: z.boolean().optional(),
  animation: z.object({ enabled: z.boolean().optional(), duration: z.enum(["quick", "normal", "slow"]).optional(), simultaneousWithPrevious: z.boolean().optional() }).optional(),
  color: z.string().optional(),
}).passthrough();
const objectSchema = z.union([
  pointSchema.extend({ id: z.string(), type: z.literal("cone"), label: z.string().optional(), color: z.string().optional(), size: z.number().optional() }),
  pointSchema.extend({ id: z.string(), type: z.literal("text"), text: z.string(), color: z.string().optional(), fontSize: z.number().optional(), bold: z.boolean().optional(), italic: z.boolean().optional(), underline: z.boolean().optional(), align: z.enum(["left", "center", "right", "justify"]).optional() }),
]);
const phaseSchema = z.object({
  id: z.string(), title: z.string().default("Phase"), players: z.array(playerSchema).default([]), balls: z.array(ballSchema).optional(),
  ball: ballSchema.nullable().optional(), actions: z.array(actionSchema).default([]), objects: z.array(objectSchema).default([]),
  notes: z.string().default(""), notesDocument: z.unknown().nullable().optional(),
}).passthrough();
const documentSchema = z.object({
  court: z.object({
    template: z.enum(["nba", "ncaa", "fiba", "high-school"]), size: z.enum(["half", "full-vertical", "full-horizontal"]),
    theme: z.enum(["clean", "wood", "hardwood", "gray", "gray-wood"]), showGrid: z.boolean().default(false),
    margin: z.number().optional(), elementScale: z.number().optional(),
  }),
  phases: z.array(phaseSchema).min(1),
}).passthrough();

const normalizeAction = (action: z.infer<typeof actionSchema>): DiagramAction => ({
  ...action, shape: action.shape ?? "straight", actorId: action.actorId ?? null, receiverId: action.receiverId ?? null,
  startAnchorActionId: action.startAnchorActionId ?? null, handoffActorActionId: action.handoffActorActionId ?? null,
  handoffReceiverActionId: action.handoffReceiverActionId ?? null, endTarget: action.endTarget ?? null,
});

const normalizeActions = (actions: z.infer<typeof actionSchema>[]): DiagramAction[] => {
  const normalized = actions.map(normalizeAction);
  const actionIds = new Set(normalized.map((action) => action.id));
  return normalized.map((action) => {
    const handoffActorSource = normalized.find((candidate) => candidate.id === action.handoffActorActionId);
    const handoffReceiverSource = normalized.find((candidate) => candidate.id === action.handoffReceiverActionId);
    const withHandoffSources = action.type === "handoff"
      ? { ...action, startAnchorActionId: null, handoffActorActionId: handoffActorSource && (handoffActorSource.type === "cut" || handoffActorSource.type === "dribble") ? handoffActorSource.id : null, handoffReceiverActionId: handoffReceiverSource && (handoffReceiverSource.type === "cut" || handoffReceiverSource.type === "dribble") ? handoffReceiverSource.id : null }
      : { ...action, handoffActorActionId: null, handoffReceiverActionId: null };
    if (withHandoffSources.startAnchorActionId && actionIds.has(withHandoffSources.startAnchorActionId)) return withHandoffSources;
    if (withHandoffSources.type === "handoff") return withHandoffSources;
    const source = normalized.find((candidate) => candidate.id !== action.id && (candidate.type === "cut" || candidate.type === "dribble" || candidate.type === "screen") && Math.hypot(candidate.end.x - withHandoffSources.start.x, candidate.end.y - withHandoffSources.start.y) <= 0.05);
    return source ? { ...withHandoffSources, actorId: withHandoffSources.actorId ?? source.actorId ?? null, startAnchorActionId: source.id } : { ...withHandoffSources, startAnchorActionId: null };
  });
};

export const parsePublicDiagram = (value: unknown, metadata: { title: string; description: string; descriptionDocument: unknown; tags: string[] }): DiagramState | null => {
  const result = documentSchema.safeParse(value);
  if (!result.success) return null;
  const phases = result.data.phases.map((phase): DiagramPhase => ({
    ...phase, players: phase.players, balls: phase.balls ?? [], ball: phase.ball ?? null,
    actions: normalizeActions(phase.actions), objects: phase.objects,
    notesDocument: phase.notesDocument as DiagramPhase["notesDocument"],
  }));
  return {
    schemaVersion: 1,
    metadata: { title: metadata.title, description: metadata.description, descriptionDocument: metadata.descriptionDocument as DiagramState["metadata"]["descriptionDocument"], tags: metadata.tags },
    court: result.data.court, phases, activePhaseId: phases[0]?.id ?? "",
  };
};
