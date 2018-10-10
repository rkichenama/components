/* create a curry function awaiting the rest of the paramters */
export const curry = (fn, arity = fn.length) => {
  const curried = (...args) => {
    if (args.length >= arity) {
      return fn(...args);
    }
    let params = [...args];
    return (...args) => curried(...[...params, ...args]);
  };
  return curried;
};
/* create a function that melds from right to left */
export const compose = (...fns) => x => fns.reduceRight((val, fn) => (fn(val)), x);
/* create a function that melds from left to right */
export const pipe = (...fns) => x => fns.reduce((val, fn) => (fn(val)), x);
/* create a function takes the values from 2 functions and passes them into a third */
export const fork = (c, b, a) => x => c(b(x), a(x));
/* in an array, return the value of the given key for each element */
export const select = key => list => list.map(({ [key]: value }) => value);
