import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/*
import {
  compose, withState, withHandlers, withProps,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes, wrapDisplayName
} from 'recompose';

const base = (flag, values = []) => compose(
  withState(flag, 'sdSetFlag', values[0]),
  withState('sdValues', 'sdSetValues', values),
  withState('sdInterval', 'sdSetInterval', false)
);

const SD1 = (flag, values, delay = 5000) => Component => (
  class State extends PureComponent {
    state = {
      value: null,
      interval: null,
      values,
    }
  
    componentWillMount () {
      const [n, ...v] = this.state.values;
      this.state.value = n;
      this.state.values = [...v, n];
    }
  
    componentDidMount () {
      this.state.interval = setInterval(
        () => {
          const [n, ...v] = this.state.values;
          this.setState(({values: [n, ...v]}) => ({
            value: n,
            values: [...v, n]
          }))
        },
        delay
      );
    }
  
    componentWillUnmount () {
      clearInterval(this.state.interval);
    }
  
    render () {
      return (
        <Component {...{ [flag]: this.state.value }} />
      );
    }
});

const Wrapper = WrappedComponent => (p) => {
  const props = Object.keys(p).filter(key => !/^sd.*(Flag|Values|Interval|Event)/.test(key)).reduce((t, c) => { t[c] = p[c]; return t; }, {});
  return (
    <WrappedComponent {...props} />
  )
};

const StateDecorator = (flag, values, delay = 5000) => WrappedComponent => {
  let instances = 0;
  return setDisplayName(wrapDisplayName(WrappedComponent, 'Interval'))(
    compose(
      base(flag, values),
      lifecycle({
        componentDidMount () {
          instances = (instances + 1) % 8;
          this.props.sdSetInterval(
            setInterval(
              () => {
                const [n, ...v] = this.props.sdValues;
                this.props.sdSetFlag(n);
                this.props.sdSetValues([...v, n]);
              },
              delay + (instances * 200)
            )
          );
        },
        componentWillUnmount () {
          clearInterval(this.props.sdInterval);
        }
      })
    )(
      Wrapper(WrappedComponent)
    )
  )
};

export default StateDecorator;

export const ClickDecorator = (flag, values) => WrappedComponent => {
  return setDisplayName(wrapDisplayName(WrappedComponent, 'Click'))(
    compose(
      base(flag, values),
      lifecycle({
        componentDidMount () {
          const [n, ...v] = this.props.sdValues;
          this.props.sdSetValues([...v, n]);
        },
      }),
      withHandlers({
        handleClickEvent: props => event => {
          event.preventDefault();
          const [n, ...v] = props.sdValues;
          props.sdSetFlag(n);
          props.sdSetValues([...v, n]);
        }
      }),
      withProps(props => ({
        onClick: props.handleClickEvent
      }))
    )(
      Wrapper(WrappedComponent)
    )
  )
};
*/

class Decorator extends PureComponent {
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

  componentWillMount () {
    const [n, ...v] = this.props.values;
    this.state.value = n;
    this.state.values = [...v, n];
  }
}

export default class StateDecorator extends Decorator {
  static propTypes = {
    ...Decorator.propTypes,
    delay: PropTypes.number,
  }

  static defaultProps = {
    delay: 5000,
  }

  constructor (...args) {
    super(...args);
    this.state.interval = false;
  }

  componentDidMount () {
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
  }

  componentWillUnmount () { this.state.interval && clearInterval(this.state.interval) }

  render () { return this.props.component(this.state.value) }
}

export class ClickDecorator extends Decorator {

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
