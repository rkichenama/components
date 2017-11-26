import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Deck.scss';

export default class Deck extends Component {
  constructor (...args) {
    super(...args);
    [

    ].map(fn => (this[fn] = this[fn].bind(this)));
  }
  render () {
    return (
      <div className='deck'>
        { this.props.children }
      </div>
    );
  }
}

Deck.propTypes = {

};
