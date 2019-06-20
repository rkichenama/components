const mergeStringKeyValues: string[] = [ 'className' ];

export const mergeProps = (base, ...attributes: object[]): (object | never) => {
  if (!base || !attributes.length) { throw new Error('must merge at least 2 objects') }

  const [ properties, ...rest ] = attributes;
  if (rest.length) {
    // @ts-ignore-next-line
    return rest.reduce(
      (acc, curr) => mergeProps(acc, curr),
      mergeProps(base, properties)
    );
  }

  const result: object = Object.assign({}, base);
  Object.entries(properties)
    .forEach(([ k, v ]) => {
      result[k] = mergeStringKeyValues.includes(k)
        ? [result[k], v].filter(i => !!i).join(' ')
        : v;
    });
  return result;
};

const o = { 'className': 'sparta'};
const p = { 'className': 'sparta1', 'cortana': true};
const r = { 'className': 'sparta1', 'cortana': 45 };

let a;
a = mergeProps( o, p, r );
a;
a = mergeProps( o, p );
a;
// a = mergeProps( o );
// a = mergeProps();
// a;
// a;