/* */
import { compose, pipe } from '../shared/functions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withState, withHandlers, withProps,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

import Context from './Context';
// import { Clear, FilledRect, BorderedRect, Rect, Arc, Circle } from './Helpers';

import './Canvas.scss';

/**
 * A canvas component that I made
 * * stupidly
 **/
export default class Canvas extends Component {
  static propTypes = {
    className: PropTypes.string,
    scene: PropTypes.arrayOf(PropTypes.func),
    sequence: PropTypes.arrayOf(PropTypes.func),
  };

  static defaultProps = {
    className: '',
    scene: [],
    sequence: [],
  };

  constructor (...args) {
    super(...args);

    this.state = {
      canvas: false,
      frame: false,
    };

    this.setCanvas = canvas => this.setState({canvas});
    this.stopAnimating = () => {
      if (this.state.animating) {
        cancelAnimationFrame(this.state.animating);
        this.state.animating = false;
      }
    };
  }

  componentWillReceiveProps ({scene, sequence}) {
    if (
      (sequence !== this.props.sequence) ||
      (scene !== this.props.scene)
    ) {
      this.stopAnimating();
    }
  }

  componentDidUpdate () {
    if (this.state.canvas && !this.state.animating) {
      this.animate();
    }
  }

  componentWillUnmount () {
    this.state.animating && cancelAnimationFrame(this.state.animating);
  }

  /**
   * trigger animating of the scene
   * @param {string} a - something
   * @returns
   */
  animate (a) {
    const { scene, sequence: seq } = this.props;
    const args = {...this.props, context: Context(this.state.canvas) };
    let sequence = [...seq];
    const doAnim = () => {
      // draw thee scene
      scene.forEach(layer => layer(args));
      // do the next animation step
      if (sequence.length) {
        let [step, ...rest] = sequence;
        step(args);
        // set up animation
        sequence = [...rest, step];
        this.state.animating = requestAnimationFrame(doAnim);
      }
    };
    this.state.animating = requestAnimationFrame(doAnim);
  }

  render () {
    const { className } = this.props;
    return (
      <canvas
        ref={this.setCanvas}
        className={`canvas ${className}`}
        width="300"
        height="300">
      </canvas>
    );
  }
}

export {
  Clear, FilledRect, BorderedRect, Rect, Arc, Circle
} from './Helpers';
