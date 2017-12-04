import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Deck.scss';

const Deck = ({children, className}) => (
  <div className={`deck ${className}`}>
    { children }
  </div>
);

Deck.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Deck.displayName = 'Deck';

Deck.defaultProps = {
  className: ''
};

export default Deck;
