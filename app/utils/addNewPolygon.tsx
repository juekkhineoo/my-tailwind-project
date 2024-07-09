import { PolygonData } from "../types/polygontypes";
import AbsoluteToRelativePoints from "./absoluteToRelativePoints";
import UniqueSet from "./uniqueSet";

export default function AddNewPolygons(
  addCirclePoints: number[],
  x: number,
  y: number,
  polygonList: PolygonData[],
  imgWidth: number,
  imgHeight: number
) {
  addCirclePoints.splice(addCirclePoints.length, 2, x, y); // Inserts at index flattenedArray.length
  const convertabsolutepoint = AbsoluteToRelativePoints(
    addCirclePoints,
    [0, 0],
    imgWidth,
    imgHeight
  );
  const updateCircle = UniqueSet(convertabsolutepoint);
  const updateLine = convertabsolutepoint.flat();
  const addPolygon: PolygonData[] = [
    ...polygonList,
    {
      key: polygonList.length + 1,
      startPoint: { x: x, y: y },
      polyPoints: updateLine,
      circlePoints: updateCircle,
      origin: [0, 0],
    },
  ];

  return {
    addCurclePoints : addCirclePoints,
    polygons: addPolygon
  }
}
