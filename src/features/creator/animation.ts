import type { ActionShape, ActionType, DiagramAction, DiagramBall, DiagramPhase, DiagramState, Player, Point } from "./types";
import { orientHandoffForBallOwner } from "./handoff";
import { attachClosestLooseBallToPlayer, ballAttachDistance } from "./ballAttachment";

export type AnimationDuration = NonNullable<DiagramAction["animation"]>["duration"];
export type AnimationScope = "phase" | "all";
export type AnimationWarningLevel = "info" | "warning" | "error";

export type AnimationWarning = {
  level: AnimationWarningLevel;
  message: string;
};

export type AnimationStep = {
  id: string;
  phaseId: string;
  sourceActionId?: string;
  type: ActionType | "transition";
  label: string;
  detail: string;
  actorId?: string | null;
  receiverId?: string | null;
  ballId?: string | null;
  enabled: boolean;
  blocked: boolean;
  optional: boolean;
  simultaneousWithPrevious: boolean;
  duration: AnimationDuration;
  durationMs: number;
  pathLength: number;
  startMs: number;
  endMs: number;
  arrowStartMs: number;
  arrowEndMs: number;
  introStartMs?: number;
  introEndMs?: number;
  movementStartMs: number;
  movementEndMs: number;
  warnings: AnimationWarning[];
  movements?: Array<{ playerId: string; start: Point; end: Point; startAngle?: number; endAngle?: number }>;
};

export type AnimationSegment = {
  id: string;
  label: string;
  phase: DiagramPhase;
  steps: AnimationStep[];
  startMs: number;
  endMs: number;
};

export type AnimationTimeline = {
  scope: AnimationScope;
  elementScale: number;
  steps: AnimationStep[];
  segments: AnimationSegment[];
  totalMs: number;
  warnings: AnimationWarning[];
};

const defaultBallOffset: Point = { x: -0.35, y: 1.95 };
const movementActionTypes = new Set<ActionType>(["cut", "dribble", "screen"]);
const ballTravelActionTypes = new Set<ActionType>(["pass", "shot"]);
const defaultAnimationTimingScale = 1.4 * 1.3;
const scaleDefaultTiming = (durationMs: number) => Math.round(durationMs * defaultAnimationTimingScale);
const durationMultiplierByKey: Record<AnimationDuration, number> = {
  quick: 0.5,
  normal: 1,
  slow: 2,
};

const introHoldMs = 260;
const blankHoldMs = 60;
const referencePathLength = 20;
const normalMovementDurationMs = scaleDefaultTiming(1180);
const movementEaseDistance = 2;
const movementSpeedScale = 1.3 * 1.3 * 1.3;
const normalMovementSpeed = ((referencePathLength + 2 * movementEaseDistance) / (normalMovementDurationMs / 1000)) * movementSpeedScale;
const normalArrowDrawMs = scaleDefaultTiming(360);
const minimumArrowDrawMs = 220;
const maximumArrowDrawMs = 900;
const arrowHoldMs = 600;
const actionGapMs = 70;
const emptyPhaseHoldMs = 2000;
const phaseEndFrameHoldMs = (1000 / 45) * 3;
const getPathScaledDurationMs = (
  pathLength: number,
  duration: AnimationDuration,
  referenceDurationMs: number,
  minimumDurationMs: number,
  maximumDurationMs: number,
) => {
  if (pathLength < 0.001) return 0;
  const distanceScaledMs = referenceDurationMs * (pathLength / referencePathLength);
  const clampedMs = Math.min(maximumDurationMs, Math.max(minimumDurationMs, distanceScaledMs));
  return Math.round(clampedMs * durationMultiplierByKey[duration]);
};
const getMovementDurationMs = (pathLength: number, duration: AnimationDuration) => {
  if (pathLength < 0.001) return 0;
  const speed = normalMovementSpeed / durationMultiplierByKey[duration];
  const acceleration = (speed * speed) / (2 * movementEaseDistance);
  const durationSeconds = pathLength >= 2 * movementEaseDistance
    ? (pathLength + 2 * movementEaseDistance) / speed
    : 2 * Math.sqrt(pathLength / acceleration);
  return durationSeconds * 1000;
};
const getMovementProgressAtTime = (
  pathLength: number,
  duration: AnimationDuration,
  elapsedMs: number,
) => {
  if (pathLength < 0.001) return 1;
  const elapsedSeconds = Math.max(0, elapsedMs / 1000);
  const speed = normalMovementSpeed / durationMultiplierByKey[duration];
  const acceleration = (speed * speed) / (2 * movementEaseDistance);
  let distance = 0;

  if (pathLength >= 2 * movementEaseDistance) {
    const rampTime = speed / acceleration;
    const cruiseTime = (pathLength - 2 * movementEaseDistance) / speed;
    if (elapsedSeconds < rampTime) {
      distance = 0.5 * acceleration * elapsedSeconds * elapsedSeconds;
    } else if (elapsedSeconds < rampTime + cruiseTime) {
      distance = movementEaseDistance + speed * (elapsedSeconds - rampTime);
    } else {
      const decelerationTime = Math.min(rampTime, elapsedSeconds - rampTime - cruiseTime);
      distance = pathLength - movementEaseDistance
        + speed * decelerationTime
        - 0.5 * acceleration * decelerationTime * decelerationTime;
    }
  } else {
    const rampTime = Math.sqrt(pathLength / acceleration);
    const peakSpeed = acceleration * rampTime;
    if (elapsedSeconds < rampTime) {
      distance = 0.5 * acceleration * elapsedSeconds * elapsedSeconds;
    } else {
      const decelerationTime = Math.min(rampTime, elapsedSeconds - rampTime);
      distance = pathLength / 2
        + peakSpeed * decelerationTime
        - 0.5 * acceleration * decelerationTime * decelerationTime;
    }
  }

  return Math.min(1, Math.max(0, distance / pathLength));
};
const normalizeElementScale = (scale: number | undefined) =>
  Math.min(2, Math.max(0.4, Number.isFinite(scale ?? 1) ? scale ?? 1 : 1));

export const animationDurationOptions: Array<{ value: AnimationDuration; label: string }> = [
  { value: "quick", label: "2x" },
  { value: "normal", label: "1x" },
  { value: "slow", label: "0.5x" },
];

export const getActionAnimationDuration = (action: DiagramAction): AnimationDuration =>
  action.animation?.duration ?? "normal";

export const isActionAnimationEnabled = (action: DiagramAction) =>
  action.animation?.enabled !== false && action.optional !== true;

export const buildAnimationTimeline = (
  diagram: DiagramState,
  activePhaseId: string,
  scope: AnimationScope,
): AnimationTimeline => {
  const elementScale = normalizeElementScale(diagram.court.elementScale);
  const activePhase = diagram.phases.find((phase) => phase.id === activePhaseId) ?? diagram.phases[0];
  if (!activePhase) {
    return { scope, elementScale, steps: [], segments: [], totalMs: 0, warnings: [] };
  }

  if (scope === "phase") {
    const steps = schedulePhaseSteps(activePhase, 0, true);
    const stepsEndMs = getStepsEndMs(steps);
    const hasAnimation = steps.some((step) => (
      step.arrowEndMs > step.arrowStartMs || step.movementEndMs > step.movementStartMs
    ));
    const totalMs = hasAnimation ? stepsEndMs + phaseEndFrameHoldMs : stepsEndMs;
    const warnings = collectWarnings(steps);
    return {
      scope,
      elementScale,
      steps,
      segments: [{ id: activePhase.id, label: activePhase.title, phase: activePhase, steps, startMs: 0, endMs: totalMs }],
      totalMs,
      warnings,
    };
  }

  const segments: AnimationSegment[] = [];
  let cursor = 0;
  let previousCompletedPhase: DiagramPhase | null = null;

  diagram.phases.forEach((phase, index) => {
    if (previousCompletedPhase) {
      const transitionSteps = scheduleTransitionSteps(previousCompletedPhase, phase, cursor);
      if (transitionSteps.length > 0) {
        const transitionEnd = getStepsEndMs(transitionSteps);
        segments.push({
          id: `${previousCompletedPhase.id}-${phase.id}-transition`,
          label: `Set ${index + 1}`,
          phase: {
            ...phase,
            title: `Set ${index + 1}`,
            players: previousCompletedPhase.players,
            balls: getPhaseBalls(previousCompletedPhase),
            ball: null,
            actions: [],
          },
          steps: transitionSteps,
          startMs: cursor,
          endMs: transitionEnd,
        });
        cursor = transitionEnd;
      }
    }

    const steps = schedulePhaseSteps(phase, cursor, index === 0);
    const hasAnimation = steps.some((step) => (
      step.arrowEndMs > step.arrowStartMs || step.movementEndMs > step.movementStartMs
    ));
    const endMs = hasAnimation
      ? Math.max(cursor, getStepsEndMs(steps)) + phaseEndFrameHoldMs
      : cursor + emptyPhaseHoldMs;
    segments.push({
      id: phase.id,
      label: phase.title,
      phase,
      steps,
      startMs: cursor,
      endMs,
    });
    cursor = endMs;
    previousCompletedPhase = getAnimatedPhaseAt(phase, steps, Number.POSITIVE_INFINITY, elementScale);
  });

  const steps = segments.flatMap((segment) => segment.steps);
  return {
    scope,
    elementScale,
    steps,
    segments,
    totalMs: Math.max(0, cursor),
    warnings: collectWarnings(steps),
  };
};

export const getAnimationFramePhase = (timeline: AnimationTimeline, elapsedMs: number): DiagramPhase => {
  const segment = timeline.segments.find((item) => elapsedMs >= item.startMs && elapsedMs <= item.endMs)
    ?? timeline.segments[timeline.segments.length - 1];
  if (!segment) {
    return {
      id: "empty",
      title: "Animation",
      players: [],
      balls: [],
      ball: null,
      actions: [],
      objects: [],
      notes: "",
    };
  }

  return getAnimatedPhaseAt(segment.phase, segment.steps, elapsedMs, timeline.elementScale);
};

export const formatAnimationTime = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

export const getAnimationPlaybackStartMs = (timeline: AnimationTimeline) => {
  const firstStep = timeline.steps.find((step) => step.enabled && step.sourceActionId);
  return firstStep ? Math.max(0, firstStep.introStartMs ?? firstStep.startMs - blankHoldMs) : 0;
};

export const getFullDrillPlaybackContext = (
  diagram: DiagramState,
  timeline: AnimationTimeline,
  elapsedMs: number,
) => {
  const segment = [...timeline.segments]
    .reverse()
    .find((item) => elapsedMs >= item.startMs && elapsedMs <= item.endMs)
    ?? timeline.segments[timeline.segments.length - 1];
  const fallbackPhase = diagram.phases.find((phase) => phase.id === diagram.activePhaseId) ?? diagram.phases[0];
  const phaseId = diagram.phases.some((phase) => phase.id === segment?.phase.id)
    ? segment?.phase.id ?? fallbackPhase?.id ?? ""
    : fallbackPhase?.id ?? "";
  const phaseIndex = Math.max(0, diagram.phases.findIndex((phase) => phase.id === phaseId));
  const phaseTitle = diagram.phases[phaseIndex]?.title || `Phase ${phaseIndex + 1}`;
  const phaseSteps = timeline.steps.filter((step) => step.phaseId === phaseId && step.enabled && step.sourceActionId);
  const activeSteps = phaseSteps.filter((step) => elapsedMs >= step.arrowStartMs && elapsedMs <= step.movementEndMs);
  const nearestStep = activeSteps[0] ?? phaseSteps.reduce<AnimationStep | null>((nearest, step) => {
    if (!nearest) return step;
    const distance = getAnimationStepDistance(step, elapsedMs);
    return distance < getAnimationStepDistance(nearest, elapsedMs) ? step : nearest;
  }, null);
  const activeLabels = [...new Set(activeSteps.map((step) => step.label))];
  const actionLabel = activeLabels.length > 0
    ? activeLabels.length > 2
      ? `${activeLabels.slice(0, 2).join(" + ")} + ${activeLabels.length - 2}`
      : activeLabels.join(" + ")
    : "";

  return {
    phaseId,
    phaseIndex,
    phaseTitle,
    actionId: nearestStep?.sourceActionId ?? null,
    actionLabel,
  };
};

const getAnimationStepDistance = (step: AnimationStep, elapsedMs: number) => {
  if (elapsedMs < step.arrowStartMs) return step.arrowStartMs - elapsedMs;
  if (elapsedMs > step.movementEndMs) return elapsedMs - step.movementEndMs;
  return 0;
};

const schedulePhaseSteps = (phase: DiagramPhase, offsetMs: number, showIntro: boolean): AnimationStep[] => {
  const groups = groupPhaseActions(phase.actions);
  const steps: AnimationStep[] = [];
  const introStartMs = phase.actions.length > 0 && showIntro ? offsetMs : undefined;
  const introEndMs = introStartMs === undefined ? undefined : introStartMs + introHoldMs;
  let cursor = phase.actions.length > 0 ? offsetMs + (showIntro ? introHoldMs : 0) + blankHoldMs : offsetMs;
  let animationBalls = getPhaseBalls(phase).map(cloneBall);

  groups.forEach((group) => {
    const groupStartMs = cursor;
    let arrowCursor = groupStartMs;
    const claimedBallIds = new Set<string>();
    const scheduledGroup = group.map(({ action, index }) => {
      const duration = getActionAnimationDuration(action);
      const pathLength = getActionPathLength(action);
      const durationMs = getMovementDurationMs(pathLength, duration);
      const enabled = isActionAnimationEnabled(action);
      const simultaneousWithPrevious = Boolean(action.animation?.simultaneousWithPrevious && index > 0);
      let actorId = resolveActionActorId(action, phase.players);
      let receiverId = resolveActionReceiverId(action, phase.players, group.map((item) => item.action));
      if (action.type === "handoff") {
        const handoffBallOwnerId = findHandoffBallOwnerId(animationBalls, actorId, receiverId);
        ({ actorId, receiverId } = orientHandoffForBallOwner(
          { ...action, actorId, receiverId },
          handoffBallOwnerId,
        ));
      }
      const resolvedBallId = resolveActionBallId(action, animationBalls, actorId);
      const ballConflict = Boolean(resolvedBallId && claimedBallIds.has(resolvedBallId));
      const ballId = ballConflict ? null : resolvedBallId;
      if (ballId) claimedBallIds.add(ballId);
      const warnings = getActionWarnings(action, actorId, receiverId, ballId, ballConflict);
      const blocked = warnings.some((warning) => warning.level === "error");
      const arrowPlayable = !blocked;
      const movementPlayable = enabled && !blocked;
      const arrowStartMs = arrowPlayable ? arrowCursor : groupStartMs;
      const arrowDurationMs = getPathScaledDurationMs(
        pathLength,
        duration,
        normalArrowDrawMs,
        minimumArrowDrawMs,
        maximumArrowDrawMs,
      );
      const arrowEndMs = arrowPlayable ? arrowStartMs + arrowDurationMs : arrowStartMs;

      if (arrowPlayable) {
        arrowCursor = arrowEndMs;
      }

      return {
        action,
        duration,
        durationMs,
        pathLength,
        enabled,
        arrowPlayable,
        movementPlayable,
        blocked,
        simultaneousWithPrevious,
        actorId,
        receiverId,
        ballId,
        warnings,
        arrowStartMs,
        arrowEndMs,
      };
    });
    const groupMovementStartMs = scheduledGroup.some((item) => item.arrowPlayable)
      ? Math.max(...scheduledGroup.filter((item) => item.arrowPlayable).map((item) => item.arrowEndMs)) + arrowHoldMs
      : groupStartMs;
    const groupEndMs = scheduledGroup.reduce(
      (end, item) => Math.max(end, item.arrowPlayable ? groupMovementStartMs + (item.movementPlayable ? item.durationMs : 0) : groupStartMs),
      groupStartMs,
    );

    scheduledGroup.forEach((item) => {
      const movementStartMs = item.arrowPlayable ? groupMovementStartMs : groupStartMs;
      const movementEndMs = item.movementPlayable ? movementStartMs + item.durationMs : movementStartMs;
      steps.push({
        id: `step-${item.action.id}`,
        phaseId: phase.id,
        sourceActionId: item.action.id,
        type: item.action.type,
        label: getActionLabel(item.action, phase.players, item.actorId, item.receiverId),
        detail: getActionDetail(item.action),
        actorId: item.actorId,
        receiverId: item.receiverId,
        ballId: item.ballId,
        enabled: item.arrowPlayable,
        blocked: item.blocked,
        optional: !item.enabled,
        simultaneousWithPrevious: item.simultaneousWithPrevious,
        duration: item.duration,
        durationMs: item.durationMs,
        pathLength: item.pathLength,
        startMs: item.arrowStartMs,
        endMs: movementEndMs,
        arrowStartMs: item.arrowStartMs,
        arrowEndMs: item.arrowEndMs,
        introStartMs,
        introEndMs,
        movementStartMs,
        movementEndMs,
        warnings: item.warnings,
      });
    });

    scheduledGroup
      .filter((item) => item.movementPlayable)
      .forEach((item) => {
        if ((item.action.type === "pass" || item.action.type === "handoff") && item.receiverId && item.ballId) {
          animationBalls = attachBallToPlayer(animationBalls, item.ballId, item.receiverId);
        }
        if (item.action.type === "pass" && !item.receiverId && item.ballId) {
          animationBalls = setBallPosition(animationBalls, item.ballId, item.action.end);
        }
        if (item.action.type === "dribble" && item.actorId && item.ballId) {
          animationBalls = attachBallToPlayer(animationBalls, item.ballId, item.actorId);
        }
        if (movementActionTypes.has(item.action.type) && item.action.type !== "dribble" && item.actorId) {
          animationBalls = attachLooseBallNearPoint(animationBalls, item.action.end, item.actorId);
        }
        if (item.action.type === "shot" && item.ballId) {
          animationBalls = setBallPosition(animationBalls, item.ballId, item.action.end);
        }
      });

    cursor = groupEndMs + actionGapMs;
  });

  return steps;
};

const groupPhaseActions = (actions: DiagramAction[]) =>
  actions.reduce<Array<Array<{ action: DiagramAction; index: number }>>>((groups, action, index) => {
    const simultaneousWithPrevious = Boolean(action.animation?.simultaneousWithPrevious && index > 0);
    if (!simultaneousWithPrevious || groups.length === 0) {
      groups.push([{ action, index }]);
    } else {
      groups[groups.length - 1].push({ action, index });
    }
    return groups;
  }, []);

const scheduleTransitionSteps = (from: DiagramPhase, to: DiagramPhase, offsetMs: number): AnimationStep[] => {
  const toPlayersById = new Map(to.players.map((player) => [player.id, player]));
  const movements = from.players
    .map((player) => {
      const target = toPlayersById.get(player.id);
      if (!target) return null;
      const stanceRotationChanged = player.kind === "defense-stance"
        && target.kind === "defense-stance"
        && angleDistance(player.angle ?? 0, target.angle ?? 0) >= 0.5;
      if (pointDistance(player, target) < 0.05 && !stanceRotationChanged) return null;
      return {
        playerId: player.id,
        start: { x: player.x, y: player.y },
        end: { x: target.x, y: target.y },
        startAngle: stanceRotationChanged ? player.angle ?? 0 : undefined,
        endAngle: stanceRotationChanged ? target.angle ?? 0 : undefined,
      };
    })
    .filter((movement): movement is NonNullable<typeof movement> => Boolean(movement));

  if (movements.length === 0) return [];
  const duration = "quick" as const;
  const transitionPathLength = Math.max(
    ...movements.map((movement) => pointDistance(movement.start, movement.end)),
  );
  const pathLength = transitionPathLength < 0.001 ? referencePathLength : transitionPathLength;
  const movementDurationMs = getMovementDurationMs(pathLength, duration);

  return [{
    id: `transition-${from.id}-${to.id}`,
    phaseId: to.id,
    type: "transition",
    label: "Phase setup movement",
    detail: `${movements.length} player${movements.length === 1 ? "" : "s"} repositioned`,
    enabled: true,
    blocked: false,
    optional: false,
    simultaneousWithPrevious: false,
    duration,
    durationMs: movementDurationMs,
    pathLength,
    startMs: offsetMs,
    endMs: offsetMs + movementDurationMs,
    arrowStartMs: offsetMs,
    arrowEndMs: offsetMs,
    movementStartMs: offsetMs,
    movementEndMs: offsetMs + movementDurationMs,
    warnings: [{
      level: "info",
      message: "Players moved between phases without arrows are animated as setup movement in Play All.",
    }],
    movements,
  }];
};

const getAnimatedPhaseAt = (phase: DiagramPhase, steps: AnimationStep[], elapsedMs: number, ballOffsetScale = 1): DiagramPhase => {
  const players = phase.players.map((player) => ({ ...player }));
  let balls = getPhaseBalls(phase).map(cloneBall);
  const visibleActionIds = new Set<string>();
  const activeBallTransitIds = new Set(steps
    .filter((step) => (
      step.enabled
      && !step.optional
      && (step.type === "pass" || step.type === "shot" || step.type === "handoff")
      && elapsedMs >= step.movementStartMs
      && elapsedMs < step.movementEndMs
    ))
    .map((step) => step.ballId)
    .filter((ballId): ballId is string => Boolean(ballId)));
  const showIntroActions = steps.some((step) => step.sourceActionId)
    && steps.some((step) =>
      step.introStartMs !== undefined &&
      step.introEndMs !== undefined &&
      elapsedMs >= step.introStartMs &&
      elapsedMs < step.introEndMs,
    );

  steps
    .filter((step) => step.enabled)
    .sort((a, b) => a.movementStartMs - b.movementStartMs)
    .forEach((step) => {
      if (step.type === "transition") {
        const t = getStepProgress(step, elapsedMs);
        if (t <= 0) return;
        step.movements?.forEach((movement) => {
          movePlayer(
            players,
            movement.playerId,
            interpolatePoint(movement.start, movement.end, t),
            movement.startAngle !== undefined && movement.endAngle !== undefined
              ? interpolateAngle(movement.startAngle, movement.endAngle, t)
              : undefined,
          );
        });
        balls = balls.map((ball) => syncAttachedBall(ball, players));
        return;
      }

      const action = step.sourceActionId ? phase.actions.find((item) => item.id === step.sourceActionId) : null;
      if (!action) return;
      const arrowProgress = getArrowProgress(step, elapsedMs);
      if (arrowProgress > 0 && elapsedMs < step.movementStartMs) {
        visibleActionIds.add(action.id);
      }

      const t = getStepMovementProgress(step, elapsedMs);
      if (t <= 0) return;
      if (step.optional) return;

      const actorId = step.actorId ?? null;
      const receiverId = step.receiverId ?? null;
      if (movementActionTypes.has(action.type) && actorId) {
        movePlayer(players, actorId, getActionPointAtProgress(action, t));
        balls = balls.map((ball) => syncAttachedBall(ball, players));
        if (t >= 1) {
          balls = attachLooseBallNearPlayer(balls, players, actorId, activeBallTransitIds);
        }
      }

      if (ballTravelActionTypes.has(action.type) && step.ballId) {
        balls = setBallPosition(
          balls,
          step.ballId,
          getBallTravelPoint(action, t, balls, players, receiverId, step.ballId, ballOffsetScale),
        );
        if (t >= 1 && action.type === "pass" && receiverId) {
          balls = attachBallToPlayer(balls, step.ballId, receiverId);
        }
      }

      if (action.type === "dribble" && actorId && step.ballId) {
        balls = attachBallToPlayer(balls, step.ballId, actorId);
      }

      if (action.type === "handoff" && actorId && receiverId && step.ballId) {
        const actor = players.find((player) => player.id === actorId);
        const receiver = players.find((player) => player.id === receiverId);
        if (actor && receiver) {
          const actorBallPoint = getPlayerBallPoint(players, actorId, ballOffsetScale) ?? actor;
          const receiverBallPoint = getPlayerBallPoint(players, receiverId, ballOffsetScale) ?? receiver;
          balls = setBallPosition(balls, step.ballId, interpolatePoint(actorBallPoint, receiverBallPoint, t));
          if (t >= 1) balls = attachBallToPlayer(balls, step.ballId, receiverId);
        }
      }
    });

  return {
    ...phase,
    players,
    balls,
    ball: null,
    actions: showIntroActions
      ? phase.actions
      : phase.actions
        .filter((action) => visibleActionIds.has(action.id))
        .map((action) => {
          const step = steps.find((item) => item.sourceActionId === action.id);
          return {
            ...action,
            animationPreview: {
              pathProgress: step ? getArrowProgress(step, elapsedMs) : 1,
            },
          };
        }),
  };
};

const getStepProgress = (step: AnimationStep, elapsedMs: number) => {
  if (elapsedMs < step.movementStartMs) return 0;
  if (step.durationMs <= 0 || elapsedMs >= step.movementEndMs) return 1;
  return getMovementProgressAtTime(step.pathLength, step.duration, elapsedMs - step.movementStartMs);
};

const getStepMovementProgress = getStepProgress;

const getArrowProgress = (step: AnimationStep, elapsedMs: number) => {
  if (step.type === "transition") return 0;
  if (elapsedMs < step.arrowStartMs) return 0;
  if (elapsedMs >= step.arrowEndMs) return 1;
  return easeOutCubic(Math.min(1, Math.max(0, (elapsedMs - step.arrowStartMs) / Math.max(1, step.arrowEndMs - step.arrowStartMs))));
};

const getActionWarnings = (
  action: DiagramAction,
  actorId: string | null,
  receiverId: string | null,
  ballId: string | null,
  ballConflict: boolean,
): AnimationWarning[] => {
  const warnings: AnimationWarning[] = [];

  if ((action.type === "pass" || action.type === "shot") && !actorId) {
    warnings.push({ level: "error", message: "No player is attached to the start of this action." });
  }

  if ((action.type === "pass" || action.type === "shot" || action.type === "dribble") && actorId && !ballId) {
    warnings.push({
      level: action.type === "dribble" ? "error" : "warning",
      message: action.type === "dribble"
        ? "Dribbling needs the ball at the start."
        : "The player does not have the ball at the start.",
    });
  }

  if (ballConflict) {
    warnings.push({ level: "error", message: "This ball is already used by another simultaneous action." });
  }

  if (action.type === "pass" && !receiverId) {
    warnings.push({ level: "warning", message: "Pass has no receiver. The ball will finish loose." });
  }

  if (action.type === "handoff" && (!actorId || !receiverId)) {
    warnings.push({ level: "warning", message: "Handoff needs two nearby players." });
  } else if (action.type === "handoff" && !ballId) {
    warnings.push({ level: "warning", message: "Handoff needs one participant to have the ball." });
  }

  return warnings;
};

const getActionLabel = (action: DiagramAction, players: Player[], actorId: string | null, receiverId: string | null) => {
  const actor = actorId ? players.find((player) => player.id === actorId) : null;
  const receiver = receiverId ? players.find((player) => player.id === receiverId) : null;
  const actorLabel = actor ? getPlayerLabel(actor) : "Player";
  const receiverLabel = receiver ? getPlayerLabel(receiver) : "target";

  if (action.type === "pass") return `${actorLabel} passes to ${receiverLabel}`;
  if (action.type === "cut") return `${actorLabel} cuts`;
  if (action.type === "dribble") return `${actorLabel} dribbles`;
  if (action.type === "screen") return `${actorLabel} screens`;
  if (action.type === "shot") return `${actorLabel} shoots`;
  if (action.type === "handoff") return `${actorLabel} hands off to ${receiverLabel}`;
  return "Action";
};

const getActionDetail = (action: DiagramAction) => {
  if (action.shape === "curved") return "Curved path";
  if (action.shape === "zigzag") return "Zigzag path";
  if (action.shape === "custom") return "Custom path";
  return "Straight path";
};

const getPlayerLabel = (player: Player) => `${player.kind === "offense" ? "" : "X"}${player.number}`;

const resolveActionActorId = (action: DiagramAction, players: Player[]) => {
  if (action.actorId && players.some((player) => player.id === action.actorId)) return action.actorId;
  return findNearestPlayerWithin(players, action.start, ballAttachDistance)?.id ?? null;
};

const findHandoffBallOwnerId = (
  balls: DiagramBall[],
  actorId: string | null,
  receiverId: string | null,
) => [actorId, receiverId].find((playerId) => (
  playerId && balls.some((ball) => ball.mode === "attached" && ball.playerId === playerId)
)) ?? null;

const resolveActionBallId = (
  action: DiagramAction,
  balls: DiagramBall[],
  actorId: string | null,
) => {
  if (action.type !== "pass" && action.type !== "shot" && action.type !== "dribble" && action.type !== "handoff") {
    return null;
  }

  const attachedBall = actorId
    ? balls.find((ball) => ball.mode === "attached" && ball.playerId === actorId)
    : null;
  if (attachedBall) return attachedBall.id;

  return balls
    .filter((ball): ball is Extract<DiagramBall, { mode: "loose" }> => ball.mode === "loose")
    .map((ball) => ({ ball, distance: pointDistance(ball, action.start) }))
    .filter(({ distance }) => distance <= ballAttachDistance)
    .sort((a, b) => a.distance - b.distance)[0]?.ball.id ?? null;
};

const resolveActionReceiverId = (action: DiagramAction, players: Player[], simultaneousActions: DiagramAction[] = []) => {
  if (action.receiverId && players.some((player) => player.id === action.receiverId)) return action.receiverId;
  if (action.type !== "pass" && action.type !== "handoff") return null;
  const stationaryReceiver = findNearestPlayerWithin(players, action.end, ballAttachDistance)?.id ?? null;
  if (stationaryReceiver) return stationaryReceiver;
  if (action.type !== "pass") return null;

  return simultaneousActions
    .filter((item) => item.id !== action.id && movementActionTypes.has(item.type))
    .map((item) => ({
      action: item,
      actorId: resolveActionActorId(item, players),
      distance: pointDistance(item.end, action.end),
    }))
    .filter((item) => item.actorId && item.distance <= ballAttachDistance)
    .sort((a, b) => a.distance - b.distance)[0]?.actorId ?? null;
};

const findNearestPlayerWithin = (players: Player[], point: Point, maxDistance: number) =>
  players.reduce<{ player: Player; distance: number } | null>((nearest, player) => {
    const distance = pointDistance(player, point);
    if (distance > maxDistance) return nearest;
    if (!nearest || distance < nearest.distance) return { player, distance };
    return nearest;
  }, null)?.player ?? null;

const getPhaseBalls = (phase: DiagramPhase): DiagramBall[] =>
  phase.balls?.length ? phase.balls : phase.ball ? [phase.ball] : [];

const getBallPoint = (ball: DiagramBall, players: Player[], offsetScale = 1): Point | null => {
  if (ball.mode === "loose") return { x: ball.x, y: ball.y };
  const player = players.find((item) => item.id === ball.playerId);
  if (!player) return null;
  const offset = ball.offset ?? defaultBallOffset;
  return { x: player.x + offset.x * offsetScale, y: player.y + offset.y * offsetScale };
};

const cloneBall = (ball: DiagramBall): DiagramBall =>
  ball.mode === "attached"
    ? { ...ball, offset: ball.offset ? { ...ball.offset } : undefined }
    : { ...ball };

const syncAttachedBall = (ball: DiagramBall, players: Player[]): DiagramBall => {
  if (ball.mode === "loose") return ball;
  return players.some((player) => player.id === ball.playerId) ? ball : { ...ball, mode: "loose", x: 0, y: 0 };
};

const setBallPosition = (balls: DiagramBall[], ballId: string, point: Point): DiagramBall[] =>
  balls.map((ball) => ball.id === ballId ? { id: ball.id, mode: "loose", ...point } : ball);

const attachBallToPlayer = (balls: DiagramBall[], ballId: string, playerId: string): DiagramBall[] =>
  balls.map((ball) => ball.id === ballId
    ? { id: ball.id, mode: "attached", playerId, offset: defaultBallOffset }
    : ball);

const attachLooseBallNearPoint = (
  balls: DiagramBall[],
  point: Point,
  playerId: string,
  excludedBallIds: ReadonlySet<string> = new Set(),
) => attachClosestLooseBallToPlayer(balls, point, playerId, defaultBallOffset, excludedBallIds);

const attachLooseBallNearPlayer = (
  balls: DiagramBall[],
  players: Player[],
  playerId: string,
  excludedBallIds: ReadonlySet<string> = new Set(),
): DiagramBall[] => {
  const player = players.find((item) => item.id === playerId);
  if (!player) return balls;
  return attachLooseBallNearPoint(balls, player, playerId, excludedBallIds);
};

const movePlayer = (players: Player[], playerId: string, point: Point, angle?: number) => {
  const player = players.find((item) => item.id === playerId);
  if (!player) return;
  player.x = point.x;
  player.y = point.y;
  if (angle !== undefined) player.angle = angle;
};

const angleDistance = (from: number, to: number) =>
  Math.abs((((to - from) % 360) + 540) % 360 - 180);

const interpolateAngle = (from: number, to: number, progress: number) => {
  const delta = (((to - from) % 360) + 540) % 360 - 180;
  return ((from + delta * progress) % 360 + 360) % 360;
};

const getActionPointAtProgress = (action: DiagramAction, progress: number): Point => {
  const points = getActionPolyline(action);
  const totalLength = getPolylineLength(points);
  if (totalLength < 0.001) return action.end;
  return getPointAtPolylineDistance(points, totalLength * progress);
};

const getBallTravelPoint = (
  action: DiagramAction,
  progress: number,
  balls: DiagramBall[],
  players: Player[],
  receiverId: string | null,
  ballId: string,
  ballOffsetScale = 1,
): Point => {
  const points = getActionPolyline(action);
  if (points.length === 0) return action.end;
  const route = [...points];
  const currentBall = balls.find((ball) => ball.id === ballId);
  const currentBallPoint = currentBall ? getBallPoint(currentBall, players, ballOffsetScale) : null;
  const receiver = receiverId && action.type === "pass" ? players.find((player) => player.id === receiverId) : null;
  const receiverBallPoint = receiver && pointDistance(receiver, action.end) <= ballAttachDistance
    ? getPlayerBallPoint(players, receiver.id, ballOffsetScale)
    : null;
  if (currentBallPoint) route[0] = currentBallPoint;
  if (receiverBallPoint) route[route.length - 1] = receiverBallPoint;

  const totalLength = getPolylineLength(route);
  if (totalLength < 0.001) return route[route.length - 1] ?? action.end;
  return getPointAtPolylineDistance(route, totalLength * progress);
};

const getPlayerBallPoint = (players: Player[], playerId: string, ballOffsetScale = 1): Point | null => {
  const player = players.find((item) => item.id === playerId);
  if (!player) return null;
  return {
    x: player.x + defaultBallOffset.x * ballOffsetScale,
    y: player.y + defaultBallOffset.y * ballOffsetScale,
  };
};

const getActionPolyline = (action: DiagramAction) => {
  const shape = getAnimationShape(action);
  return sampleActionPoints(
    action.start,
    action.control ?? getMidpoint(action.start, action.end),
    action.end,
    shape,
    shape === "straight" ? 2 : 96,
    action.controlStart,
    action.controlEnd,
  );
};

const getActionPathLength = (action: DiagramAction) => getPolylineLength(getActionPolyline(action));

const getAnimationShape = (action: DiagramAction): ActionShape =>
  action.type === "shot" ? "straight" : action.shape ?? "straight";

const sampleActionPoints = (
  start: Point,
  control: Point,
  end: Point,
  shape: ActionShape,
  samples = 24,
  controlStart?: Point,
  controlEnd?: Point,
) => {
  if (shape === "custom") {
    return sampleCatmullRomPoints(getCustomActionPoints(start, control, end, controlStart, controlEnd), samples);
  }

  return Array.from({ length: samples }, (_, index) => {
    const t = index / Math.max(1, samples - 1);
    if (shape === "straight") return interpolatePoint(start, end, t);
    if (shape === "zigzag") {
      if (t <= 0.5) return interpolatePoint(start, control, t * 2);
      return interpolatePoint(control, end, (t - 0.5) * 2);
    }

    const bezierControl = getQuadraticControlFromMidpoint(start, control, end);
    const inv = 1 - t;
    return {
      x: inv * inv * start.x + 2 * inv * t * bezierControl.x + t * t * end.x,
      y: inv * inv * start.y + 2 * inv * t * bezierControl.y + t * t * end.y,
    };
  });
};

const sampleCatmullRomPoints = (points: Point[], samples: number) =>
  Array.from({ length: samples }, (_, sampleIndex) => {
    const globalT = sampleIndex / Math.max(1, samples - 1);
    const scaled = globalT * (points.length - 1);
    const segment = Math.min(points.length - 2, Math.floor(scaled));
    const t = scaled - segment;
    const p0 = points[Math.max(0, segment - 1)];
    const p1 = points[segment];
    const p2 = points[segment + 1];
    const p3 = points[Math.min(points.length - 1, segment + 2)];
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    };
  });

const getCustomActionPoints = (start: Point, control: Point, end: Point, controlStart?: Point, controlEnd?: Point) => [
  start,
  controlStart ?? getMidpoint(start, control),
  control,
  controlEnd ?? getMidpoint(control, end),
  end,
];

const getPolylineLength = (points: Point[]) =>
  points.reduce((length, point, index) => {
    if (index === 0) return 0;
    const previous = points[index - 1];
    return length + pointDistance(previous, point);
  }, 0);

const getPointAtPolylineDistance = (points: Point[], distance: number): Point => {
  let traversed = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const next = points[index];
    const segmentLength = pointDistance(previous, next);
    if (segmentLength < 0.001) continue;

    if (traversed + segmentLength >= distance || index === points.length - 1) {
      return interpolatePoint(previous, next, Math.min(1, Math.max(0, (distance - traversed) / segmentLength)));
    }

    traversed += segmentLength;
  }

  return points[points.length - 1] ?? { x: 0, y: 0 };
};

const getMidpoint = (start: Point, end: Point): Point => ({
  x: (start.x + end.x) / 2,
  y: (start.y + end.y) / 2,
});

const getQuadraticControlFromMidpoint = (start: Point, midpoint: Point, end: Point): Point => ({
  x: 2 * midpoint.x - (start.x + end.x) / 2,
  y: 2 * midpoint.y - (start.y + end.y) / 2,
});

const easeOutCubic = (t: number) =>
  1 - ((1 - t) ** 3);

const interpolatePoint = (start: Point, end: Point, t: number): Point => ({
  x: start.x + (end.x - start.x) * t,
  y: start.y + (end.y - start.y) * t,
});

const pointDistance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const getStepsEndMs = (steps: AnimationStep[]) =>
  steps.reduce((max, step) => Math.max(max, step.endMs), 0);

const collectWarnings = (steps: AnimationStep[]) =>
  steps.flatMap((step) => step.warnings);
