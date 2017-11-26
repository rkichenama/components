import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ErrorBoundary.scss';

export default class ErrorBoundary extends Component {
  state = { error: false };

  componentDidCatch (error, info) {
    this.setState({ error }, () => {
      // do internally after error caught.
    });
    // do externally after error caught
  }

  render () {
    return this.state.error ? (
      <div className='errorMessage'>
        something went wrong
      </div>
    ) : (
      this.props.children
    );
  }
}
