import React from 'react';
import { Stage } from '../';
import Canvas, { Clear, Circle } from 'components/Canvas/Canvas';

const size = i => ({
  w: ((i+1) * 20),
  h: ((i+1) * 20)
});
const concentricCircles = n => (
  Array(n).fill('')
    .map((_, i) => (
      Circle({ x: 100, y: 100, }, ((i + 1) * 10),
        'rgba(255, 51, 51, 0.12)')
    ))
);

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} style={{ backgroundColor: '#fff' }} scene={[
          Clear(),
          ...concentricCircles(8),
        ]}/>
      </Stage>
    );
  }
}
