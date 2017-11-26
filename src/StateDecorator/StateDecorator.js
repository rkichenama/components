import React, { Component } from 'react';
import PropTypes from 'prop-types';

const StateDecorator = (flag = 'f', values = [], delay = 500, fn = () => {}) => WrappedComponent => (
  class StateDecorator extends Component {
    constructor (...args) {
      super(...args);
      this.state = {
        values,
        [flag]: values[0],
        interval: null
      };
    }
    componentDidMount () {
      this.state.interval = setInterval(_ => {
        const [next, ...values] = this.state.values;
        this.setState({[flag]: next, values: [...values, next]}, () => fn(this.state[flag]) );
      }, delay);
    }
    componentWillUnmount () {
      clearInterval(this.state.interval);
    }
    render () {
      const { props } = this;
      const value = this.state[flag];

      return (
        <WrappedComponent {...props} {...{[flag]: value}} />
      );
    }
  }
);

export const ClickDecorator = (flag = 'f', values = []) => WrappedComponent => (
  class StateDecorator extends Component {
    constructor (...args) {
      super(...args);
      const [n, v] = values;
      this.state = {
        values: [...v, n],
        [flag]: n
      };
      this.handleClick = event => {
        event.preventDefault();console.warn('clicking');
        const [next, values] = this.state.values;
        this.setState({[flag]: next, values: [...values, next]});
      }
    }
    render () {
      const { props } = this;
      const value = this.state[flag];

      return (
        <WrappedComponent {...props} {...{[flag]: value}} onClick={this.handleClick} />
      );
    }
  }
);

export default StateDecorator;
