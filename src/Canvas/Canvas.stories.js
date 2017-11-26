/* */
import React, { Component } from 'react';
import '../global.scss';
import Canvas, { Clear, FilledRect, BorderedRect, Rect, Circle } from './Canvas';
import { storiesOf } from  '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';

const size = i => ({
  w: ((i+1) * 20),
  h: ((i+1) * 20)
});
const concentricSquares = n => (
  Array(n).fill('')
    .map((_, i) => (
      Rect({
        ...size(i),
        x: 150 - ((i+1) * 10),
        y: 150 - ((i+1) * 10),
      }, 'rgba(0, 0, 128, 0.1)', 'rgba(128, 0, 0, 0.1)')
    ))
);
const concentricCircles = n => (
  Array(n).fill('')
    .map((_, i) => (
      Circle({ x: 150, y: 150, }, ((i + 1) * 10),
        'rgba(128, 0, 0, 0.1)')
    ))
);

class Saver extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      x: 13, y: 7, w: 40, h: 40,
      avail: false, dx: 1, dy: 1
    }

    this.animate = this.animate.bind(this);
  }
  componentDidMount () {
    this.state.avail = true;
    this.animate();
  }
  animate () {
    if (!this.state.avail) { return; }

    let {x, y, dx, dy, w, h} = this.state;

    if (x < 0 || x > (300 - w - Math.abs(dx))) { dx *= -1; }
    if (y < 0 || y > (300 - h - Math.abs(dy))) { dy *= -1; }

    [x, y] = [x + dx, y + dy];

    this.setState({x, y, dx, dy}, () => {
      requestAnimationFrame(this.animate);
    });
  }
  componentWillUnmount () {
    this.state.avail = false;
  }
  render () {
    const {x, y, w, h} = this.state;
    return (
      <Canvas sequence={[
        Clear(),
        Rect({x, y, w, h}, 'purple', 'orange')
      ]}/>
    );
  }
}

storiesOf('Canvas/base', module)
  .add('basic canvas',
    withNotes(`The canvas should render an image based on the data passed.

The data should be a list of draw actions to be performed within the canvas context`)(
      () => (
        <Canvas />
      )
    )
  )
  .add('with a sequence canvas',
    withNotes(``)(
      () => (
        <Saver />
      )
    )
  )
;

storiesOf('Canvas/Shapes', module)
  .add('with a concentric squares',
    () => (
      <Canvas sequence={[
        Clear(),
        ...concentricSquares(12),
      ]}/>
    )
  )
  .add('with a concentric circles',
    () => (
      <Canvas sequence={[
        Clear(),
        ...concentricCircles(12),
      ]}/>
    )
  )
;
