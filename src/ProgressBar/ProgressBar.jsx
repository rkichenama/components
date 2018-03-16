/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

/**
 * A simple progress bar that moves from left to right when given a value between
 * 0 and 1. Basically, most of the css can be overriden besides the props to set colors.
 * One line of text is expected for the status, which will be center white with black outline.
 */
export default class ProgressBar extends Component {
  static defaultProps = {
    barColor: 'green',
    className: '',
    title: null,
    value: 0,
  };

  static propTypes = {
    /**
     * color the filled progress bar should be
     */
    barColor: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    /**
     * the percentage to display, given as a positive value `[0, 1]`
     */
    value: PropTypes.number,
    children: PropTypes.node,
  };

  render () {
    const { props: { barColor, value: v, children, className, title } } = this;
    const value = Math.max(0, Math.min(v, 1));
    return (
      <section className={`status-progress${className ? ` ${className}` : ''}`} {...{ title }}>
        <div className='status-progress-text'>{ children }</div>
        <div className='status-progress-bar' style={{
          transform: `translateX(${-100 + (value * 100)}%)`, backgroundColor: barColor
        }} />
      </section>
    );
  }
}
