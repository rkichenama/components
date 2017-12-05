import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Markdown from './markdown';
import Examples from './demos';

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
        <h4>{filename}</h4>
        <Markdown source={description} />
        <div>
          <Examples file={displayName} />
        </div>
      </section>
    ) : (
      `Please select one of the components to the left`
    );
  }
}
