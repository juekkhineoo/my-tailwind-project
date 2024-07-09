export default function SplicePoints(points:number[]){
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < points.length; i += chunkSize) {
      const chunk = points.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
}