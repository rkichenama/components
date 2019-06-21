/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
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
  'element',
  'Function',
  'ReactNode',
  'boolean'
].reduce((defs, fn) => ({
  ...defs,
  [fn]: () => <span className='data-type'>{ fn[0].toUpperCase() + fn.slice(1) }</span>
}), {});

// handlers
const handlers = {
  ...identities,
  instanceOf: val => <span>instances of <span className='data-type'>{val}</span></span>,
  bool: () => <span className='data-type'>Boolean</span>,
  func: () => <span className='data-type'>Function</span>,
  shape: val => (
    <span>
      <span className='data-type'>Objects</span> with shape {`{`} {
        /object/.test(typeof val)
          ? Object.keys(val).map(
            (key, _, __, {
              name, value, required, ...others
            } = val[key]) => <div key={key}>
              <span className='variable-name'>{key}</span>: {required ? 'required ': ''}{handlers[name](value, others)}
            </div>)
          : val
      } {`}`}
    </span>
  ),
  // 'oneOf'
  enum: list => {
    let result;
    if (Array.isArray(list)) {
      result = <span>[ {
        list
          .map(({ value }, i) => <span key={i}><span className='variable-name'>{value}</span>,<br /></span>)
      } ]</span>;
    } else {
      result = <span>computed from <span className='data-type'>{list}</span></span>;
    }
    return <span>values {result}</span>;
  },
  // 'oneOfType'
  union: list => <span>
    one of [<br />{
      list
        .map(
          ({ name, value, ...others }, i) => <span key={i}>{handlers[name](value, others)},<br /></span>
        )
    } ]
  </span>,
  // dev designed type
  custom: (_, { raw }) => <span className='data-type'>{raw}</span>,
  arrayOf: ({ name, value, required }) => <span>{required ? 'required ': ''}<span className='data-type'>Array</span> of {handlers[name](value)}</span>,
  objectOf: ({ name, value, required }) => <span>{required ? 'required ': ''}<span className='data-type'>Object</span> of {handlers[name](value)}</span>,
};


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
/* eslint-enable react/prop-types */
/* eslint-enable react/display-name */
