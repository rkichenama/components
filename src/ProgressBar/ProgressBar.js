/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

export default class ProgressBar extends Component {
  static defaultProps = {
    barColor: 'green',
    value: 0,
  };

  static propTypes = {
    barColor: PropTypes.string,
    value: PropTypes.number,
  };

  render () {
    const { props: { barColor, value, children } } = this;
    return (
      <section className='status-progress' >
        <div className='status-progress-text'>{ children }</div>
        <div className='status-progress-bar' style={{
          width: `${(value * 100)}%`, backgroundColor: barColor
        }} />
      </section>
    );
  }
}
