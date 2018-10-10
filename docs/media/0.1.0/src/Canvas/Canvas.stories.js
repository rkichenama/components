/* */
import React, { Component } from 'react';
import '../global.scss';
import Canvas, { Clear, FilledRect, BorderedRect, Rect, Circle } from './Canvas';
import { storiesOf } from  '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';
import Centered from '../../storybook/Centered';

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
    };

    this.animate = this.animate.bind(this);
  }
  componentDidMount () {
    this.state.avail = true;
    this.animate();
  }
  animate () {
    if (!this.state.avail) { return }

    let {x, y, dx, dy, w, h} = this.state;

    if (x < 0 || x > (300 - w - Math.abs(dx))) { dx *= -1 }
    if (y < 0 || y > (300 - h - Math.abs(dy))) { dy *= -1 }

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
      <Canvas scene={[
        Clear(),
        Rect({x, y, w, h}, 'purple', 'orange')
      ]}/>
    );
  }
}

const center = {x: 150, y: 150};
const add = ({x, y}, {x: cx, y: cy} = center) => ({x: cx + x, y: cy + y});
const polygon = (sides, center = center, size = 75) => ({context}) => {
  context
    .begin()
    .moveTo(add({x: size * Math.sin(0), y: -size * Math.cos(0)}));
  for (let s = 1; s <= sides; s++) {
    const angle = s * 2 * Math.PI / sides;
    context.lineTo(add({
      x: size * Math.sin(angle),
      y: -size * Math.cos(angle)
    }));
  }
  context.stroke().fill().end();
};

let silly = Array(360).fill(false)
  .map((_, s) => polygon(Number.parseInt(s / 10) + 2));

storiesOf('Canvas/base', module)
  .add('basic canvas',
    withNotes(`The canvas should render an image based on the data passed.

The data should be a list of draw actions to be performed within the canvas context`)(
      () => (
        <Canvas />
      )
    )
  )
  .add('with a scene canvas',
    withNotes(``)(
      () => (
        <Canvas scene={[
            Clear(),
            ({context}) => {
              const g = context.gradient.linear({x:150, y: 75}, {x:150, y:225});
              g.addColorStop(0.00, '#ff0000');
              g.addColorStop(0.08, '#ff8000');
              g.addColorStop(0.17, '#ffff00');
              g.addColorStop(0.25, '#80ff00');
              g.addColorStop(0.33, '#00ff00');
              g.addColorStop(0.42, '#00ff80');
              g.addColorStop(0.50, '#00ffff');
              g.addColorStop(0.58, '#0080ff');
              g.addColorStop(0.67, '#0000ff');
              g.addColorStop(0.75, '#8000ff');
              g.addColorStop(0.83, '#ff00ff');
              g.addColorStop(0.92, '#ff0080');
              g.addColorStop(1.00, '#ff0000');
              context
                .style.stroke('black')
                .style.fill(g);
            },
          ]}
          sequence={[
            ...silly,
            ...[...silly].reverse().slice(20),
          ]} />
      )
    )
  )
;

const shapes = storiesOf('Canvas/Shapes', module);
shapes.addDecorator(withKnobs);
shapes.addDecorator(Centered);

class D extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      scene: [
        Clear(),
        ({context}) => {
          context
            .style.stroke('black')
            .style.fill('transparent');
        },
        ...Array(4).fill(false)
          .map((_, s) => polygon(s + 2)),
      ]
    };
  }
  componentDidUpdate ({sides}) {
    if (sides !== this.props.sides) {
      this.setState({scene: [
        Clear(),
        ({context}) => {
          context
          .style.stroke('black');
        },
        ...Array(Number(this.props.sides)).fill(false)
        .map((_, s) => polygon(s + 2)),
      ]});
    }
  }
  render () {
    const { scene } = this.state;
    return (
      <Canvas {...{scene}} />
    );
  }
}

shapes
  .add('you choose',
    withNotes(``)(
      () => (
        <D sides={select('number of polygons', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], '4')} />
      )
    )
  )
  .add('with a concentric squares',
    () => (
      <Canvas scene={[
        Clear(),
        ...concentricSquares(12),
      ]}/>
    )
  )
  .add('with a concentric circles',
    () => (
      <Canvas scene={[
        Clear(),
        ...concentricCircles(12),
      ]}/>
    )
  )
;
