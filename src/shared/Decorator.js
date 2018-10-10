import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Decorator extends PureComponent {
  static propTypes = {
    values: PropTypes.array.isRequired,
    component: PropTypes.func.isRequired,
  }

  constructor (...args) {
    super(...args);
    this.state = {
      value: null,
      values: [],
    };
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillMount () {
    const [n, ...v] = this.props.values;
    this.state.value = n; /* eslint-disable-line react/no-direct-mutation-state */
    this.state.values = [...v, n]; /* eslint-disable-line react/no-direct-mutation-state */
  }
}
