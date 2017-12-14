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
  <details className='it'>
    <summary className={status}>
      <span className='status-icon'>{ Iconify(status) }</span>
      <span className='status-title'>{ title }</span>
    </summary>
    {
      errors.length ? (
        errors.map((error, e) => (<pre key={e}>{ error }</pre>))
      ) : <div className='empty-dataset'>No details</div>
    }
  </details>
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
      <details className='test-suite' open>
        <summary>{ title }</summary>
        {
          // tests.hasOwnProperty('tests') ? (
          //   <Status {...(tests.tests)} />
          // ) : (
            Object.keys(tests).map(test => (
              tests[test].hasOwnProperty('tests') ? (
                <Status {...(tests[test])} key={test} title={test} />
              ) : (
                <IT {...(tests[test])} title={test} key={test} />
              )
            ))
          // )
        }
      </details>
    );
  }
}
