export function getAverage(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const average = sum / arr.length;
  return average.toFixed(2);
}

export function getMedian(arr) {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
    return sortedArr[mid];
  }
}
