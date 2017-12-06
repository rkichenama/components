import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Catcher from './error';
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
      <section>
        <h3>Demos</h3>
        {
          demos.length ? (
            demos.map(file => (
              <Catcher key={file}>
                <Demo {...{file}} />
              </Catcher>
            ))
          ) : (
            <div className='empty-dataset'>no demos available</div>
          )
        }
      </section>
    )
  }
}
