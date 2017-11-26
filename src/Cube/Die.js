import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Die.scss';

const Die = ({value} => (
  <div className="die" value={value.toString()}>
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
  </div>
);

Die.propTypes = {
  value: PropTypes.number
};

Die.defaultProps = {
  value: 1
};

export default Die;
