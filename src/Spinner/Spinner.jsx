import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Spinner.scss';

/**
 * A simple spinner
 */
export default class Spinner extends PureComponent {
  static propTypes = {
    for: PropTypes.func.isRequired,
    /** function that, if result is true, will show spinner */
    test: PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(Object.keys(props).reduce((state, key) => {
      if (!/^(for|test)$/.test(key)) { state[key] = props[key] }
      return state;
    }, {}));
  }

  render () {
    const { for: Component, test } = this.props;
    return test(this.props) ? (
      <div className='rrk-spinner'>
        <Component {...(this.state)} />
        <span className='spinner' />
      </div>
    ) : (
      <Component {...(this.state)} />
    );
  }
}
