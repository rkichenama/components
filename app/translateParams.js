import React from 'react';

const CapitalCase = str => str
  .split(/ +/)
  .map(s => `${ s[0].toUpperCase() }${ s.slice(1) }`)
  .join(' ');

const process = ({
  name, description = false, type: { name: kind = 'Object' } = {}
}) => (
  <span>
    <span className='data-type'>({ CapitalCase(kind) })&nbsp;</span>
    {
      name
        ? <span className='variable-name'>{ name }&nbsp;</span>
        : null
    }
    {
      description
        ? <span className='variable-desc'>{`-> ${description}`}</span>
        : null
    }
  </span>
);

export default process;

// quokka test
// let result = process({
//   "name": "props",
//   "description": "component props",
//   "type": {
//     "name": "Object"
//   }
// });

// result
