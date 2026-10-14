import { useState } from "react";
import type { CourtSize, DiagramObject, Point } from "../types";

type CourtImageProps = {
  object: Extract<DiagramObject, { type: "image" }>;
  center: Point;
  courtSize: CourtSize;
  selected?: boolean;
};

// The Creator embeds optimized PNGs so published diagrams do not rely on signed URLs.
const isEmbeddedCourtImage = (source: unknown): source is string =>
  typeof source === "string" && source.length <= 550_000 && /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(source);

export const CourtImage = ({ object, center, courtSize, selected = false }: CourtImageProps) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = object.image?.dataUrl;
  const ready = isEmbeddedCourtImage(source) && source !== failedSource;
  const width = courtSize === "full-horizontal" ? object.width : object.height;
  const height = courtSize === "full-horizontal" ? object.height : object.width;
  const labelScale = Math.min(1, width / 12, height / 8);

  return (
    <g data-testid="creator-shape-image" data-image-object-id={object.id} transform={`translate(${center.x} ${center.y}) rotate(${-(object.angle ?? 0)})`}>
      <rect x={-width / 2} y={-height / 2} width={width} height={height}
        fill={ready ? "transparent" : "#f8fafc"} stroke={!ready || selected ? "#64748b" : "none"}
        strokeWidth={0.12} strokeDasharray="0.5 0.35" />
      {ready ? (
        <image href={source} x={-width / 2} y={-height / 2} width={width} height={height}
          opacity={object.opacity ?? 1} preserveAspectRatio="xMidYMid meet" pointerEvents="none"
          onError={() => setFailedSource(source)}>
          <title>{object.image?.name || "Court image"}</title>
        </image>
      ) : (
        <text transform={`scale(${labelScale})`} textAnchor="middle" dominantBaseline="middle"
          fontSize={0.95} fontWeight={600} fill="#475569">
          {source ? "Image unavailable" : "Image"}
        </text>
      )}
    </g>
  );
};
