/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useRef, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { ActionPointRole, ActionShape as DiagramActionShape, ActionType, DiagramAction, DiagramBall, DiagramPhase, Player, Point, Selection, SelectionItem } from "../types";
import { buildArcPath, getCourtView } from "./courtGeometry";
import type { CourtSize, CourtTemplate, CourtTheme } from "../types";

type CourtSvgProps = {
  template: CourtTemplate;
  size: CourtSize;
  theme: CourtTheme;
  showGrid: boolean;
  margin?: number;
  elementScale?: number;
  phase: DiagramPhase;
  selection: Selection;
  rubberBand?: { start: Point; current: Point } | null;
  draftActionStart: Point | null;
  activeActionType?: ActionType | null;
  editingPlayerId?: string | null;
  editingPlayerValue?: string;
  editingTextObjectId?: string | null;
  editingTextValue?: string;
  editingTextCursorIndex?: number;
  editingTextSelection?: TextSelectionRange | null;
  snapPreviewPlayerIds?: string[];
  fillViewportBackground?: boolean;
  interactive?: boolean;
  className?: string;
  onCourtPointerDown: (point: Point, event: PointerEvent<SVGSVGElement>) => void;
  onEntityPointerDown: (selection: SelectionItem, point: Point, event: PointerEvent<SVGElement>) => void;
  onActionPointPointerDown?: (actionId: string, role: ActionPointRole, point: Point, event: PointerEvent<SVGElement>) => void;
  onPlayerRotationPointerDown?: (playerId: string, point: Point, event: PointerEvent<SVGElement>) => void;
  onPlayerDoubleClick?: (playerId: string, currentNumber: string) => void;
  onTextDoubleClick?: (objectId: string, currentText: string, cursorIndex: number, selectionRange?: TextSelectionRange | null) => void;
  onTextPointerDown?: (objectId: string, currentText: string, cursorIndex: number) => void;
  onTextSelectionChange?: (objectId: string, start: number, end: number) => void;
  onPointerMove: (point: Point, event: PointerEvent<SVGSVGElement>) => void;
  onPointerUp: (event: PointerEvent<SVGSVGElement>) => void;
};

type TextSelectionRange = {
  start: number;
  end: number;
};

type TextSelectionDragState = {
  objectId: string;
  anchorIndex: number;
  pointerId: number;
};

const actionColors: Record<ActionType, string> = {
  pass: "#111111",
  cut: "#111111",
  dribble: "#111111",
  screen: "#111111",
  shot: "#111111",
  handoff: "#111111",
};

const attachableActionTypes = new Set<ActionType>(["pass", "cut", "dribble", "screen", "shot"]);
const defaultBallOffset: Point = { x: -0.35, y: 1.95 };
const playerActionVisualGap = 1.55;

export const courtThemeStyles: Record<CourtTheme, { background: string; fill: string; line: string; mutedLine: string }> = {
  clean: {
    background: "#f8fafc",
    fill: "#f8fafc",
    line: "#334155",
    mutedLine: "#94a3b8",
  },
  wood: {
    background: "#dec38e",
    fill: "#dec38e",
    line: "#fff8eb",
    mutedLine: "#fff8eb99",
  },
  hardwood: {
    background: "#ecd19a",
    fill: "url(#creator-hardwood)",
    line: "#fff8eb",
    mutedLine: "#fff8eb99",
  },
  gray: {
    background: "#e5e7eb",
    fill: "#e5e7eb",
    line: "#475569",
    mutedLine: "#94a3b8",
  },
  "gray-wood": {
    background: "#e5e7eb",
    fill: "url(#creator-gray-wood)",
    line: "#f8fafc",
    mutedLine: "#f8fafc99",
  },
};

export const getCourtThemeStyle = (theme: CourtTheme) => courtThemeStyles[theme] ?? courtThemeStyles.clean;

const clampElementScale = (scale: number | undefined) =>
  Math.min(2, Math.max(0.4, typeof scale === "number" && Number.isFinite(scale) ? scale : 1));

const scaleTransform = (point: Point, scale: number) =>
  scale === 1 ? undefined : `translate(${point.x} ${point.y}) scale(${scale}) translate(${-point.x} ${-point.y})`;

const getPlayerMarkerColor = (player: Player) =>
  player.color ?? (player.kind === "offense" ? "#111111" : "#dc2626");

const getActionRenderColor = (action: DiagramAction, players: Player[]) => {
  const actor = action.actorId ? players.find((player) => player.id === action.actorId) : null;
  return action.color ?? (actor ? getPlayerMarkerColor(actor) : actionColors[action.type]);
};

const sortPlayersForLayering = (first: Player, second: Player) => {
  if (first.kind === second.kind) return 0;
  if (first.kind === "offense") return -1;
  if (second.kind === "offense") return 1;
  return first.kind === "defense-stance" ? 1 : -1;
};

const getBallPoint = (ball: DiagramBall | null | undefined, players: Player[], offsetScale = 1): Point | null => {
  if (!ball) return null;
  if (ball.mode === "loose") return { x: ball.x, y: ball.y };
  const player = players.find((item) => item.id === ball.playerId);
  if (!player) return null;
  const offset = ball.offset ?? defaultBallOffset;
  return { x: player.x + offset.x * offsetScale, y: player.y + offset.y * offsetScale };
};

const getPhaseBalls = (phase: DiagramPhase): DiagramBall[] =>
  phase.balls?.length ? phase.balls : phase.ball ? [phase.ball] : [];

export const CourtSvg = forwardRef<SVGSVGElement, CourtSvgProps>(
  (
    {
      template,
      size,
      theme,
      showGrid,
      margin,
      elementScale,
      phase,
      selection,
      rubberBand,
      draftActionStart,
      activeActionType,
      editingPlayerId,
      editingPlayerValue = "",
      editingTextObjectId,
      editingTextValue = "",
      editingTextCursorIndex = 0,
      editingTextSelection = null,
      snapPreviewPlayerIds = [],
      fillViewportBackground = false,
      interactive = true,
      className,
      onCourtPointerDown,
      onEntityPointerDown,
      onActionPointPointerDown,
      onPlayerRotationPointerDown,
      onPlayerDoubleClick,
      onTextDoubleClick,
      onTextPointerDown,
      onTextSelectionChange,
      onPointerMove,
      onPointerUp,
    },
    ref,
  ) => {
    const textSelectionDragRef = useRef<TextSelectionDragState | null>(null);
    const displaySelection = interactive ? selection : null;
    const view = getCourtView(template, size, margin);
    const visualScale = clampElementScale(elementScale);
    const themeStyle = getCourtThemeStyle(theme);
    const lineColor = themeStyle.line;
    const mutedLineColor = themeStyle.mutedLine;
    const background = themeStyle.background;
    const verticalCourt = size !== "full-horizontal";
    const sizeLabel = size === "half" ? "half" : size === "full-horizontal" ? "full horizontal" : "full vertical";
    const displayBottomMargin = size === "half" ? 0.18 : view.margin;
    const displayFrame = verticalCourt
      ? {
          x: -view.margin,
          y: -view.margin,
          width: view.width + view.margin * 2,
          height: view.length + view.margin + displayBottomMargin,
        }
      : {
          x: -view.margin,
          y: -(view.width / 2) - view.margin,
          width: view.length + view.margin * 2,
          height: view.width + view.margin * 2,
        };
    const displayViewBox = verticalCourt
      ? `${displayFrame.x} ${displayFrame.y} ${displayFrame.width} ${displayFrame.height}`
      : view.viewBox;
    const courtTransform = verticalCourt ? `matrix(0 1 1 0 ${view.width / 2} 0)` : undefined;
    const courtBounds = {
      minX: -view.margin,
      maxX: size === "half" ? view.length : view.length + view.margin,
      minY: -(view.width / 2) - view.margin,
      maxY: view.width / 2 + view.margin,
    };

    const courtToDisplay = (courtPoint: Point): Point =>
      verticalCourt
        ? { x: courtPoint.y + view.width / 2, y: courtPoint.x }
        : courtPoint;
    const attachedPlayerIds = new Set([
      ...snapPreviewPlayerIds,
      ...phase.actions
        .filter((action) =>
          action.actorId &&
          (attachableActionTypes.has(action.type) || action.type === "handoff") &&
          isSelectionSelected(displaySelection, { type: "action", id: action.id }),
        )
        .map((action) => action.actorId as string),
      ...phase.actions
        .filter((action) =>
          action.receiverId &&
          (action.type === "pass" || action.type === "handoff") &&
          isSelectionSelected(displaySelection, { type: "action", id: action.id }),
        )
        .map((action) => action.receiverId as string),
    ]);
    const ballPlacements = getPhaseBalls(phase)
      .map((ball) => ({ ball, point: getBallPoint(ball, phase.players, visualScale) }))
      .filter((item): item is { ball: DiagramBall; point: Point } => Boolean(item.point));

    const displayToCourt = (displayPoint: Point): Point =>
      verticalCourt
        ? {
            x: Math.min(courtBounds.maxX, Math.max(courtBounds.minX, displayPoint.y)),
            y: Math.min(courtBounds.maxY, Math.max(courtBounds.minY, displayPoint.x - view.width / 2)),
          }
        : {
            x: Math.min(courtBounds.maxX, Math.max(courtBounds.minX, displayPoint.x)),
            y: Math.min(courtBounds.maxY, Math.max(courtBounds.minY, displayPoint.y)),
          };

    const pointerToCourtPoint = (event: PointerEvent, svg: SVGSVGElement): Point => {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = svg.getScreenCTM();
      if (!matrix) return { x: 0, y: 0 };
      const transformed = point.matrixTransform(matrix.inverse());
      return displayToCourt(transformed);
    };

    const pointerToDisplayPoint = (event: { clientX: number; clientY: number }, svg: SVGSVGElement | null): Point => {
      if (!svg) return { x: 0, y: 0 };
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = svg.getScreenCTM();
      if (!matrix) return { x: 0, y: 0 };
      return point.matrixTransform(matrix.inverse());
    };

    const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
      onCourtPointerDown(pointerToCourtPoint(event, event.currentTarget), event);
    };

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
      const textSelectionDrag = textSelectionDragRef.current;
      if (textSelectionDrag) {
        const object = phase.objects.find((item) => item.id === textSelectionDrag.objectId && item.type === "text");
        if (!object) return;
        const displayPoint = pointerToDisplayPoint(event, event.currentTarget);
        const cursorIndex = getTextCursorIndex(
          editingTextValue,
          object.fontSize ?? 1.9,
          object.align ?? "center",
          courtToDisplay(object),
          displayPoint,
        );
        onTextSelectionChange?.(textSelectionDrag.objectId, textSelectionDrag.anchorIndex, cursorIndex);
        return;
      }

      onPointerMove(pointerToCourtPoint(event, event.currentTarget), event);
    };

    const handlePointerUp = (event: PointerEvent<SVGSVGElement>) => {
      const textSelectionDrag = textSelectionDragRef.current;
      if (textSelectionDrag) {
        textSelectionDragRef.current = null;
        try {
          event.currentTarget.releasePointerCapture(textSelectionDrag.pointerId);
        } catch {
          // Pointer capture may not have been established in every browser.
        }
        return;
      }

      onPointerUp(event);
    };

    const handleEntityPointerDown = (nextSelection: Exclude<Selection, null>, event: PointerEvent<SVGElement>) => {
      const svg = event.currentTarget.ownerSVGElement;
      if (!svg) return;
      onEntityPointerDown(nextSelection, pointerToCourtPoint(event, svg), event);
    };

    return (
      <svg
        ref={ref}
        viewBox={displayViewBox}
        preserveAspectRatio="xMidYMid meet"
        className={cn(
          "h-full min-h-0 w-full rounded-lg bg-slate-100 shadow-inner",
          interactive ? "touch-none" : "pointer-events-none cursor-default touch-pan-y",
          className,
        )}
        role="img"
        aria-label={`${view.spec.label} ${sizeLabel} court diagram${interactive ? " editor" : ""}`}
        onPointerDown={interactive ? handlePointerDown : undefined}
        onPointerMove={interactive ? handlePointerMove : undefined}
        onPointerUp={interactive ? handlePointerUp : undefined}
        onPointerCancel={interactive ? handlePointerUp : undefined}
      >
        <defs>
          <marker id="creator-arrow-orange" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#f57520" />
          </marker>
          <marker id="creator-arrow-black" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#111111" />
          </marker>
          <marker id="creator-arrow-blue" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#2563eb" />
          </marker>
          <marker id="creator-arrow-green" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#16a34a" />
          </marker>
          <pattern id="creator-hardwood" width="22" height="84" patternUnits="userSpaceOnUse" patternTransform={verticalCourt ? "rotate(90)" : undefined}>
            <rect width="22" height="84" fill="#f1d9a8" />
            <rect x="0" y="0" width="2.75" height="84" fill="#f7e5bd" opacity="0.36" />
            <rect x="2.75" y="0" width="2.75" height="84" fill="#edcf97" opacity="0.28" />
            <rect x="5.5" y="0" width="2.75" height="84" fill="#f4dfb2" opacity="0.32" />
            <rect x="8.25" y="0" width="2.75" height="84" fill="#eecf98" opacity="0.24" />
            <rect x="11" y="0" width="2.75" height="84" fill="#f8e9c4" opacity="0.3" />
            <rect x="13.75" y="0" width="2.75" height="84" fill="#ebca91" opacity="0.22" />
            <rect x="16.5" y="0" width="2.75" height="84" fill="#f3ddb0" opacity="0.3" />
            <rect x="19.25" y="0" width="2.75" height="84" fill="#f6e6bf" opacity="0.26" />
            <path d="M 2.75 0 V 84 M 5.5 0 V 84 M 8.25 0 V 84 M 11 0 V 84 M 13.75 0 V 84 M 16.5 0 V 84 M 19.25 0 V 84" stroke="#a66d32" strokeOpacity="0.1" strokeWidth="0.055" />
            <path d="M 0 29 H 2.75 M 2.75 55 H 5.5 M 5.5 36 H 8.25 M 8.25 70 H 11 M 11 25 H 13.75 M 13.75 49 H 16.5 M 16.5 33 H 19.25 M 19.25 64 H 22" stroke="#a66d32" strokeOpacity="0.075" strokeWidth="0.05" />
            <path d="M 1.1 5 V 79 M 4.05 9 V 82 M 6.92 2 V 75 M 9.58 12 V 83 M 12.45 6 V 77 M 15.22 0 V 71 M 18.18 11 V 84 M 20.82 4 V 76" stroke="#fff5db" strokeOpacity="0.13" strokeWidth="0.04" />
            <path d="M 1.82 0 V 84 M 4.72 3 V 77 M 7.62 10 V 84 M 10.24 0 V 69 M 13.14 8 V 84 M 15.92 6 V 80 M 18.92 0 V 73 M 21.42 13 V 84" stroke="#b98243" strokeOpacity="0.045" strokeWidth="0.04" />
          </pattern>
          <pattern id="creator-gray-wood" width="22" height="84" patternUnits="userSpaceOnUse" patternTransform={verticalCourt ? "rotate(90)" : undefined}>
            <rect width="22" height="84" fill="#d7d8d2" />
            <rect x="0" y="0" width="2.75" height="84" fill="#ebe6d8" opacity="0.28" />
            <rect x="2.75" y="0" width="2.75" height="84" fill="#c8c9c1" opacity="0.22" />
            <rect x="5.5" y="0" width="2.75" height="84" fill="#dedbd0" opacity="0.25" />
            <rect x="8.25" y="0" width="2.75" height="84" fill="#cdcbc2" opacity="0.2" />
            <rect x="11" y="0" width="2.75" height="84" fill="#eee9dc" opacity="0.24" />
            <rect x="13.75" y="0" width="2.75" height="84" fill="#c7c8c0" opacity="0.2" />
            <rect x="16.5" y="0" width="2.75" height="84" fill="#dfddd4" opacity="0.24" />
            <rect x="19.25" y="0" width="2.75" height="84" fill="#e8e4d8" opacity="0.22" />
            <path d="M 2.75 0 V 84 M 5.5 0 V 84 M 8.25 0 V 84 M 11 0 V 84 M 13.75 0 V 84 M 16.5 0 V 84 M 19.25 0 V 84" stroke="#6f7670" strokeOpacity="0.08" strokeWidth="0.055" />
            <path d="M 0 27 H 2.75 M 2.75 58 H 5.5 M 5.5 34 H 8.25 M 8.25 71 H 11 M 11 22 H 13.75 M 13.75 52 H 16.5 M 16.5 31 H 19.25 M 19.25 65 H 22" stroke="#6f7670" strokeOpacity="0.065" strokeWidth="0.05" />
            <path d="M 1.08 7 V 82 M 4.02 0 V 73 M 6.82 11 V 84 M 9.55 4 V 77 M 12.42 13 V 84 M 15.24 6 V 81 M 18.12 0 V 72 M 20.86 10 V 84" stroke="#f8faf3" strokeOpacity="0.1" strokeWidth="0.04" />
            <path d="M 1.78 2 V 78 M 4.78 10 V 84 M 7.54 0 V 68 M 10.34 9 V 84 M 13.2 0 V 74 M 15.86 12 V 84 M 18.84 4 V 79 M 21.36 0 V 70" stroke="#747a74" strokeOpacity="0.04" strokeWidth="0.04" />
          </pattern>
        </defs>

        {fillViewportBackground && (
          <rect
            x={displayFrame.x}
            y={displayFrame.y}
            width={displayFrame.width}
            height={displayFrame.height}
            fill={background}
          />
        )}

        <g transform={courtTransform}>
          <rect
            x={0}
            y={-view.width / 2}
            width={view.length}
            height={view.width}
            fill={themeStyle.fill}
            stroke={lineColor}
            strokeWidth={0.2}
          />

          {showGrid && <Grid length={view.length} width={view.width} color={mutedLineColor} />}

          <CourtLines
            length={view.length}
            width={view.width}
            template={template}
            size={size}
            color={lineColor}
            mutedColor={mutedLineColor}
          />
        </g>

        <g>
          {phase.objects.map((object) => (
            <g
              key={object.id}
              data-text-object-id={object.type === "text" ? object.id : undefined}
              className={cn(interactive && (object.type === "text" && editingTextObjectId === object.id ? "cursor-text" : "cursor-grab active:cursor-grabbing"))}
              onPointerDown={(event) => {
                if (object.type === "text" && editingTextObjectId === object.id) {
                  event.stopPropagation();
                  const displayPoint = pointerToDisplayPoint(event, event.currentTarget.ownerSVGElement);
                  const cursorIndex = getTextCursorIndex(editingTextValue, object.fontSize ?? 1.9, object.align ?? "center", courtToDisplay(object), displayPoint);
                  if (event.detail >= 2) {
                    textSelectionDragRef.current = null;
                    onTextDoubleClick?.(
                      object.id,
                      editingTextValue,
                      cursorIndex,
                      getWordSelectionRange(editingTextValue, cursorIndex),
                    );
                    return;
                  }
                  const svg = event.currentTarget.ownerSVGElement;
                  if (svg) {
                    textSelectionDragRef.current = {
                      objectId: object.id,
                      anchorIndex: cursorIndex,
                      pointerId: event.pointerId,
                    };
                    try {
                      svg.setPointerCapture(event.pointerId);
                    } catch {
                      // Pointer capture may not be available in every SVG context.
                    }
                  }
                  onTextPointerDown?.(object.id, editingTextValue, cursorIndex);
                  return;
                }

                handleEntityPointerDown({ type: "object", id: object.id }, event);
              }}
              onDoubleClick={(event) => {
                if (object.type !== "text") return;
                event.stopPropagation();
                const alreadyEditing = editingTextObjectId === object.id;
                const currentText = alreadyEditing ? editingTextValue : object.text;
                const displayPoint = pointerToDisplayPoint(event, event.currentTarget.ownerSVGElement);
                const cursorIndex = getTextCursorIndex(currentText, object.fontSize ?? 1.9, object.align ?? "center", courtToDisplay(object), displayPoint);
                onTextDoubleClick?.(
                  object.id,
                  currentText,
                  cursorIndex,
                  alreadyEditing ? getWordSelectionRange(currentText, cursorIndex) : null,
                );
              }}
            >
              {object.type === "cone" ? (
                <Cone
                  {...courtToDisplay(object)}
                  selected={isSelectionSelected(displaySelection, { type: "object", id: object.id })}
                  color={object.color}
                  size={object.size}
                />
              ) : (
                <TextObject
                  {...courtToDisplay(object)}
                  text={object.text}
                  selected={isSelectionSelected(displaySelection, { type: "object", id: object.id })}
                  color={object.color}
                  fontSize={object.fontSize}
                  bold={object.bold}
                  italic={object.italic}
                  underline={object.underline}
                  align={object.align}
                  editing={editingTextObjectId === object.id}
                  editingText={editingTextValue}
                  cursorIndex={editingTextCursorIndex}
                  selectionRange={editingTextObjectId === object.id ? editingTextSelection : null}
                />
              )}
            </g>
          ))}
        </g>

        <g>
          {[...phase.players].sort(sortPlayersForLayering).map((player) => {
            const selected = isSelectionSelected(displaySelection, { type: "player", id: player.id });
            const attached = attachedPlayerIds.has(player.id);
            const editing = editingPlayerId === player.id;
            const displayPoint = courtToDisplay(player);
            const markerColor = getPlayerMarkerColor(player);
            const stanceGeometry = player.kind === "defense-stance"
              ? getDefenseStanceGeometry(player, courtToDisplay)
              : null;
            return (
              <g
                key={player.id}
                data-testid="creator-player"
                data-player-id={player.id}
                data-player-number={player.number}
                data-player-kind={player.kind}
                data-player-angle={player.angle ?? 0}
                data-court-x={player.x}
                data-court-y={player.y}
                className={cn(interactive && "cursor-grab active:cursor-grabbing")}
                onPointerDown={(event) => handleEntityPointerDown({ type: "player", id: player.id }, event)}
                onDoubleClick={(event) => {
                  event.stopPropagation();
                  onPlayerDoubleClick?.(player.id, player.number);
                }}
              >
                <g transform={scaleTransform(displayPoint, visualScale)}>
                  {attached && <circle data-testid="creator-player-attach-highlight" cx={displayPoint.x} cy={displayPoint.y} r={2.38} fill="none" stroke="#2563eb" strokeWidth={0.2} strokeDasharray="0.45 0.42" opacity={0.9} />}
                  {selected && player.kind !== "defense-stance" && <circle cx={displayPoint.x} cy={displayPoint.y} r={2.12} fill="none" stroke="#f57520" strokeWidth={0.28} />}
                  {player.kind === "offense" ? (
                    <>
                    <circle cx={displayPoint.x} cy={displayPoint.y} r={2.7} fill="transparent" />
                    <circle cx={displayPoint.x} cy={displayPoint.y} r={1.55} fill="#ffffff" stroke={markerColor} strokeWidth={0.3} />
                    {editing ? (
                      <EditablePlayerLabel x={displayPoint.x} y={displayPoint.y} value={editingPlayerValue} color={markerColor} kind={player.kind} />
                    ) : (
                      <text
                        x={displayPoint.x}
                        y={displayPoint.y + 0.44}
                        textAnchor="middle"
                        fontSize={1.55}
                        fontWeight={800}
                        fill={markerColor}
                        className="select-none"
                      >
                        {player.number}
                      </text>
                    )}
                    </>
                  ) : player.kind === "defense" ? (
                    <>
                    <circle cx={displayPoint.x} cy={displayPoint.y} r={2.85} fill="transparent" />
                    {editing ? (
                      <EditablePlayerLabel x={displayPoint.x} y={displayPoint.y} value={editingPlayerValue} color={markerColor} kind={player.kind} />
                    ) : (
                      <text
                        x={displayPoint.x}
                        y={displayPoint.y + 0.5}
                        textAnchor="middle"
                        fontSize={2.15}
                        fontWeight={900}
                        fill={markerColor}
                        className="select-none"
                      >
                        X<tspan dy="0.42" fontSize={1.25}>{player.number}</tspan>
                      </text>
                    )}
                    </>
                  ) : stanceGeometry ? (
                    <>
                      <path
                        data-testid="creator-defense-stance-hit-area"
                        d={buildPolylinePath([...stanceGeometry.selectionBox, stanceGeometry.selectionBox[0]])}
                        fill="transparent"
                      />
                      <path
                        data-testid="creator-defense-stance-left-arm"
                        d={`M ${stanceGeometry.leftInner.x} ${stanceGeometry.leftInner.y} Q ${stanceGeometry.leftControl.x} ${stanceGeometry.leftControl.y} ${stanceGeometry.leftOuter.x} ${stanceGeometry.leftOuter.y}`}
                        fill="none"
                        stroke={markerColor}
                        strokeWidth={0.38}
                        strokeLinecap="round"
                      />
                      <path
                        data-testid="creator-defense-stance-right-arm"
                        d={`M ${stanceGeometry.rightInner.x} ${stanceGeometry.rightInner.y} Q ${stanceGeometry.rightControl.x} ${stanceGeometry.rightControl.y} ${stanceGeometry.rightOuter.x} ${stanceGeometry.rightOuter.y}`}
                        fill="none"
                        stroke={markerColor}
                        strokeWidth={0.38}
                        strokeLinecap="round"
                      />
                      {selected && (
                        <>
                          <path
                            data-testid="creator-defense-stance-selection-box"
                            d={buildPolylinePath([...stanceGeometry.selectionBox, stanceGeometry.selectionBox[0]])}
                            fill="none"
                            stroke="#f57520"
                            strokeWidth={0.16}
                            strokeDasharray="0.48 0.4"
                            pointerEvents="none"
                          />
                          {interactive && (
                            <g className="cursor-crosshair">
                              <line
                                x1={stanceGeometry.rotationLineStart.x}
                                y1={stanceGeometry.rotationLineStart.y}
                                x2={stanceGeometry.rotationHandle.x}
                                y2={stanceGeometry.rotationHandle.y}
                                stroke="#2563eb"
                                strokeWidth={0.16}
                                strokeDasharray="0.4 0.32"
                                pointerEvents="none"
                              />
                              <circle
                                data-testid="creator-defense-stance-rotation-handle"
                                cx={stanceGeometry.rotationHandle.x}
                                cy={stanceGeometry.rotationHandle.y}
                                r={1.1}
                                fill="transparent"
                                onPointerDown={(event) => {
                                  const svg = event.currentTarget.ownerSVGElement;
                                  if (!svg) return;
                                  onPlayerRotationPointerDown?.(player.id, pointerToCourtPoint(event, svg), event);
                                }}
                              />
                              <circle
                                cx={stanceGeometry.rotationHandle.x}
                                cy={stanceGeometry.rotationHandle.y}
                                r={0.42}
                                fill="#ffffff"
                                stroke="#2563eb"
                                strokeWidth={0.18}
                                pointerEvents="none"
                              />
                            </g>
                          )}
                        </>
                      )}
                      <circle cx={displayPoint.x} cy={displayPoint.y} r={1.55} fill={markerColor} stroke="#ffffff" strokeWidth={0.18} />
                      {editing ? (
                        <EditablePlayerLabel x={displayPoint.x} y={displayPoint.y} value={editingPlayerValue} color="#ffffff" kind={player.kind} />
                      ) : (
                        <text
                          data-testid="creator-defense-stance-label"
                          x={displayPoint.x}
                          y={displayPoint.y + 0.44}
                          textAnchor="middle"
                          fontSize={1.5}
                          fontWeight={800}
                          fill="#ffffff"
                          className="select-none"
                        >
                          X<tspan dy="0.42" fontSize={1.05}>{player.number}</tspan>
                        </text>
                      )}
                    </>
                  ) : null}
                </g>
              </g>
            );
          })}
        </g>

        <g>
          {phase.actions.map((action) => (
            <ActionShape
              key={action.id}
              action={action}
              color={getActionRenderColor(action, phase.players)}
              visualScale={visualScale}
              project={courtToDisplay}
              selected={isSelectionSelected(displaySelection, { type: "action", id: action.id })}
              interactive={interactive}
              attachedStart={Boolean(action.actorId && attachableActionTypes.has(action.type))}
              attachedEnd={Boolean((action.type === "pass" && action.receiverId) || (action.type === "shot" && action.endTarget === "rim"))}
              onPointerDown={(event) => handleEntityPointerDown({ type: "action", id: action.id }, event)}
              onPointPointerDown={(role, event) => {
                const svg = event.currentTarget.ownerSVGElement;
                if (!svg) return;
                onActionPointPointerDown?.(action.id, role, pointerToCourtPoint(event, svg), event);
              }}
            />
          ))}
        </g>

        {ballPlacements.map(({ ball, point }) => (
          <g
            key={ball.id}
            data-testid="creator-ball"
            data-ball-id={ball.id}
            data-ball-mode={ball.mode}
            data-court-x={point.x}
            data-court-y={point.y}
            className={cn(interactive && "cursor-grab active:cursor-grabbing")}
            onPointerDown={(event) => handleEntityPointerDown({ type: "ball", id: ball.id }, event)}
          >
            <Basketball
              {...courtToDisplay(point)}
              selected={isSelectionSelected(displaySelection, { type: "ball", id: ball.id })}
              visualScale={visualScale}
            />
          </g>
        ))}

        <g pointerEvents="none">
          {draftActionStart && (
            <circle
              cx={courtToDisplay(draftActionStart).x}
              cy={courtToDisplay(draftActionStart).y}
              r={0.7}
              fill={activeActionType ? actionColors[activeActionType] : "#f57520"}
              opacity={0.75}
            />
          )}
          {rubberBand && <SelectionRect start={courtToDisplay(rubberBand.start)} end={courtToDisplay(rubberBand.current)} />}
        </g>
      </svg>
    );
  },
);

CourtSvg.displayName = "CourtSvg";

const Basketball = ({ x, y, selected, visualScale = 1 }: Point & { selected: boolean; visualScale?: number }) => {
  const r = 0.76;
  return (
    <g transform={scaleTransform({ x, y }, visualScale)}>
      <circle cx={x} cy={y} r={1.05} fill="transparent" />
      {selected && <circle cx={x} cy={y} r={1.12} fill="none" stroke="#f57520" strokeWidth={0.18} />}
      <circle cx={x} cy={y} r={r} fill="#f97316" stroke="#7c2d12" strokeWidth={0.12} />
      <path
        d={`M ${x - r} ${y} H ${x + r}`}
        stroke="#7c2d12"
        strokeWidth={0.1}
        strokeLinecap="round"
      />
      <path
        d={`M ${x} ${y - r} C ${x - 0.18} ${y - 0.3}, ${x - 0.18} ${y + 0.3}, ${x} ${y + r}`}
        stroke="#7c2d12"
        strokeWidth={0.1}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${x} ${y - r} C ${x + 0.18} ${y - 0.3}, ${x + 0.18} ${y + 0.3}, ${x} ${y + r}`}
        stroke="#7c2d12"
        strokeWidth={0.1}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${x - 0.56} ${y - 0.52} C ${x - 0.28} ${y - 0.2}, ${x - 0.28} ${y + 0.2}, ${x - 0.56} ${y + 0.52}`}
        stroke="#7c2d12"
        strokeWidth={0.09}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${x + 0.56} ${y - 0.52} C ${x + 0.28} ${y - 0.2}, ${x + 0.28} ${y + 0.2}, ${x + 0.56} ${y + 0.52}`}
        stroke="#7c2d12"
        strokeWidth={0.09}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

const Grid = ({ length, width, color }: { length: number; width: number; color: string }) => {
  const vertical = Array.from({ length: Math.floor(length / 5) + 1 }, (_, index) => index * 5);
  const horizontal = Array.from({ length: Math.floor(width / 5) + 1 }, (_, index) => -width / 2 + index * 5);

  return (
    <g opacity={0.18}>
      {vertical.map((x) => (
        <line key={`v-${x}`} x1={x} x2={x} y1={-width / 2} y2={width / 2} stroke={color} strokeWidth={0.08} />
      ))}
      {horizontal.map((y) => (
        <line key={`h-${y}`} x1={0} x2={length} y1={y} y2={y} stroke={color} strokeWidth={0.08} />
      ))}
    </g>
  );
};

const SelectionRect = ({ start, end }: { start: Point; end: Point }) => {
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="#f575201a"
      stroke="#f57520"
      strokeWidth={0.18}
      strokeDasharray="0.7 0.55"
      pointerEvents="none"
    />
  );
};

const isSelectionSelected = (selection: Selection, item: SelectionItem) => {
  if (!selection) return false;
  if (selection.type === "multi") return selection.items.some((selected) => selected.type === item.type && selected.id === item.id);
  return selection.type === item.type && selection.id === item.id;
};

const CourtLines = ({
  length,
  width,
  template,
  size,
  color,
  mutedColor,
}: {
  length: number;
  width: number;
  template: CourtTemplate;
  size: CourtSize;
  color: string;
  mutedColor: string;
}) => {
  const view = getCourtView(template, size);
  const spec = view.spec;
  const fullCourt = size !== "half";
  const sides = fullCourt ? ["left", "right"] as const : ["left"] as const;

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {fullCourt && (
        <>
          <line x1={length / 2} x2={length / 2} y1={-width / 2} y2={width / 2} stroke={color} strokeWidth={0.18} />
          <circle cx={length / 2} cy={0} r={spec.centerCircleRadius} stroke={color} strokeWidth={0.18} />
        </>
      )}
      {size === "half" && (
        <line x1={length} x2={length} y1={-width / 2} y2={width / 2} stroke={color} strokeWidth={0.18} />
      )}
      {sides.map((side) => (
        <HalfCourtLines
          key={side}
          side={side}
          length={length}
          width={width}
          color={color}
          mutedColor={mutedColor}
          template={template}
          size={size}
        />
      ))}
    </g>
  );
};

const HalfCourtLines = ({
  side,
  length,
  width,
  color,
  mutedColor,
  template,
  size,
}: {
  side: "left" | "right";
  length: number;
  width: number;
  color: string;
  mutedColor: string;
  template: CourtTemplate;
  size: CourtSize;
}) => {
  const { spec } = getCourtView(template, size);
  const flip = side === "left" ? 1 : -1;
  const origin = side === "left" ? 0 : length;
  const x = (value: number) => origin + value * flip;
  const rimX = x(spec.rimOffset);
  const freeThrowX = x(spec.backboardOffset + 15 * (spec.unit === "ft" ? 1 : 0.3048));
  const keyEndX = x(spec.keyLength);
  const keyLeft = Math.min(origin, keyEndX);
  const keyWidth = Math.abs(keyEndX - origin);
  const threeCornerY = spec.threePointCornerDistance ?? spec.threePointRadius;
  const threeRatio = Math.min(1, threeCornerY / spec.threePointRadius);
  const arcStartXOffset = Math.sqrt(Math.max(0, spec.threePointRadius ** 2 - threeCornerY ** 2));
  const straightX = spec.threePointStraightLength ?? spec.rimOffset;
  const threeStartX = x(straightX);
  const arcIntersectX = x(arcStartXOffset);
  const threeAngle = Math.asin(threeRatio) * 180 / Math.PI;
  const arcStartAngle = side === "left" ? -threeAngle : 180 + threeAngle;
  const arcEndAngle = side === "left" ? threeAngle : 180 - threeAngle;

  return (
    <g>
      <line x1={origin} x2={origin} y1={-width / 2} y2={width / 2} stroke={color} strokeWidth={0.22} />
      <line x1={x(spec.backboardOffset)} x2={x(spec.backboardOffset)} y1={-3} y2={3} stroke={color} strokeWidth={0.2} />
      <circle cx={rimX} cy={0} r={0.75 * (spec.unit === "ft" ? 1 : 0.3048)} stroke={color} strokeWidth={0.18} />
      <rect x={keyLeft} y={-spec.keyWidth / 2} width={keyWidth} height={spec.keyWidth} stroke={color} strokeWidth={0.18} />
      <path
        d={buildArcPath({ x: freeThrowX, y: 0 }, spec.freeThrowRadius, side === "left" ? -90 : 90, side === "left" ? 90 : 270)}
        stroke={color}
        strokeWidth={0.18}
      />
      <path
        d={buildArcPath({ x: freeThrowX, y: 0 }, spec.freeThrowRadius, side === "left" ? 90 : 270, side === "left" ? 270 : 90)}
        stroke={mutedColor}
        strokeDasharray="0.6 0.6"
        strokeWidth={0.14}
      />
      {spec.restrictedRadius && (
        <path
          d={buildArcPath({ x: rimX, y: 0 }, spec.restrictedRadius, side === "left" ? -90 : 90, side === "left" ? 90 : 270)}
          stroke={color}
          strokeWidth={0.14}
        />
      )}
      <line x1={origin} x2={threeStartX} y1={-threeCornerY} y2={-threeCornerY} stroke={color} strokeWidth={0.18} />
      <line x1={origin} x2={threeStartX} y1={threeCornerY} y2={threeCornerY} stroke={color} strokeWidth={0.18} />
      <path
        d={buildArcPath({ x: rimX, y: 0 }, spec.threePointRadius, arcStartAngle, arcEndAngle)}
        stroke={color}
        strokeWidth={0.18}
      />
      <line x1={arcIntersectX} x2={threeStartX} y1={-threeCornerY} y2={-threeCornerY} stroke={color} strokeWidth={0.18} opacity={0.001} />
      <line x1={arcIntersectX} x2={threeStartX} y1={threeCornerY} y2={threeCornerY} stroke={color} strokeWidth={0.18} opacity={0.001} />
      <LaneMarks x={x} side={side} template={template} keyWidth={spec.keyWidth} color={color} />
    </g>
  );
};

const LaneMarks = ({
  x,
  side,
  template,
  keyWidth,
  color,
}: {
  x: (value: number) => number;
  side: "left" | "right";
  template: CourtTemplate;
  keyWidth: number;
  color: string;
}) => {
  const markLength = 0.6;
  const blockDepth = 0.7;
  const config = getLaneMarkConfig(template);
  const blockX = config.block ? (side === "left" ? x(config.block) : x(config.block) - config.blockWidth) : null;

  return (
    <g>
      {config.marks.map((mark) => (
        <g key={mark}>
          <line x1={x(mark)} x2={x(mark)} y1={-keyWidth / 2} y2={-(keyWidth / 2 + markLength)} stroke={color} strokeWidth={0.14} />
          <line x1={x(mark)} x2={x(mark)} y1={keyWidth / 2} y2={keyWidth / 2 + markLength} stroke={color} strokeWidth={0.14} />
        </g>
      ))}
      {blockX !== null && config.blockWidth > 0 && (
        <>
          <rect x={blockX} y={-(keyWidth / 2 + blockDepth)} width={config.blockWidth} height={blockDepth} fill={color} />
          <rect x={blockX} y={keyWidth / 2} width={config.blockWidth} height={blockDepth} fill={color} />
        </>
      )}
    </g>
  );
};

const getLaneMarkConfig = (template: CourtTemplate) => {
  if (template === "fiba") {
    return { marks: [5.74, 10, 12.8, 15.74], block: 8.66, blockWidth: 1.31 };
  }

  if (template === "nba") {
    return { marks: [7, 8, 12, 15], block: null, blockWidth: 0 };
  }

  return { marks: [8, 12, 15, 18], block: 8, blockWidth: 1 };
};

const ActionShape = ({
  action,
  color,
  visualScale = 1,
  project,
  selected,
  interactive,
  attachedStart,
  attachedEnd,
  onPointerDown,
  onPointPointerDown,
}: {
  action: DiagramAction;
  color: string;
  visualScale?: number;
  project: (point: Point) => Point;
  selected: boolean;
  interactive: boolean;
  attachedStart: boolean;
  attachedEnd: boolean;
  onPointerDown: (event: PointerEvent<SVGElement>) => void;
  onPointPointerDown?: (role: ActionPointRole, event: PointerEvent<SVGCircleElement>) => void;
}) => {
  const start = project(action.start);
  const rawControl = project(action.control ?? getMidpoint(action.start, action.end));
  const rawControlStart = project(action.controlStart ?? getMidpoint(action.start, action.control ?? getMidpoint(action.start, action.end)));
  const rawControlEnd = project(action.controlEnd ?? getMidpoint(action.control ?? getMidpoint(action.start, action.end), action.end));
  const end = project(action.end);
  const actionShape = action.type === "shot" ? "straight" : action.shape ?? "straight";
  const control = actionShape === "straight" && action.type !== "handoff" ? getMidpoint(start, end) : rawControl;
  const controlStart = actionShape === "custom" ? rawControlStart : getMidpoint(start, control);
  const controlEnd = actionShape === "custom" ? rawControlEnd : getMidpoint(control, end);
  const path = getActionPath(action, start, control, end, controlStart, controlEnd);
  const endTangent = action.type === "shot" ? { x: end.x - start.x, y: end.y - start.y } : getEndTangent(start, control, end, actionShape, controlStart, controlEnd);
  const hasArrowHead = action.type === "pass" || action.type === "cut";
  const actionScale = clampElementScale(visualScale);
  const strokeWidth = Math.max(0.07, (selected ? 0.36 : 0.25) * actionScale);
  const startGap = attachedStart ? playerActionVisualGap * actionScale : 0;
  const endGap = action.type === "pass" && attachedEnd ? playerActionVisualGap * actionScale : 0;
  const startHandle = startGap ? getActionPointAtDistance(start, control, end, actionShape, startGap, controlStart, controlEnd) : start;
  const endHandle = endGap ? getActionPointAtDistanceFromEnd(start, control, end, actionShape, endGap, controlStart, controlEnd) : end;
  const arrowHeadPoint = endGap ? offsetPointAlongTangent(end, endTangent, -endGap) : end;
  const visiblePath = action.type === "dribble"
    ? getDribblePath(start, control, end, actionShape, startGap, 1.28 * actionScale, controlStart, controlEnd)
    : hasArrowHead
      ? getActionPathWithGaps(start, control, end, actionShape, startGap, 1.18 * actionScale + endGap, controlStart, controlEnd)
      : getActionPathWithGaps(start, control, end, actionShape, startGap, 0, controlStart, controlEnd);
  const markerId = `creator-arrow-${action.id}`;
  const marker = action.type === "screen" || action.type === "handoff" || action.type === "shot" || action.type === "dribble" || hasArrowHead ? undefined : `url(#${markerId})`;
  const handleClassName = selected ? "opacity-100" : "pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100";
  const actionOpacity = 1;
  const pathProgress = Math.min(1, Math.max(0, action.animationPreview?.pathProgress ?? 1));
  const revealProps = pathProgress < 0.999
    ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - pathProgress }
    : {};
  const pathComplete = pathProgress >= 0.999;

  return (
    <g
      className={cn(interactive && "group cursor-pointer")}
      data-testid="creator-action"
      data-action-id={action.id}
      data-action-type={action.type}
      data-actor-id={action.actorId ?? ""}
      data-start-anchor-action-id={action.startAnchorActionId ?? ""}
      data-receiver-id={action.receiverId ?? ""}
      data-receiver-anchor-action-id={action.receiverAnchorActionId ?? ""}
      data-receiver-anchor-point={action.receiverAnchorPoint ?? ""}
      data-handoff-actor-action-id={action.handoffActorActionId ?? ""}
      data-handoff-receiver-action-id={action.handoffReceiverActionId ?? ""}
      data-end-target={action.endTarget ?? ""}
      data-start-x={action.start.x}
      data-start-y={action.start.y}
      data-end-x={action.end.x}
      data-end-y={action.end.y}
    >
      <defs>
        <marker id={markerId} markerWidth="4.3" markerHeight="4.3" refX="3.9" refY="2.15" orient="auto">
          <path d="M 0 0 L 4.3 2.15 L 0 4.3 z" fill={color} />
        </marker>
      </defs>
      {action.type === "handoff" ? (
        <circle cx={control.x} cy={control.y} r={2.2} fill="transparent" onPointerDown={interactive ? onPointerDown : undefined} />
      ) : (
        <path d={visiblePath} fill="none" stroke="transparent" strokeWidth={3} onPointerDown={interactive ? onPointerDown : undefined} />
      )}
      {action.type !== "handoff" && (
        <path
          d={visiblePath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={action.type === "pass" || action.type === "shot" ? "1.1 0.8" : undefined}
          markerEnd={marker}
          className={cn(selected && "drop-shadow")}
          opacity={actionOpacity}
          pointerEvents="none"
          {...revealProps}
        />
      )}
      {action.type === "dribble" && pathComplete && <g opacity={actionOpacity}><ArrowHead point={end} tangent={endTangent} color={color} scale={actionScale} /></g>}
      {hasArrowHead && pathComplete && <g opacity={actionOpacity}><ArrowHead point={arrowHeadPoint} tangent={endTangent} color={color} scale={actionScale} /></g>}
      {action.type === "screen" && (
        pathComplete && <g opacity={actionOpacity}><ScreenCap end={end} tangent={endTangent} color={color} selected={selected} scale={actionScale} /></g>
      )}
      {action.type === "shot" && pathComplete && <g opacity={actionOpacity}><ShotTarget point={end} tangent={endTangent} color={color} scale={actionScale} /></g>}
      {action.type === "handoff" && <g opacity={actionOpacity * pathProgress}><HandoffGlyph point={control} color={color} scale={actionScale} /></g>}
      {interactive && action.type === "handoff" && (
        <g className={cn("cursor-move", handleClassName)}>
          <circle
            cx={control.x}
            cy={control.y}
            r={2.45}
            fill="transparent"
            onPointerDown={(event) => onPointPointerDown?.("control", event)}
          />
          <circle
            cx={control.x}
            cy={control.y}
            r={1.75}
            fill="none"
            stroke="#f57520"
            strokeWidth={0.16}
            pointerEvents="none"
          />
        </g>
      )}
      {interactive && action.type !== "handoff" && (
        <g className={handleClassName}>
          {action.type === "shot" ? (
            <line x1={startHandle.x} x2={endHandle.x} y1={startHandle.y} y2={endHandle.y} stroke="#f57520" strokeWidth={0.08} strokeDasharray="1.1 0.8" opacity={0.45} />
          ) : (
            <>
              {actionShape === "custom" ? (
                <path d={buildPolylinePath([startHandle, controlStart, control, controlEnd, endHandle])} fill="none" stroke="#f57520" strokeWidth={0.1} strokeDasharray="0.5 0.55" opacity={0.85} />
              ) : (
                <>
                  <line x1={startHandle.x} x2={control.x} y1={startHandle.y} y2={control.y} stroke="#f57520" strokeWidth={0.1} strokeDasharray="0.5 0.55" opacity={0.85} />
                  <line x1={control.x} x2={endHandle.x} y1={control.y} y2={endHandle.y} stroke="#f57520" strokeWidth={0.1} strokeDasharray="0.5 0.55" opacity={0.85} />
                </>
              )}
            </>
          )}
          <ActionHandle point={startHandle} role="start" attached={attachedStart} onPointerDown={onPointPointerDown} />
          {actionShape === "custom" && <ActionHandle point={controlStart} role="controlStart" color="curve" onPointerDown={onPointPointerDown} />}
          {action.type !== "shot" && <ActionHandle point={control} role="control" onPointerDown={onPointPointerDown} />}
          {actionShape === "custom" && <ActionHandle point={controlEnd} role="controlEnd" color="curve" onPointerDown={onPointPointerDown} />}
          <ActionHandle point={endHandle} role="end" attached={attachedEnd} onPointerDown={onPointPointerDown} />
        </g>
      )}
    </g>
  );
};

const getActionPath = (action: DiagramAction, start: Point, control: Point, end: Point, controlStart?: Point, controlEnd?: Point) => {
  const shape = action.shape ?? "straight";

  if (action.type === "dribble") {
    return getDribblePath(start, control, end, shape, 0, 0, controlStart, controlEnd);
  }

  if (action.type === "shot") {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  if (shape === "straight") {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  if (shape === "zigzag") {
    return `M ${start.x} ${start.y} L ${control.x} ${control.y} L ${end.x} ${end.y}`;
  }

  if (shape === "custom") {
    return buildCatmullRomPath(getCustomActionPoints(start, control, end, controlStart, controlEnd));
  }

  const bezierControl = getQuadraticControlFromMidpoint(start, control, end);
  return `M ${start.x} ${start.y} Q ${bezierControl.x} ${bezierControl.y} ${end.x} ${end.y}`;
};

const getActionPathWithGaps = (start: Point, control: Point, end: Point, shape: DiagramActionShape, startGap: number, endGap: number, controlStart?: Point, controlEnd?: Point) => {
  const centerline = sampleActionPoints(start, control, end, shape, shape === "curved" || shape === "custom" ? 64 : 3, controlStart, controlEnd);
  const totalLength = getPolylineLength(centerline);
  if (centerline.length < 2 || totalLength < 0.01) return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  const visibleStart = Math.min(Math.max(0, startGap), Math.max(0, totalLength - 0.01));
  const visibleEnd = Math.max(visibleStart + 0.01, totalLength - Math.max(0, endGap));
  if (shape === "straight") {
    const visibleStartPoint = getPointAtPolylineDistance(centerline, visibleStart).point;
    const visibleEndPoint = getPointAtPolylineDistance(centerline, visibleEnd).point;
    return `M ${visibleStartPoint.x} ${visibleStartPoint.y} L ${visibleEndPoint.x} ${visibleEndPoint.y}`;
  }

  const visiblePoints = getPolylinePointsBetweenDistances(centerline, visibleStart, visibleEnd);
  return shape === "zigzag" ? buildPolylinePath(visiblePoints) : buildSmoothPath(visiblePoints);
};

const getActionPointAtDistance = (start: Point, control: Point, end: Point, shape: DiagramActionShape, distance: number, controlStart?: Point, controlEnd?: Point) => {
  const centerline = sampleActionPoints(start, control, end, shape, shape === "curved" || shape === "custom" ? 64 : 3, controlStart, controlEnd);
  const totalLength = getPolylineLength(centerline);
  if (totalLength < 0.01) return start;
  return getPointAtPolylineDistance(centerline, Math.min(Math.max(0, distance), totalLength)).point;
};

const getActionPointAtDistanceFromEnd = (start: Point, control: Point, end: Point, shape: DiagramActionShape, distance: number, controlStart?: Point, controlEnd?: Point) => {
  const centerline = sampleActionPoints(start, control, end, shape, shape === "curved" || shape === "custom" ? 64 : 3, controlStart, controlEnd);
  const totalLength = getPolylineLength(centerline);
  if (totalLength < 0.01) return end;
  return getPointAtPolylineDistance(centerline, Math.min(Math.max(0, totalLength - distance), totalLength)).point;
};

const getDribblePath = (start: Point, control: Point, end: Point, shape: DiagramActionShape, startGap = 0, endGap = 0, controlStart?: Point, controlEnd?: Point) => {
  const centerline = sampleActionPoints(start, control, end, shape, 96, controlStart, controlEnd);
  const totalLength = getPolylineLength(centerline);
  if (centerline.length < 2 || totalLength < 0.01) return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  const visibleStart = Math.min(Math.max(0, startGap), Math.max(0, totalLength - 0.01));
  const visibleEnd = Math.max(visibleStart + 0.01, totalLength - Math.max(0, endGap));
  const visibleLength = visibleEnd - visibleStart;
  const straightLead = Math.min(0.48, visibleLength * 0.12);
  const waveLength = 2.55;
  const amplitude = 0.68;
  const step = 0.42;
  const waveEndDistance = Math.max(0, visibleLength - straightLead);
  const wavePointCount = Math.max(2, Math.ceil(waveEndDistance / step) + 1);
  const wavePoints = Array.from({ length: wavePointCount }, (_, index) => {
    const distance = index === wavePointCount - 1 ? waveEndDistance : Math.min(waveEndDistance, index * step);
    const sample = getPointAtPolylineDistance(centerline, visibleStart + distance);
    const offset = Math.sin(((distance - waveEndDistance) / waveLength) * Math.PI * 2) * amplitude;
    return {
      x: sample.point.x + sample.normal.x * offset,
      y: sample.point.y + sample.normal.y * offset,
    };
  });
  const visibleEndPoint = getPointAtPolylineDistance(centerline, visibleEnd).point;

  if (waveEndDistance < 0.25) {
    const visibleStartPoint = getPointAtPolylineDistance(centerline, visibleStart).point;
    return `M ${visibleStartPoint.x} ${visibleStartPoint.y} L ${visibleEndPoint.x} ${visibleEndPoint.y}`;
  }

  return `${buildSmoothPath(wavePoints)} L ${visibleEndPoint.x} ${visibleEndPoint.y}`;
};

const buildSmoothPath = (points: Point[]) => {
  if (points.length < 3) return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  const commands = [`M ${points[0].x} ${points[0].y}`];
  for (let index = 1; index < points.length - 1; index += 1) {
    const midpoint = getMidpoint(points[index], points[index + 1]);
    commands.push(`Q ${points[index].x} ${points[index].y} ${midpoint.x} ${midpoint.y}`);
  }
  const last = points[points.length - 1];
  commands.push(`L ${last.x} ${last.y}`);
  return commands.join(" ");
};

const buildPolylinePath = (points: Point[]) =>
  points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

const buildCatmullRomPath = (points: Point[]) => {
  if (points.length < 2) return "";
  if (points.length < 3) return buildPolylinePath(points);

  const commands = [`M ${points[0].x} ${points[0].y}`];
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[Math.max(0, index - 1)];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[Math.min(points.length - 1, index + 2)];
    const c1 = {
      x: p1.x + (p2.x - p0.x) / 6,
      y: p1.y + (p2.y - p0.y) / 6,
    };
    const c2 = {
      x: p2.x - (p3.x - p1.x) / 6,
      y: p2.y - (p3.y - p1.y) / 6,
    };
    commands.push(`C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`);
  }
  return commands.join(" ");
};

const getCustomActionPoints = (start: Point, control: Point, end: Point, controlStart?: Point, controlEnd?: Point) => [
  start,
  controlStart ?? getMidpoint(start, control),
  control,
  controlEnd ?? getMidpoint(control, end),
  end,
];

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

const sampleActionPoints = (start: Point, control: Point, end: Point, shape: DiagramActionShape, samples = 15, controlStart?: Point, controlEnd?: Point) => {
  if (shape === "custom") {
    return sampleCatmullRomPoints(getCustomActionPoints(start, control, end, controlStart, controlEnd), samples);
  }

  return Array.from({ length: samples }, (_, index) => {
    const t = index / (samples - 1);
    if (shape === "straight") {
      return interpolatePoint(start, end, t);
    }

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

const getPolylineLength = (points: Point[]) =>
  points.reduce((length, point, index) => {
    if (index === 0) return 0;
    const previous = points[index - 1];
    return length + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);

const getPolylinePointsUntilDistance = (points: Point[], distance: number) => {
  const result: Point[] = points[0] ? [points[0]] : [];
  let traversed = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const next = points[index];
    const segmentLength = Math.hypot(next.x - previous.x, next.y - previous.y);
    if (segmentLength < 0.001) continue;

    if (traversed + segmentLength >= distance) {
      const t = Math.min(1, Math.max(0, (distance - traversed) / segmentLength));
      result.push(interpolatePoint(previous, next, t));
      return result;
    }

    result.push(next);
    traversed += segmentLength;
  }

  return result;
};

const getPolylinePointsBetweenDistances = (points: Point[], startDistance: number, endDistance: number) => {
  const start = getPointAtPolylineDistance(points, startDistance).point;
  const result: Point[] = [start];
  let traversed = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const next = points[index];
    const segmentLength = Math.hypot(next.x - previous.x, next.y - previous.y);
    if (segmentLength < 0.001) continue;

    const segmentEnd = traversed + segmentLength;
    if (segmentEnd > startDistance && segmentEnd < endDistance) {
      result.push(next);
    }
    if (segmentEnd >= endDistance) {
      result.push(getPointAtPolylineDistance(points, endDistance).point);
      return result;
    }
    traversed = segmentEnd;
  }

  result.push(points[points.length - 1]);
  return result;
};

const getPointAtPolylineDistance = (points: Point[], distance: number) => {
  let traversed = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const next = points[index];
    const segmentLength = Math.hypot(next.x - previous.x, next.y - previous.y);
    if (segmentLength < 0.001) continue;

    if (traversed + segmentLength >= distance || index === points.length - 1) {
      const t = Math.min(1, Math.max(0, (distance - traversed) / segmentLength));
      const ux = (next.x - previous.x) / segmentLength;
      const uy = (next.y - previous.y) / segmentLength;
      return {
        point: interpolatePoint(previous, next, t),
        tangent: { x: ux, y: uy },
        normal: { x: -uy, y: ux },
      };
    }

    traversed += segmentLength;
  }

  const fallback = points[points.length - 1] ?? { x: 0, y: 0 };
  return {
    point: fallback,
    tangent: { x: 1, y: 0 },
    normal: { x: 0, y: 1 },
  };
};

const interpolatePoint = (start: Point, end: Point, t: number): Point => ({
  x: start.x + (end.x - start.x) * t,
  y: start.y + (end.y - start.y) * t,
});

const getEndTangent = (start: Point, control: Point, end: Point, shape: DiagramActionShape, controlStart?: Point, controlEnd?: Point): Point => {
  if (shape === "straight") {
    return {
      x: end.x - start.x,
      y: end.y - start.y,
    };
  }

  if (shape === "curved") {
    const bezierControl = getQuadraticControlFromMidpoint(start, control, end);
    return {
      x: end.x - bezierControl.x,
      y: end.y - bezierControl.y,
    };
  }
  if (shape === "custom") {
    const points = sampleActionPoints(start, control, end, shape, 64, controlStart, controlEnd);
    const previous = points[points.length - 2] ?? controlEnd ?? control;
    return {
      x: end.x - previous.x,
      y: end.y - previous.y,
    };
  }

  const tangent = {
    x: end.x - control.x,
    y: end.y - control.y,
  };

  if (Math.hypot(tangent.x, tangent.y) > 0.01) return tangent;

  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
};

const getQuadraticControlFromMidpoint = (start: Point, midpoint: Point, end: Point): Point => ({
  x: 2 * midpoint.x - (start.x + end.x) / 2,
  y: 2 * midpoint.y - (start.y + end.y) / 2,
});

const offsetPointAlongTangent = (point: Point, tangent: Point, distance: number): Point => {
  const length = Math.hypot(tangent.x, tangent.y) || 1;
  return {
    x: point.x + (tangent.x / length) * distance,
    y: point.y + (tangent.y / length) * distance,
  };
};

const ActionHandle = ({
  point,
  role,
  attached = false,
  color = "default",
  onPointerDown,
}: {
  point: Point;
  role: ActionPointRole;
  attached?: boolean;
  color?: "default" | "curve";
  onPointerDown?: (role: ActionPointRole, event: PointerEvent<SVGCircleElement>) => void;
}) => {
  const hitRadius = role === "start" || role === "end" ? 1.75 : 1.15;

  return (
    <g className="cursor-move" data-action-handle-role={role} data-action-handle-color={color}>
      <circle
        cx={point.x}
        cy={point.y}
        r={hitRadius}
        fill="transparent"
        onPointerDown={(event) => onPointerDown?.(role, event)}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={attached ? 0.43 : 0.36}
        fill={attached ? "#2563eb" : color === "curve" ? "#22c55e" : "#ffffff"}
        stroke={attached || color === "curve" ? "#ffffff" : "#f57520"}
        strokeWidth={attached ? 0.16 : 0.13}
        pointerEvents="none"
      />
    </g>
  );
};

const ArrowHead = ({ point, tangent, color, scale = 1 }: { point: Point; tangent: Point; color: string; scale?: number }) => {
  const length = Math.hypot(tangent.x, tangent.y) || 1;
  const ux = tangent.x / length;
  const uy = tangent.y / length;
  const nx = -uy;
  const ny = ux;
  const base = {
    x: point.x - ux * 1.28 * scale,
    y: point.y - uy * 1.28 * scale,
  };
  const left = {
    x: base.x + nx * 0.55 * scale,
    y: base.y + ny * 0.55 * scale,
  };
  const right = {
    x: base.x - nx * 0.55 * scale,
    y: base.y - ny * 0.55 * scale,
  };

  return <path data-testid="creator-action-arrowhead" d={`M ${point.x} ${point.y} L ${left.x} ${left.y} L ${right.x} ${right.y} Z`} fill={color} pointerEvents="none" />;
};

const ShotTarget = ({ point, tangent, color, scale = 1 }: { point: Point; tangent: Point; color: string; scale?: number }) => {
  const radius = 0.9 * scale;
  const length = Math.hypot(tangent.x, tangent.y) || 1;
  const ux = tangent.x / length;
  const uy = tangent.y / length;
  const nx = -uy;
  const ny = ux;
  const spokes = [
    { x: point.x + ux * radius, y: point.y + uy * radius },
    { x: point.x - ux * radius, y: point.y - uy * radius },
    { x: point.x + nx * radius, y: point.y + ny * radius },
    { x: point.x - nx * radius, y: point.y - ny * radius },
  ];

  return (
    <g pointerEvents="none">
      <circle cx={point.x} cy={point.y} r={radius} fill="none" stroke={color} strokeWidth={Math.max(0.07, 0.2 * scale)} />
      {spokes.map((spoke, index) => (
        <line key={index} x1={point.x} x2={spoke.x} y1={point.y} y2={spoke.y} stroke={color} strokeWidth={Math.max(0.06, 0.16 * scale)} />
      ))}
    </g>
  );
};

const HandoffGlyph = ({ point, color, scale = 1 }: { point: Point; color: string; scale?: number }) => (
  <g pointerEvents="none">
    <line x1={point.x - 0.55 * scale} x2={point.x - 0.55 * scale} y1={point.y - 1.05 * scale} y2={point.y + 1.05 * scale} stroke={color} strokeWidth={Math.max(0.07, 0.28 * scale)} />
    <line x1={point.x + 0.55 * scale} x2={point.x + 0.55 * scale} y1={point.y - 1.05 * scale} y2={point.y + 1.05 * scale} stroke={color} strokeWidth={Math.max(0.07, 0.28 * scale)} />
    <line x1={point.x - 1.05 * scale} x2={point.x + 1.05 * scale} y1={point.y} y2={point.y} stroke={color} strokeWidth={Math.max(0.07, 0.28 * scale)} />
  </g>
);

const ScreenCap = ({ end, tangent, color, selected, scale = 1 }: { end: Point; tangent: Point; color: string; selected: boolean; scale?: number }) => {
  const length = Math.hypot(tangent.x, tangent.y) || 1;
  const nx = (-tangent.y / length) * 1.1 * scale;
  const ny = (tangent.x / length) * 1.1 * scale;

  return (
    <line
      x1={end.x - nx}
      y1={end.y - ny}
      x2={end.x + nx}
      y2={end.y + ny}
      stroke={color}
      strokeWidth={Math.max(0.07, (selected ? 0.38 : 0.27) * scale)}
      pointerEvents="none"
    />
  );
};

const Cone = ({ x, y, selected, color = "#f97316", size = 1 }: { x: number; y: number; selected: boolean; color?: string; size?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${size}) translate(${-x} ${-y})`}>
    <path
      d={`M ${x} ${y - 1.15} L ${x - 1} ${y + 1.15} H ${x + 1} Z`}
      fill={color}
      stroke={selected ? "#111111" : "#ffffff"}
      strokeWidth={selected ? 0.26 : 0.14}
    />
    <line x1={x - 0.55} x2={x + 0.55} y1={y + 0.28} y2={y + 0.28} stroke="#ffffff" strokeWidth={0.14} />
  </g>
);

const EditablePlayerLabel = ({
  x,
  y,
  value,
  color,
  kind,
}: {
  x: number;
  y: number;
  value: string;
  color: string;
  kind: Player["kind"];
}) => {
  const displayValue = kind === "defense" ? `X${value}` : value;
  const fontSize = kind === "defense" ? 2.05 : 1.55;
  const cursorX = x + Math.max(0.16, displayValue.length * fontSize * 0.28);

  return (
    <g>
      <text
        x={x}
        y={y + (kind === "defense" ? 0.5 : 0.44)}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={900}
        fill={color}
        className="select-none"
      >
        {displayValue}
      </text>
      <line x1={cursorX} x2={cursorX} y1={y - 1.05} y2={y + 1.05} stroke="#f57520" strokeWidth={0.18} />
    </g>
  );
};

const getDefenseStanceGeometry = (player: Player, project: (point: Point) => Point) => {
  const facingAngle = ((player.angle ?? 0) * Math.PI) / 180;
  const direction = { x: -Math.sin(facingAngle), y: Math.cos(facingAngle) };
  const normal = { x: -direction.y, y: direction.x };
  const point = (along: number, across = 0) => project({
    x: player.x + direction.x * along + normal.x * across,
    y: player.y + direction.y * along + normal.y * across,
  });

  return {
    leftInner: point(-1.28, 0),
    leftControl: point(-2.2, -0.08),
    leftOuter: point(-3.2, -0.48),
    rightInner: point(1.28, 0),
    rightControl: point(2.2, -0.08),
    rightOuter: point(3.2, -0.48),
    selectionBox: [point(-3.55, -1.35), point(3.55, -1.35), point(3.55, 1.35), point(-3.55, 1.35)],
    rotationLineStart: point(0, 1.35),
    rotationHandle: point(0, 3.25),
  };
};

const TextObject = ({
  x,
  y,
  text,
  selected,
  color = "#111827",
  fontSize = 1.9,
  bold = false,
  italic = false,
  underline = false,
  align = "center",
  editing,
  editingText = "",
  cursorIndex = editingText.length,
  selectionRange = null,
}: {
  x: number;
  y: number;
  text: string;
  selected: boolean;
  color?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: "left" | "center" | "right" | "justify";
  editing?: boolean;
  editingText?: string;
  cursorIndex?: number;
  selectionRange?: TextSelectionRange | null;
}) => {
  const displayText = editing ? editingText : text;
  const metrics = getApproxTextMetrics(displayText, fontSize);
  const clampedCursorIndex = Math.min(displayText.length, Math.max(0, cursorIndex));
  const cursorPosition = getCursorPosition(displayText, clampedCursorIndex, fontSize, align, { x, y });
  const normalizedSelection = editing
    ? getNormalizedTextObjectSelection(selectionRange, displayText.length)
    : null;
  const hasSelection = normalizedSelection && normalizedSelection.start !== normalizedSelection.end;
  const selectionRects = hasSelection
    ? getTextSelectionRects(displayText, normalizedSelection, fontSize, align, { x, y })
    : [];
  const textAnchor = align === "center" ? "middle" : align === "right" ? "end" : "start";

  return (
    <g>
      {selected && (
        <rect
          x={x - Math.max(3.2, metrics.width / 2 + 0.8)}
          y={y + metrics.top - 0.45}
          width={Math.max(6.4, metrics.width + 1.6)}
          height={metrics.height + 0.9}
          rx={0.35}
          fill="#f5752033"
        />
      )}
      {editing && (
        <rect
          x={x - Math.max(4.2, metrics.width / 2 + 1)}
          y={y + metrics.top - 0.65}
          width={Math.max(8.4, metrics.width + 2)}
          height={metrics.height + 1.3}
          rx={0.35}
          fill="#ffffffdd"
          stroke="#f57520"
          strokeWidth={0.16}
        />
      )}
      {selectionRects.map((rect, index) => (
        <rect key={index} x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={0.12} fill="#f5752040" />
      ))}
      <text
        textAnchor={textAnchor}
        fontSize={fontSize}
        fontWeight={bold ? 800 : 500}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : undefined}
        fill={color}
        className="select-none"
      >
        {metrics.lines.map((line, index) => {
          const isJustified = align === "justify" && index < metrics.lines.length - 1 && line.includes(" ");
          return (
            <tspan
              key={index}
              x={getTextLineAnchorX({ x, y }, metrics, line, align)}
              y={y + metrics.firstBaseline + index * metrics.lineHeight}
              textLength={isJustified ? metrics.width : undefined}
              lengthAdjust={isJustified ? "spacing" : undefined}
            >
              {line || " "}
            </tspan>
          );
        })}
      </text>
      {editing && (
        <line
          x1={cursorPosition.x}
          x2={cursorPosition.x}
          y1={cursorPosition.y - fontSize * 0.86}
          y2={cursorPosition.y + fontSize * 0.26}
          stroke="#f57520"
          strokeWidth={0.12}
        />
      )}
    </g>
  );
};

const getNormalizedTextObjectSelection = (selection: TextSelectionRange | null, textLength: number): TextSelectionRange | null => {
  if (!selection) return null;

  const start = Math.min(textLength, Math.max(0, Math.min(selection.start, selection.end)));
  const end = Math.min(textLength, Math.max(0, Math.max(selection.start, selection.end)));
  return { start, end };
};

const getTextCursorIndex = (
  text: string,
  fontSize: number,
  align: "left" | "center" | "right" | "justify",
  origin: Point,
  clickPoint: Point,
) => {
  const metrics = getApproxTextMetrics(text, fontSize);
  const lineIndex = Math.min(
    metrics.lines.length - 1,
    Math.max(0, Math.round((clickPoint.y - (origin.y + metrics.firstBaseline)) / metrics.lineHeight)),
  );
  const line = metrics.lines[lineIndex] ?? "";
  const left = getTextLineLeft(origin, metrics, line, align);
  const column = Math.min(line.length, Math.max(0, Math.round((clickPoint.x - left) / metrics.charWidth)));

  return metrics.lines.slice(0, lineIndex).reduce((index, previousLine) => index + previousLine.length + 1, 0) + column;
};

const getWordSelectionRange = (text: string, cursorIndex: number): TextSelectionRange | null => {
  if (!text.trim()) return null;

  const clampedIndex = Math.min(text.length, Math.max(0, cursorIndex));
  const seedIndex = Math.min(text.length - 1, Math.max(0, clampedIndex === text.length ? clampedIndex - 1 : clampedIndex));
  if (!/\S/.test(text[seedIndex] ?? "")) return null;

  let start = seedIndex;
  let end = seedIndex + 1;

  while (start > 0 && /\S/.test(text[start - 1])) start -= 1;
  while (end < text.length && /\S/.test(text[end])) end += 1;

  return { start, end };
};

const getApproxTextMetrics = (text: string, fontSize: number) => {
  const charWidth = Math.max(0.38, fontSize * 0.6);
  const lineHeight = fontSize * 1.24;
  const lines = text.split("\n");
  const width = Math.max(charWidth, ...lines.map((line) => line.length * charWidth));
  const height = Math.max(lineHeight, lines.length * lineHeight);

  return {
    charWidth,
    lineHeight,
    lines,
    width,
    height,
    top: 0 - height / 2,
    firstBaseline: 0 - height / 2 + fontSize,
  };
};

const getTextLineAnchorX = (
  origin: Point,
  metrics: ReturnType<typeof getApproxTextMetrics>,
  line: string,
  align: "left" | "center" | "right" | "justify",
) => {
  if (align === "center") return origin.x;
  if (align === "right") return origin.x + metrics.width / 2;
  if (align === "justify") return origin.x - metrics.width / 2;
  return origin.x - metrics.width / 2;
};

const getTextLineLeft = (
  origin: Point,
  metrics: ReturnType<typeof getApproxTextMetrics>,
  line: string,
  align: "left" | "center" | "right" | "justify",
) => {
  const lineWidth = Math.max(metrics.charWidth, line.length * metrics.charWidth);
  if (align === "center") return origin.x - lineWidth / 2;
  if (align === "right") return origin.x + metrics.width / 2 - lineWidth;
  return origin.x - metrics.width / 2;
};

const getCursorPosition = (
  text: string,
  cursorIndex: number,
  fontSize: number,
  align: "left" | "center" | "right" | "justify",
  origin: Point,
): Point => {
  const metrics = getApproxTextMetrics(text, fontSize);
  const { lineIndex, column } = getLineColumnFromIndex(metrics.lines, cursorIndex);
  const line = metrics.lines[lineIndex] ?? "";
  const left = getTextLineLeft(origin, metrics, line, align);

  return {
    x: left + column * metrics.charWidth + (column > 0 ? fontSize * 0.06 : 0),
    y: origin.y + metrics.firstBaseline + lineIndex * metrics.lineHeight,
  };
};

const getTextSelectionRects = (
  text: string,
  selection: TextSelectionRange,
  fontSize: number,
  align: "left" | "center" | "right" | "justify",
  origin: Point,
) => {
  const metrics = getApproxTextMetrics(text, fontSize);
  const rects: Array<{ x: number; y: number; width: number; height: number }> = [];
  let lineStartIndex = 0;

  metrics.lines.forEach((line, lineIndex) => {
    const lineEndIndex = lineStartIndex + line.length;
    const start = Math.max(selection.start, lineStartIndex);
    const end = Math.min(selection.end, lineEndIndex);

    if (start < end) {
      const left = getTextLineLeft(origin, metrics, line, align);
      rects.push({
        x: left + (start - lineStartIndex) * metrics.charWidth,
        y: origin.y + metrics.firstBaseline + lineIndex * metrics.lineHeight - fontSize * 0.92,
        width: Math.max(0.3, (end - start) * metrics.charWidth),
        height: fontSize * 1.16,
      });
    }

    lineStartIndex = lineEndIndex + 1;
  });

  return rects;
};

const getLineColumnFromIndex = (lines: string[], cursorIndex: number) => {
  let remaining = Math.max(0, cursorIndex);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const lineLength = lines[lineIndex]?.length ?? 0;
    if (remaining <= lineLength) return { lineIndex, column: remaining };
    remaining -= lineLength + 1;
  }

  const lineIndex = Math.max(0, lines.length - 1);
  return { lineIndex, column: lines[lineIndex]?.length ?? 0 };
};

const getMidpoint = (start: Point, end: Point): Point => ({
  x: (start.x + end.x) / 2,
  y: (start.y + end.y) / 2,
});
