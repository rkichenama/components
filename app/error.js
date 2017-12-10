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
      <div className='errorMessage'>
        <h1>{ this.state.error.toString() }</h1>
        <details open>
          <pre>
            { this.state.info }
          </pre>
        </details>
      </div>
    ) : (
      this.props.children
    );
  }
}
