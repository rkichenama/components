import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Demo from './demo';

export default class Demos extends PureComponent {
  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.string
    ),
  };

  static defaultProps = {
    files: [
      'ProgressBar/index.js',
    ],
  }

  render () {
    const { props: { files }} = this;

    return (
      <div>
        <h3>Demos</h3>
        {
          files.map(file => (
            <Demo {...{key: file, file}} />
          ))
        }
      </div>
    )
  }
}
