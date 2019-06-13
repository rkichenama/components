import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Info from 'components/Info/Info';
import { connect } from 'react-redux';
import Table from './table';
import Status, { statusShape } from './status';

const coverageShape = {
  covered: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
};

const hasCoverage = coverage => ( coverage && Math.max.apply(Math, Object.keys(coverage).map(key => coverage[key].covered)) );

const calcCoverage = ({all, covered}) => ((all ? (covered / all) : 1) * 100);

class Tests extends PureComponent {
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
      <Info className='tests' title='Test Results'>
        {
          hasCoverage(testCoverage) ? (
            <Table full columns={[
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
      </Info>
    );
  }
}

class TestsWrapper extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    component: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render () {
    const { props: { data, component, components }} = this;

    if (components.indexOf(component) === -1) {
      return (
        <div className='empty-dataset'>Unknown Component</div>
      );
    }
    
    const { tests, coverage } = data[component];

    return (
      <Tests testStatus={tests} testCoverage={coverage} displayName={component} />
    );
  }
}

const mapStateToProps = ({ keys: components, testStatus: { components: data } }) => ({
  data,
  components
});

export default connect(
  mapStateToProps
)(TestsWrapper);
