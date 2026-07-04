import type { CourtSize, CourtTemplate, Point } from "../types";

export type CourtSpec = {
  id: CourtTemplate;
  label: string;
  unit: "ft" | "m";
  length: number;
  width: number;
  backboardOffset: number;
  rimOffset: number;
  keyLength: number;
  keyWidth: number;
  freeThrowRadius: number;
  centerCircleRadius: number;
  restrictedRadius?: number;
  threePointRadius: number;
  threePointCornerDistance?: number;
  threePointStraightLength?: number;
};

export const courtSpecs: Record<CourtTemplate, CourtSpec> = {
  nba: {
    id: "nba",
    label: "NBA",
    unit: "ft",
    length: 94,
    width: 50,
    backboardOffset: 4,
    rimOffset: 5.25,
    keyLength: 19,
    keyWidth: 16,
    freeThrowRadius: 6,
    centerCircleRadius: 6,
    restrictedRadius: 4,
    threePointRadius: 23.75,
    threePointCornerDistance: 22,
    threePointStraightLength: 14,
  },
  ncaa: {
    id: "ncaa",
    label: "NCAA",
    unit: "ft",
    length: 94,
    width: 50,
    backboardOffset: 4,
    rimOffset: 5.25,
    keyLength: 19,
    keyWidth: 12,
    freeThrowRadius: 6,
    centerCircleRadius: 6,
    restrictedRadius: 4,
    threePointRadius: 22.1458,
    threePointCornerDistance: 21.65,
    threePointStraightLength: 9.86,
  },
  "high-school": {
    id: "high-school",
    label: "High School",
    unit: "ft",
    length: 84,
    width: 50,
    backboardOffset: 4,
    rimOffset: 5.25,
    keyLength: 19,
    keyWidth: 12,
    freeThrowRadius: 6,
    centerCircleRadius: 6,
    threePointRadius: 19.75,
  },
  fiba: {
    id: "fiba",
    label: "FIBA",
    unit: "ft",
    length: 91.86,
    width: 49.21,
    backboardOffset: 3.94,
    rimOffset: 5.25,
    keyLength: 19,
    keyWidth: 16.08,
    freeThrowRadius: 5.9,
    centerCircleRadius: 5.9,
    restrictedRadius: 4.1,
    threePointRadius: 22.15,
    threePointCornerDistance: 21.65,
    threePointStraightLength: 9.97,
  },
};

export type CourtView = {
  spec: CourtSpec;
  length: number;
  width: number;
  viewBox: string;
  centerX: number;
  hoopX: number;
  farHoopX: number;
  margin: number;
};

export const getCourtView = (template: CourtTemplate, size: CourtSize, marginOverride?: number): CourtView => {
  const spec = courtSpecs[template];
  const length = size === "half" ? spec.length / 2 : spec.length;
  const defaultMargin = spec.unit === "m" ? 0.45 : 1.1;
  const margin = Math.min(4, Math.max(0, marginOverride ?? defaultMargin));

  return {
    spec,
    length,
    width: spec.width,
    viewBox: `${-margin} ${-(spec.width / 2 + margin)} ${length + margin * 2} ${spec.width + margin * 2}`,
    centerX: spec.length / 2,
    hoopX: spec.rimOffset,
    farHoopX: spec.length - spec.rimOffset,
    margin,
  };
};

export const formatPoint = (point: Point) => `${point.x.toFixed(2)}, ${point.y.toFixed(2)}`;

export const buildArcPath = (
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(center, radius, startAngle);
  const end = polarToCartesian(center, radius, endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweep = endAngle > startAngle ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`;
};

const polarToCartesian = (center: Point, radius: number, angleDegrees: number): Point => {
  const angle = (angleDegrees * Math.PI) / 180;
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
  };
};

