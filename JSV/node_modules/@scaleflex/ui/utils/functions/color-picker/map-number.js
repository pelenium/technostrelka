export function mapNumber(number, oldMin, oldMax, newMin, newMax) {
  return (number - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
}