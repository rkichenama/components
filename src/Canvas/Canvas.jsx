/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

import './Canvas.scss';

export default class Canvas extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * An array of functions that will draw within the canvas intially after render. See __animation function__ for details
     */
    scene: PropTypes.arrayOf(PropTypes.func),
    /**
     * An array of functions that will draw within the canvas in a looping sequence where each slide function is drawn after the complete scene array. See __animation function__ for details
     */
    sequence: PropTypes.arrayOf(PropTypes.func),
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    scene: [],
    sequence: [],
    width: 300,
    height: 300,
  };

  state = {
    canvas: false,
    frame: false,
    animating: false,
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
   * remember the rendered canvas tag for later processing
   *
   * does not check to see if the canvas is part of this component, however is called on each render.
   *
   * @param {HTMLElement} canvas - ref to the rendered canvas tag
   */
  setCanvas = canvas => this.setState({ canvas });

  /**
   * cause whatever animation currently in progress to stop asap
   */
  stopAnimating = () => {
    if (this.state.animating) {
      cancelAnimationFrame(this.state.animating);
      this.state.animating = false;
    }
  }

  /**
   * trigger animating of the scene
   */
  animate () {
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
    const { className, width, height } = this.props;
    return (
      <canvas
        ref={this.setCanvas}
        className={`canvas ${className}`}
        {...{ width, height }}>
      </canvas>
    );
  }
}

export {
  Clear, FilledRect, BorderedRect, Rect, Arc, Circle
} from './Helpers';
