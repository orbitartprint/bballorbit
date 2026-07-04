import type { DiagramAction, Player, Point } from "./types";

export const handoffSnapDistance = 4.35;

export type HandoffParticipant = {
  playerId: string;
  sourceActionId: string | null;
  distance: number;
};

type HandoffParticipantContext = {
  players: Player[];
  actions: DiagramAction[];
  resolveActionPlayerId: (action: DiagramAction, players: Player[]) => string | null;
};

const handoffEndpointActionTypes = new Set(["cut", "dribble"]);

const getHandoffPoint = (action: DiagramAction): Point => action.control ?? {
  x: (action.start.x + action.end.x) / 2,
  y: (action.start.y + action.end.y) / 2,
};

export const getHandoffParticipants = (
  action: DiagramAction,
  context: HandoffParticipantContext,
): HandoffParticipant[] => {
  if (action.type !== "handoff") return [];
  const point = getHandoffPoint(action);
  const byPlayerId = new Map<string, HandoffParticipant>();

  const addCandidate = (candidate: HandoffParticipant) => {
    if (candidate.distance > handoffSnapDistance) return;
    const existing = byPlayerId.get(candidate.playerId);
    if (
      !existing ||
      candidate.distance < existing.distance ||
      (candidate.distance === existing.distance && candidate.sourceActionId && !existing.sourceActionId)
    ) {
      byPlayerId.set(candidate.playerId, candidate);
    }
  };

  context.players.forEach((player) => {
    addCandidate({
      playerId: player.id,
      sourceActionId: null,
      distance: Math.hypot(player.x - point.x, player.y - point.y),
    });
  });

  context.actions.forEach((candidateAction) => {
    if (candidateAction.id === action.id || !handoffEndpointActionTypes.has(candidateAction.type)) return;
    const playerId = context.resolveActionPlayerId(candidateAction, context.players);
    if (!playerId) return;
    addCandidate({
      playerId,
      sourceActionId: candidateAction.id,
      distance: Math.hypot(candidateAction.end.x - point.x, candidateAction.end.y - point.y),
    });
  });

  return Array.from(byPlayerId.values())
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
};

export const applyHandoffParticipants = (
  action: DiagramAction,
  participants: HandoffParticipant[],
): DiagramAction => {
  if (action.type !== "handoff") {
    return {
      ...action,
      handoffActorActionId: null,
      handoffReceiverActionId: null,
    };
  }

  return {
    ...action,
    actorId: participants[0]?.playerId ?? null,
    handoffActorActionId: participants[0]?.sourceActionId ?? null,
    receiverId: participants[1]?.playerId ?? null,
    handoffReceiverActionId: participants[1]?.sourceActionId ?? null,
    endTarget: null,
  };
};

export const getHandoffTransferredPlayerId = (
  action: DiagramAction,
  currentOwnerId: string | null,
): string | null => {
  if (action.type !== "handoff" || !action.actorId || !action.receiverId) return currentOwnerId;
  if (currentOwnerId === action.actorId) return action.receiverId;
  if (currentOwnerId === action.receiverId) return action.actorId;
  return currentOwnerId;
};

export const orientHandoffForBallOwner = (
  action: DiagramAction,
  currentOwnerId: string | null,
): { actorId: string | null; receiverId: string | null } => {
  const actorId = action.actorId ?? null;
  const receiverId = action.receiverId ?? null;
  if (action.type === "handoff" && currentOwnerId && currentOwnerId === receiverId && currentOwnerId !== actorId) {
    return { actorId: receiverId, receiverId: actorId };
  }
  return { actorId, receiverId };
};

