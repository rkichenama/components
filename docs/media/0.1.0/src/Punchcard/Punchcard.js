import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './Punchcard.scss';

export default class Punchcard extends Component {
  constructor (...args) {
    super(...args);
  }
  render () {
    const { active } = this.props;
    const hours = [], dots = [];
    for(let d = 0; d < 24; d++) {
      hours[d] = (
        <div key={d}>{d}</div>
      );
      for(let w = 0; w < 7; w++) {
        if (!dots[w]) { (dots[w] = []); }
        dots[w][d] = (
          <div key={`${w}-${d}`} className={`dot ${active && active && [w] && active[w][d] ? 'active': ''}`} />
        )
      }
    }
    return (
      <Panel>
        <div className='punchcard'>
          <div></div>
          <header>
            {
              hours
            }
          </header>
          <aside>
            <div className='weekday'>M</div>
            <div className='weekday'>T</div>
            <div className='weekday'>W</div>
            <div className='weekday'>T</div>
            <div className='weekday'>F</div>
            <div className='weekday'>S</div>
            <div className='weekday'>S</div>
          </aside>
          {
            dots
          }
        </div>
      </Panel>
    );
  }
}

Punchcard.propTypes = {
  active: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool))
};
