export default function Normalize(point: number, origin: number, size: number) {
    const absolute = point + origin;
    const normalize = absolute / size;
    return Math.round(normalize * 10000) / 10000;
  };