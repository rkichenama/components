import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Markdown from './markdown';

export default class Introduction extends PureComponent {
  static propTypes = {
    displayName: PropTypes.string,
    filename: PropTypes.string,
    description: PropTypes.string,
  };

  render () {
    const { props: { displayName, filename, description }} = this;
    
    return filename ? (
      <section>
        <h1>
          {displayName}
        </h1>
        <h2>{filename}</h2>
        <Markdown source={description} />
      </section>
    ) : (
      `Please select one of the components to the left`
    );
  }
}
