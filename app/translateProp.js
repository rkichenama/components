import Union from './Union';

// identity functions
const identities = [
  'any',
  'number',
  'string',
  'object',
  'array',
  'symbol',
  'node',
  'element'
].reduce((defs, fn) => ({
  ...defs,
  [fn]: () => `${ fn[0].toUpperCase() + fn.slice(1) }`
}), {});

// handlers
const handlers = {
  ...identities,
  instanceOf: val => `instances of ${val}`,
  bool: () => `Boolean`,
  func: () => `Function`,
  shape: val => `Objects with shape { ${
    /object/.test(typeof val)
      ? Object.keys(val).map(
        (key, _, __, {
          name, value, required, ...others
        } = val[key]) => `${key}: ${required ? 'required ': ''}${handlers[name](value, others)}`)
        .join(', ')
      : val
  } }`,
  // 'oneOf'
  enum: list => {
    let result;
    if (Array.isArray(list)) {
      result = `[ ${
        list
          .map(({ value }) => `'${value}'`)
          .join(', ')
      } ]`;
    } else {
      result = `computed from ${list}`;
    }
    return `values ${result}`;
  },
  // 'oneOfType'
  union: list => `one of [ ${
    list
      .map(
        ({ name, value, ...others }) => handlers[name](value, others)
      )
      .join(', ')
  } ]`,
  // dev designed type
  custom: (_, { raw }) => `'${raw}' type`,
  arrayOf: ({ name, value, required }) => `${required ? 'required ': ''}Array of ${handlers[name](value)}`,
  objectOf: ({ name, value, required }) => `${required ? 'required ': ''}Object of ${handlers[name](value)}`,
}


const PropsTypes = Union(Object.keys(handlers));

const process = ({ name, value, ...others }) => {
  if (PropsTypes[name]) { return PropsTypes[name](value, others).match(handlers) }
  return name;
};

export default process;

// quokka test
// let result = process({
//   name: 'shape',
//   value: {
//     foo: {
//       name: 'string',
//       required: true,
//     },
//     bar: {
//       name: 'bool',
//       required: false,
//     },
//   },
// });

// result
