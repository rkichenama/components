import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Catcher from './error';
import Demo from './demo';

const demoFiles = require.context('./examples', true, /\.jsx?$/i).keys();

export default class Demos extends PureComponent {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
  };

  render () {
    /* demos must be in top level folder of the components displayName */
    const regexp = new RegExp(`^./${this.props.displayName}/`, '');
    const demos = demoFiles.filter(file => regexp.test(file));

    return (
      <section>
        <h3>Demos</h3>
        {
          demos.length ? (
            demos.map(file => (
              <Catcher key={file}>
                <Demo file={`app/examples/${file.substring(2)}`} />
              </Catcher>
            ))
          ) : (
            <div className='empty-dataset'>no demos available</div>
          )
        }
      </section>
    );
  }
}
