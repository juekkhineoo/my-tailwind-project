export interface StartPoint {
  x: number;
  y: number;
}

export interface CircleData {
  key: number;
  points: { x: number; y: number };
}

export interface PolygonData {
  key: number;
  startPoint: StartPoint;
  linePoints: number[];
  circlePoints: CircleData[];
  origin: [x: number, y: number];
}
