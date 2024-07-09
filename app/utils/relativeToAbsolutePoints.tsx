import Denormalize from "./denormalizePoint";
import SplicePoints from "./splicPoints";
import UniqueSet from "./uniqueSet";

export default function RelativeToAbsolutePoints (
    absolutePoints: number[],
    origin: [number, number],
    imgWidth: number,
    imgHeight: number
  ) {
    const splice = SplicePoints(absolutePoints);
    const uniqueArray = UniqueSet(splice);
    return uniqueArray.map((rePoint) => {
      const xpoint = Denormalize(rePoint[0], origin[0], imgWidth);
      const ypoint = Denormalize(rePoint[1], origin[1], imgHeight);
      return [xpoint, ypoint];
    });
  };