const BoundsCheck = (len, a, b) => {
  if (Math.min(a, b) < 0 || Math.max(a, b) >= len) {
    throw Error(`Requested index is out of bounds: ${a}, ${b}`);
  }
};

const swap = (array, a, b) => ([
  ...array.slice(0, a),
  array[b],
  ...array.slice(a + 1, b),
  array[a],
  ...array.slice(b + 1)
]);

// insert into b, the value of a, shifting over
const insert = (array, a, b) => ([
  // the unchanged order before a target
  ...array.slice(0, Math.min(a, b)),
  ...((b < a) ?
    // move down, then shift up
    [array[a], ...array.slice(b, a)] :
    // shift down, then move up
    [...array.slice(a + 1, b + 1), array[a]]),
  // the unchanged order after a target
  ...array.slice(Math.max(a, b) + 1)
]);

const Helper = array => ({
  // make iterable
  [Symbol.iterator]: function* () { for (let i of array) yield i; },
  // swap positions of src and dest
  swap (src, dest) {
    BoundsCheck(array.length, src, dest);
    if (src !== dest) {
      array = swap(array, ...[src, dest].sort((a, b) => a - b));
    }
  },
  // insert from at place to, shifting right where necessary
  insert (from, to) {
    BoundsCheck(array.length, from, to);
    if (from !== to) {
      array = insert(array, from, to);
    }
  },
});

const Proxifier = (array, helpers = Helper(array)) => (
  new Proxy(array, {
    get (target, key, proxy) {
      if (Object.keys(helpers).includes(key)) {
        return helpers[key];
      }
      return Reflect.get(target, key, proxy);
    },
    set (target, key, value) {
      if (Object.keys(helpers).includes(key)) {
        throw new Error(`Unable to change value of ${key}`);
      }
      return Reflect.set(target, key, value);
    }
  })
);

const ArrayProxyFactory = (array = []) => Proxifier(array);

export default ArrayProxyFactory;
