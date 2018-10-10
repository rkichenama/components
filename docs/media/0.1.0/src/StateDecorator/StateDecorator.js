import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
const Wrapper = WrappedComponent => p => {
  const props = Object.keys(p).filter(key => !/^sd.*(Flag|Values|Interval|Event)/.test(key)).reduce((t, c) => { t[c] = p[c]; return t }, {});
  return (
    <WrappedComponent {...props} />
  );
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
  );
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
  );
};
