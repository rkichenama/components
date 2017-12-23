import React from 'react';
import { Stage } from '../';
import Canvas, { Clear } from 'components/Canvas/Canvas';

const center = {x: 100, y: 100};
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

const seq = Array(360).fill(false).map((_, s) => polygon(Number.parseInt(s / 10) + 2));

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} style={{ backgroundColor: '#fff' }} scene={[
          Clear(),
          ({context}) => {
            const g = context.gradient.linear({x:100, y: 50}, {x:100, y:150});
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
              .style.fill(g)
          },
        ]} sequence={[
          ...seq,
          ...[...seq].reverse().slice(20),
        ]} />
      </Stage>
    );
  }
}
