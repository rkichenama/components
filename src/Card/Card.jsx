import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const noop = () => { };

/**
 * One of those swt where you have a card on a page and, on click, it flips in 3d to a hidden back side
 */
export default class Card extends PureComponent {
  static propTypes = {
    /**
     * the structure of this component requires at least 1 child, no more than 2
     */
    children: PropTypes.node.isRequired,
    /**
     * callback to notify parent, which decides on whether the `flipped` prop should change
     */
    onClick: PropTypes.func,
    /**
     * the current state, whether the front is shown (`false`) or the back (`true`)
     */
    flipped: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    flipped: false,
    onClick: noop,
    className: ''
  };

  render() {
    const { props: { children, onClick, flipped, className } } = this;
    const kids = Children.toArray(children).slice(0, 2);

    return (
      <div className={`card${flipped ? ' flipped' : ''} ${className}`}>
        <div className='flip' onClick={onClick}>
          <div className='front'>{
            kids.length >= 1 ? kids[0] : null
          }</div>
          <div className='back'>{
            kids.length >= 2 ? kids[1] : null
          }</div>
        </div>
      </div>
    );
  }
}
