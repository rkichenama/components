import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Cube.scss';

const Cube = ({children, onClick, face, className}) => {
  const kids = Children.toArray(children).slice(0, 6);

  return (
    <div className={`cube ${face} ${className}`}>
      <div className='flip' onClick={onClick}>
        {
          Cube.Faces.map((side, s) => (
            <div className={`side ${side}`} key={s}>{kids[s] || null }</div>
          ))
        }
      </div>
    </div>
  );
}

const firstLetter = str => `${str[0].toUpperCase()}${str.slice(1)}`;
const faces = [
  'front',
  'back',
  'left',
  'right',
  'top',
  'bottom',
];
Cube.Faces = faces;
faces.forEach(face => Cube[firstLetter(face)] = face);

Cube.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  face: PropTypes.oneOf(faces),
  className: PropTypes.string
};

const noop = () => {};

Cube.defaultProps = {
  flipped: false,
  onClick: noop,
  face: 'front',
  className: ''
}


export default Cube;
