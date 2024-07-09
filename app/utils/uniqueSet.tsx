export default function UniqueSet(set: number[][]) {
  // Convert the array to a Set to remove duplicates
  var uniqueSet = new Set<string>(set.map((arr) => JSON.stringify(arr)));
  // Convert the Set back to an array
  var uniqueArray = Array.from(uniqueSet).map((item) => JSON.parse(item));
  return uniqueArray;
}
