import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const statusShape = {
  n: PropTypes.number,
  passed: PropTypes.number,
  failed: PropTypes.number,
  pending: PropTypes.number,
  tests: PropTypes.object,
};

const Iconify = status => {
  if (/pass/i.test(status)) { return '✔' }
  if (/fail/i.test(status)) { return '✘' }
  return '⁇';
};

const IT = ({title, status, errors}) => (
  errors.length ? (
    <details className='it'>
      <summary className={status}>
        <span className='status-title'>
          <span className='status-icon'>{ Iconify(status) }</span>
          { title }
        </span>
      </summary>
      { errors.map((error, e) => (<pre key={e}>{ error }</pre>)) }
    </details>
  ) : (
    <div className='it'>
      <div className={status}>
        <span className='status-title'>
          <span className='status-icon'>{ Iconify(status) }</span>
          { title }
        </span>
      </div>
    </div>
  )
);

export default class Status extends PureComponent {
  static propTypes = Object.assign({},
    statusShape,
    { title: PropTypes.string }
  );

  render () {
    const { props: { tests, title } } = this;

    if (!tests) { return ( <div className='empty-dataset'>No tests</div> ) }

    return (
      <div className='test-suite'>
        {
          // tests.hasOwnProperty('tests') ? (
          //   <Status {...(tests.tests)} />
          // ) : (
            Object.keys(tests).map(test => (
              tests[test].hasOwnProperty('tests') ? (
                <details className='test-suite' key={test} open>
                  <summary>{ test }</summary>
                  <Status {...(tests[test])} />
                </details>
                ) : (
                <IT {...(tests[test])} title={test} key={test} />
              )
            ))
          // )
        }
      </div>
    );
  }
}
