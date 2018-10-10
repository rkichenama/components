export const Proxifier = (array, helpers = {}) => (
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

export const dotProduct = (a, b) => {
  if (a[0].length !== b.length) { throw new Error('Unable to multiply') }
  const columns = b[0].length;
  return a.map(left => {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let v = left.reduce((t, l, i) => t + (l * b[i][c]), 0);
      row.push(v);
    }
    return row;
  });
};
/*
[
  [x],
  [y],
  [1]
]
[// translation
  [1, 0, x],
  [0, 1, y],
  [0, 0, 1]
]


matrix(
  a, b, c,
  d, tx, ty,
  0, 0, 1
)
is a shorthand for
matrix3d(
  a, b, 0, 0,
  c, d, 0, 0,
  0, 0, 1, 0,
  tx, ty, 0, 1
)
*/
