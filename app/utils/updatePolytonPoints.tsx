import { PolygonData } from "../types/polygontypes";
import AbsoluteToRelativePoints from "./absoluteToRelativePoints";

export default function UpdatePolygonPoints (
    updateLinePoints: number[],
    updateCirclePoints: number[],
    polygonList: PolygonData[],
    imgWidth: number,
    imgHeight: number
  ) {
    const addCirclesInPolygon = polygonList.map((poly) => {
      if (poly.key == polygonList.length) {
        const convertAbsoluteLinePoint = AbsoluteToRelativePoints(
          updateLinePoints,
          poly.origin,
          imgWidth,
          imgHeight
        );
        const convertAbsoluteCirclePoint = AbsoluteToRelativePoints(
          updateCirclePoints,
          poly.origin,
          imgWidth,
          imgHeight
        );
        const updatePolyPoints = convertAbsoluteLinePoint.flat();
        return {
          ...poly,
          polyPoints: updatePolyPoints,
          circlePoints: convertAbsoluteCirclePoint,
        };
      }
      return poly;
    });
    return addCirclesInPolygon;
  };