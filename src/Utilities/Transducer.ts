/**
 * Transducers are helpful for large datasets with a large number of transformations that are done.
 */
const Transducer = {
  map: (transform: Function) =>
    (reducer: Function) =>
      (t: any, c: any) => reducer(t, transform(c)),
  filter: (predicate: Function) =>
    (reducer: Function) =>
      (t: any, c: any) => (predicate(c) ? reducer(t, c) : t)
};

module.exports = Transducer;
