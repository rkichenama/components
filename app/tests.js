import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Children from './children';
import Table from './table';
import Status, { statusShape } from './status';

const coverageShape = {
  covered: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
};

const hasCoverage = coverage => ( coverage && Math.max.apply(Math, Object.keys(coverage).map(key => coverage[key].covered)) );

const calcCoverage = ({all, covered}) => ((all ? (covered / all) : 1) * 100);

export default class Tests extends PureComponent {
  static propTypes = {
    testCoverage: PropTypes.shape({
      statements: PropTypes.shape(coverageShape),
      functions: PropTypes.shape(coverageShape),
      branches: PropTypes.shape(coverageShape),
    }),
    testStatus: PropTypes.shape(statusShape),
    displayName: PropTypes.string.isRequired,
  };

  render () {
    const { props: { testCoverage, testStatus, displayName }} = this;
    return (
      <details className='tests' open>
        <summary>Test Results</summary>
        <section>
          {
            hasCoverage(testCoverage) ? (
              <Table columns={[
                'name', {name: 'percent', type: 'percent' }
              ]} data={
                Object.keys(testCoverage).map(name => ({
                  name, percent: calcCoverage(testCoverage[name])
                }))
              } />
            ) : (
              <div className='empty-dataset'>No coverage</div>
            )
          }
          <Status {...testStatus} title={ displayName } />
        </section>
      </details>
    );
  }
}
