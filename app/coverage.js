import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const coverageShape = {
  covered: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
};

export default class Coverage extends PureComponent {
  static propTypes = Object.assign({}, coverageShape, { title: PropTypes.string.isRequired });

  render () {
    const { props: { title, covered, all } } = this
    const amt = ((all ? (covered / all) : 1) * 100);
    return (
      <div className={`code-coverage ${ amt ? (amt > 80 ? 'has-nothing' : 'has-warning'): 'has-error'}`}>
        <div>{ title }</div>
        <div>{ amt.toFixed(2) }%</div>
      </div>
    );
  }
}
