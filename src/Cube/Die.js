import React from 'react';
import PropTypes from 'prop-types';

import './Die.scss';

const Dots = (n => {
  const dots = [];
  for (let i = 0; i < n; i++) {
    dots[i] = (
      <div className='dot' key={i} />
    );
  }
  return dots;
})(9);

const Die = ({value}) => (
  <div className='die' value={`${value}`}>
    { Dots }
  </div>
);

Die.propTypes = {
  value: PropTypes.number
};

Die.defaultProps = {
  value: 1
};

export default Die;
