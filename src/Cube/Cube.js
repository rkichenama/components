import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Cube.scss';

const Cube = ({children, onClick, flipped, className}) => {
  const kids = Children.toArray(children).slice(0, 6);

  return (
    <div className={`cube ${className}`}>
      <div className='flip' onClick={onClick}>
        {
          [
            'front', 'back', 'left', 'right', 'top', 'bottom'
          ].map((side, s) => (
            <div className={side} key={s}>{kids[s] || null }</div>
          ))
        }
      </div>
    </div>
  );
}

Cube.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
  className: PropTypes.string
};

const noop = () => {};

Cube.defaultProps = {
  flipped: false,
  onClick: noop,
  className: ''
}

export default Cube;
