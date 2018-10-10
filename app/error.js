import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Info from 'components/Info/Info';

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
      <Info className='errorMessage' title={ this.state.error.toString() } open>
        <pre>
          { this.state.info }
        </pre>
      </Info>
    ) : (
      this.props.children
    );
  }
}
