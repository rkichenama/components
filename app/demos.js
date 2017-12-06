import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Demo from './demo';

export default class Demos extends PureComponent {
  static propTypes = {
    demos: PropTypes.arrayOf(
      PropTypes.string
    ),
  };

  render () {
    const { props: { demos }} = this;

    return (
      <div>
        <h3>Demos</h3>
        {
          demos.length ? (
            demos.map(file => (
              <Demo {...{key: file, file}} />
            ))
          ) : (
            <div className='empty-dataset'>no demos available</div>
          )
        }
      </div>
    )
  }
}
