import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from './table';
// import { Chart } from 'react-google-charts';

export const statsShape = {
  n: PropTypes.number,
  passed: PropTypes.number,
  failed: PropTypes.number,
  pending: PropTypes.number,
};

export default class Stats extends PureComponent {
  static propTypes = statsShape;

  render () {
    const { props: { n: totalTests, failed, passed, pending } } = this;
    // return (
    //   <Chart
    //     chartType='PieChart'
    //     data={[
    //       ['Type', 'Count'],
    //       ['Passing', passed],
    //       ['Failing', failed],
    //       ['Pending', pending],
    //     ]}
    //     options={{
    //       pieHole: 0,
    //       is3D: false,
    //     }}
    //     graph_id='Tests'
    //     width='100%'
    //     height='320px'
    //     legend_toggle
    //   />
    // );
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
