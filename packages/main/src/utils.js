import throttle from "lodash.throttle";
import { memoizeWith, identity } from "ramda";
export const deleteInPlace = (el, arr) => arr.splice(arr.indexOf(el), 1);

export const memoizedThrottle = function (func, wait = 0, options = {}) {
  var mem = memoizeWith(options.resolver || identity, function () {
    return throttle(func, wait, options);
  });
  return function () {
    mem.apply(this, arguments).apply(this, arguments);
  };
};
