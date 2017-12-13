import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends PureComponent {
  state = { error: false, info: '' };

  componentDidCatch (error, { componentStack: info}) {
    this.setState({ error, info }, () => {
      // do internally after error caught.
    });
    // do externally after error caught
  }

  render () {
    
    return this.state.error ? (
      <details className='errorMessage' open>
        <summary>{ this.state.error.toString() }</summary>
        <pre>
          { this.state.info }
        </pre>
      </details>
    ) : (
      this.props.children
    );
  }
}
