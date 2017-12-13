import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from './table';

export const statsShape = {
  n: PropTypes.number,
  passed: PropTypes.number,
  failed: PropTypes.number,
  pending: PropTypes.number,
}

export default class Stats extends PureComponent {
  static propTypes = statsShape;

  render () {
    const { props: { n: totalTests, failed, passed, pending } } = this;
    return (
      <Table {...{
        columns: [
          { name: 'totalTests', type: 'number' },
          { name: 'passed', type: 'number' },
          { name: 'failed', type: 'number' },
          { name: 'pending', type: 'number' }
        ],
        data: [{
          totalTests, passed, failed, pending
        }]
      }} />
    );
  }
}
