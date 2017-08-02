import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

export default class Card extends Component {
  constructor (...args) {
    super(...args);
  }
  render () {
    const children = Children.toArray(this.props.children).slice(0, 2);
    const className = `card${this.props.flipped ? ' flipped' : ''} ${this.props.className}`;

    return (
      <div {...{className}}>
        <div className='flip' onClick={this.props.onClick}>
          <div className='front'>{ children.length > 1 ? children[0] : null }</div>
          <div className='back'>{ children.length === 2 ? children[1] : null }</div>
        </div>
      </div>
    );
  }
}

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
}
