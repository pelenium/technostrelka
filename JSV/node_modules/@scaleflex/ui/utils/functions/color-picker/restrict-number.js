export function restrictNumber(number) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 ? arguments[2] : undefined;
  // we are not assigning default value for it as if max was null it will override the default value.
  var currentMax = max || 1000000;
  var convertedNumber = +number;
  return Math.min(Math.max(min, convertedNumber), currentMax);
}