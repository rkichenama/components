import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ({children, onClick, flipped, className}) => {
  const kids = Children.toArray(children).slice(0, 2);

  return (
    <div className={`card${flipped ? ' flipped' : ''} ${className}`}>
      <div className='flip' onClick={onClick}>
        <div className='front'>{ kids.length > 1 ? kids[0] : null }</div>
        <div className='back'>{ kids.length === 2 ? kids[1] : null }</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
  className: PropTypes.string
};

const noop = () => {};

Card.defaultProps = {
  flipped: false,
  onClick: noop,
  className: ''
};

export default Card;
