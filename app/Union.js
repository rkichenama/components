export const Union = types => types.reduce((prev, type) => ({
  ...prev,
  [type]: data => ({
    match: fns => fns[type](data),
  })
}), {});

const passThrough = [
  'any',
  'number',
  'string',
  'object',
  'array',
  'symbol',
  'node',
  'element'
];

const handled = [
  'shape',
  'arrayOf',
  // 'oneOf',
  // 'objectOf',
  // 'oneOfType'
  'bool',
  'func',
];

const allOfThem = [
  ...passThrough, ...handled
];

// PropTypes[type.name](type.value)
const PropsTypes = Union(allOfThem);

// identity functions
const identities = passThrough.reduce((defs, fn) => ({...defs, [fn]: () => `${
  fn[0].toUpperCase() + fn.slice(1)
}`}), {});

// handlers
const handlers = {
  ...identities,
  bool: () => `Boolean`,
  func: () => `Function`,
  shape: (val) => `Objects with shape { ${
    Object.keys(val).map(
      (key, _, __, {
        name, value, required
      } = val[key]) => `${key}: ${required ? 'required ': ''}${handlers[name](value)}`)
      .join(', ')
  } }`,
  arrayOf: ({ name, value, required }) => `${required ? 'required ': ''}Array of ${handlers[name](value)}`,
}

let result = [
  'arrayOf'
].map(k => PropsTypes[k]({
  "name": "shape",
  "value": {
    "size": {
      "name": "number",
      "required": false
    },
    "name": {
      "name": "string",
      "required": false
    },
    "tree": {
      "name": "array",
      "required": false
    }
  }
}).match(handlers));

result
