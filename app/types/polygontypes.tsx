export interface StartPoint {
  x: number;
  y: number;
}

export interface PolygonData {
  key: number;
  startPoint: StartPoint;
  polyPoints: number[];
  circlePoints: number[][];
  origin: [x: number, y: number];
}
