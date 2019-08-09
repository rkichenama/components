/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

/**
 * A simple progress bar that moves from left to right when given a value(s) between
 * 0 and 1. Basically, most of the css can be overriden besides the props to set colors.
 * One line of text is expected for the status, which will be center white with black outline.
 */
export default class ProgressBar extends Component {
  static defaultProps = {
    barColor: 'green',
    className: '',
    classNames: [],
    title: null,
    value: 0,
  };

  static propTypes = {
    /**
     * color the filled progress bar should be
     */
    barColor: PropTypes.string,
    /** class to apply to the container `section` */
    className: PropTypes.string,
    /** list of classes to apply to each value bar */
    classNames: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    /**
     * the percentage to display, given as a positive value `[0, 1]`. can be either a single float or an array of floats denoting a list of segments progress
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    children: PropTypes.node,
  };

  render () {
    const { props: { barColor, value: v, children, className, title, classNames } } = this;
    const value = Array.prototype.concat(...[v])
      .map(val => Math.max(0, Math.min(val, 1)));
    // TODO: maybe allow for proportional sizes of the segments
    return (
      <section className={`status-progress${className ? ` ${className}` : ''}`} {...{ title }}>
        <div className='status-progress-text'>{ children }</div>
        {
          value.map((val, i) => (
            <div key={i} className='status-progress-bar'>
              <div className={`status-progress-bar-value${classNames[i] || ''}`} style={{
                transform: `translateX(${-100 + (val * 100)}%)`, backgroundColor: barColor
              }} />
            </div>
          ))
        }
      </section>
    );
  }
}
