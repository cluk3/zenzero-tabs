import throttle from "lodash.throttle";
import { memoizeWith, identity, compose, head, match } from "ramda";
export const deleteInPlace = (el, arr) => {
  const elIndex = arr.indexOf(el);
  elIndex > -1 && arr.splice(elIndex, 1);
  return arr;
};

export const memoizedThrottle = function (func, wait = 0, options = {}) {
  var mem = memoizeWith(options.resolver || identity, function () {
    return throttle(func, wait, options);
  });
  return function () {
    mem.apply(this, arguments).apply(this, arguments);
  };
};

export const extractNumericId = compose(Number, head, match(/\d+$/g));
