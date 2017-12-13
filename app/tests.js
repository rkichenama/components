import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Children from './children';

const coverageShape = {
  covered: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
};

const statusShape = {
  n: PropTypes.number,
  passed: PropTypes.number,
  failed: PropTypes.number,
  pending: PropTypes.number,
  tests: PropTypes.object,
};

class Coverage extends PureComponent {
  static propTypes = Object.assign({}, coverageShape, { title: PropTypes.string.isRequired });

  render () {
    const { props: { title, covered, all } } = this
    return (
      <div className='code-coverage'>
        <div>{ title }</div>
        <div>{ ((all ? (covered / all) : 1) * 100).toFixed(2) }%</div>
      </div>
    );
  }
}

const Iconify = status => {
  if (/pass/i.test(status)) { return '✔' }
  if (/fail/i.test(status)) { return '✘' }
  return '⁇';
};

const IT = ({title, status, errors}) => (
  <section className='it'>
    <div className={status}>
      <span>{ Iconify(status) }</span>
      <span>{ title }</span>
    </div>
    {
      errors.length ? (
        <details className=''>
          <summary>Errors</summary>
          { errors.map((error, e) => (<pre key={e}>{ error }</pre>))}
        </details>
        ) : null
    }
  </section>
);

class Status extends PureComponent {
  static propTypes = Object.assign({},
    statusShape,
    { title: PropTypes.string }
  );

  render () {
    const { props: { n, passed, failed, pending, tests, title } } = this;

    return tests ? (
      <details className='test-suite' open>
        <summary>{ title }</summary>
        {
          tests.hasOwnProperty('tests') ? (
            <Status {...(tests.tests)} />
          ) : (
            Object.keys(tests).map(test => (
              tests[test].hasOwnProperty('tests') ? (
                <Status {...(tests[test])} key={test} title={test} />
              ) : (
                <IT {...(tests[test])} title={test} key={test} />
              )
            ))
          )
        }
      </details>
    ) : (
      <div className='empty-dataset'>No tests</div>
    );
  }
}

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
      <details className='tests'>
        <summary>Test Results</summary>
        {
          testCoverage ? Object.keys(testCoverage).map(title => (
            <Coverage {...{key: title, title, ...(testCoverage[title])}} />
          )) : (
            <div className='empty-dataset'>No coverage</div>
          )
        }
        <Status {...testStatus} title={ displayName } />
      </details>
    );
  }
}
