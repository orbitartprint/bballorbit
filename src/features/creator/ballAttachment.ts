import type { DiagramBall, Point } from "./types";

export const ballAttachDistance = 2.6;

export const attachClosestLooseBallToPlayer = (
  balls: DiagramBall[],
  point: Point,
  playerId: string,
  offset: Point,
  excludedBallIds: ReadonlySet<string> = new Set(),
): DiagramBall[] => {
  const looseBall = balls
    .filter((ball): ball is Extract<DiagramBall, { mode: "loose" }> => (
      ball.mode === "loose" && !excludedBallIds.has(ball.id)
    ))
    .map((ball) => ({ ball, distance: Math.hypot(ball.x - point.x, ball.y - point.y) }))
    .filter(({ distance }) => distance <= ballAttachDistance)
    .sort((a, b) => a.distance - b.distance)[0]?.ball;

  return looseBall
    ? balls.map((ball) => ball.id === looseBall.id
      ? { id: ball.id, mode: "attached" as const, playerId, offset }
      : ball)
    : balls;
};

