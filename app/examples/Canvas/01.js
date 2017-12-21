import React from 'react';
import Stage from '../stage';
import Canvas, {
  Clear, FilledRect, BorderedRect, Rect, Circle
} from 'components/Canvas/Canvas';

const size = i => ({
  w: ((i+1) * 20),
  h: ((i+1) * 20)
});
const concentricSquares = n => (
  Array(n).fill(false)
    .map((_, i) => (
      Rect({
        ...size(i),
        x: 100 - ((i+1) * 10),
        y: 100 - ((i+1) * 10),
      }, 'rgba(0, 0, 128, 0.1)', 'rgba(128, 0, 0, 0.1)')
    ))
);

export default class extends React.Component {
  render () {
    return (
      <Stage>
        <Canvas width={200} height={200} scene={[
          Clear(),
          ...concentricSquares(8),
        ]}/>
      </Stage>
    );
  }
}
