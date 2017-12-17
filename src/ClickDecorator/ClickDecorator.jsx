import React from 'react';
import PropTypes from 'prop-types';
import Decorator from '../shared/Decorator';

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
  }

  constructor (...args) {
    super(...args);
    this.state = {
      value: null,
      values: [],
    };
  }

  componentWillMount () {
    const [n, ...v] = this.props.values;
    this.state.value = n;
    this.state.values = [...v, n];
  }

  /**
   * internal click event handler
   * @param {Event} evt - a click event
   */
  handleClickEvent = evt => {
    evt.preventDefault();
    const [n, ...v] = this.state.values;
    this.setState(({values: [n, ...v]}) => ({
      value: n,
      values: [...v, n]
    }));
  }

  render () {
    return (
      <div onClick={this.handleClickEvent}>
        { this.props.component(this.state.value) }
      </div>
    );
  }
}
