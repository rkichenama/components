import React from 'react';
import PropTypes from 'prop-types';
import Decorator from '../shared/Decorator';

const { floor, random } = Math;

/**
 * A render prop HOC that provides a click event handler to iteratively cycle through a list of values,
 * moving the previous value to the end of the list, allowing for seemingly endless function.
 */
export default class ClickDecorator extends Decorator {
  static propTypes = {
    /** the function that will be passed the current value when changed */
    component: PropTypes.func.isRequired,
    /** the list of values to loop through */
    values: PropTypes.array.isRequired,
    /** flag to determine whether the values should be sequential or random */
    seq: PropTypes.bool,
  }

  static defaultProps = {
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
    };
  }

  componentWillMount () {
    const { next: value, allValues: values } = this.getNext(this.props.values);
    this.state.value = value;
    this.state.values = values;
  }

  /**
   * internal click event handler
   * @param {Event} evt - a click event
   */
  handleClickEvent = evt => {
    evt.preventDefault();
    this.setState(() => {
      const { next: value, allValues: values } = this.getNext();
      return { value, values };
    });
  }

  render () {
    return (
      <div onClick={this.handleClickEvent}>
        { this.props.component(this.state.value) }
      </div>
    );
  }
}
