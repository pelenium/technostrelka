import _defineProperty from "@babel/runtime/helpers/defineProperty";
export var record = function record(keys, valueType) {
  return keys.reduce(function (toObject, key) {
    return Object.assign(toObject, _defineProperty({}, key, valueType));
  }, {});
};