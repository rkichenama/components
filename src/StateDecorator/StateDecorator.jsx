import React from 'react';
import PropTypes from 'prop-types';
import Decorator from '../shared/Decorator';

const { floor, random } = Math;

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
    /** flag to determine whether the values should be sequential or random */
    seq: PropTypes.bool,
  }

  static defaultProps = {
    delay: 5000,
    seq: true,
  }

  /**
   * @returns {Object} - { next, allValues }
   */
  getNext = (list = this.state.values, current = this.state.value) => {
    let next, allValues;
    if (this.props.seq) {
      const [n, ...v] = [...list];
      allValues = [...v, n];
      next = n;
    } else {
      allValues = [...list];
      const i = allValues.findIndex(val => val === current) || 0;
      const others = [
        ...allValues.slice(0, i),
        ...allValues.slice(i +1)
      ];
      next = others[floor(random() * others.length)];
    }
    return { next, allValues };
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
    const { next: value, allValues: values } = this.getNext(this.props.values);
    this.state.value = value;
    this.state.values = values;
  }

  componentDidMount () {
    const instance = StateDecorator.instances = (StateDecorator.instances + 1) % 8;
    setTimeout(() => {
      this.state.interval = setInterval(
        () => {
          this.setState(() => {
            const { next: value, allValues: values } = this.getNext();
            return { value, values };
          })
        },
        this.props.delay
      );
    }, (instance * 200));
  }

  componentWillUnmount () { this.state.interval && clearInterval(this.state.interval) }

  render () { return this.props.component(this.state.value) }
}
