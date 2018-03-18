import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Spinner.scss';

/**
 * A simple spinner that uses a font based animation that scrolls vertically through an infinite transform animation. It should be used as a wrapper for a component which will block the UI if the test returns true. The actual spinner is an offset from the top of the rendered component with a minimum height of double the font size.
 */
export default class Spinner extends PureComponent {
  static propTypes = {
    blockingClass: PropTypes.string,
    for: PropTypes.func.isRequired,
    /** function that, if result is true, will show spinner */
    test: PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(Object.keys(props).reduce((state, key) => {
      if (!/^(for|test|blockingClass)$/.test(key)) { state[key] = props[key] }
      return state;
    }, {}));
  }

  render () {
    const { for: Component, test, blockingClass } = this.props;
    return test(this.props) ? (
      <div className={`rrk-spinner ${blockingClass}`}>
        <Component {...(this.state)} />
        <span className='spinner' />
      </div>
    ) : (
      <Component {...(this.state)} />
    );
  }
}
