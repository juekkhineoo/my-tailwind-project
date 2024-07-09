export default function Denormalize (point: number, origin: number, imgSize: number) {
    return point * imgSize - origin;
  };