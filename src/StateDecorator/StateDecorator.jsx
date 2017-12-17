import React from 'react';
import PropTypes from 'prop-types';
import Decorator from '../shared/Decorator';

/**
 * This render prop HOC iterates over a list of values, pushing the current to the given component prop
 * and moving it to the end of the list, endlessly looping with no user interaction.
 */
export default class StateDecorator extends Decorator {
  static instances = 0;
  
  static propTypes = {
    /** the function that will be passed the current value when changed */
    component: PropTypes.func.isRequired,
    /** the period to wait, in ms, before changing the value */
    delay: PropTypes.number,
    /** the list of values to loop through */
    values: PropTypes.array.isRequired,
  }

  static defaultProps = {
    delay: 5000,
  }

  constructor (...args) {
    super(...args);
    this.state = {
      value: null,
      values: [],
      interval: false,
    };
  }

  componentWillMount () {
    const [n, ...v] = this.props.values;
    this.state.value = n;
    this.state.values = [...v, n];
  }

  componentDidMount () {
    const instance = StateDecorator.instances = (StateDecorator.instances + 1) % 8;
    setTimeout(() => {
      this.state.interval = setInterval(
        () => {
          const [n, ...v] = this.state.values;
          this.setState(({values: [n, ...v]}) => ({
            value: n,
            values: [...v, n]
          }))
        },
        this.props.delay
      );
    }, (instance * 200));
  }

  componentWillUnmount () { this.state.interval && clearInterval(this.state.interval) }

  render () { return this.props.component(this.state.value) }
}
