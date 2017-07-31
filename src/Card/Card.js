import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

export default class Card extends Component {
  constructor (...args) {
    super(...args);
  }
  render () {
    const children = Children.toArray(this.props.children).slice(0, 2);
    const className = `card${this.props.flipped ? ' flipped' : ''}`;

    return (
      <div {...{className}}>
        <div className='flip' onClick={this.props.onClick}>
          <div className='front'>{ children[0] }</div>
          <div className='back'>{ children[1] }</div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  flipped: PropTypes.bool
};

const noop = () => {};

Card.defaultProps = {
  flipped: false,
  onClick: noop
}
