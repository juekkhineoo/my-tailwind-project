import Normalize from "./normalizePoints";
import SplicePoints from "./splicPoints";
import UniqueSet from "./uniqueSet";

export default function AbsoluteToRelativePoints (
    relativePoints: number[],
    origin: [number, number],
    imgWidth: number,
    imgHeight: number
  ) {
    const splice = SplicePoints(relativePoints);
    const uniqueArray = UniqueSet(splice);
    return uniqueArray.map((rePoint) => {
      const xpoint = Normalize(rePoint[0], origin[0], imgWidth);
      const ypoint = Normalize(rePoint[1], origin[1], imgHeight);
      return [xpoint, ypoint];
    });
  };