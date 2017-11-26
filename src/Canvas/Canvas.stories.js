/* */
import React from 'react';
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
)
const concentricCircles = n => (
  Array(n).fill('')
    .map((_, i) => (
      Circle({ x: 150, y: 150, }, ((i + 1) * 10),
        'rgba(128, 0, 0, 0.1)')
    ))
)

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
        <Canvas sequence={[
          Clear(),
          // ...concentricSquares(12),
          ...concentricCircles(12),
        ]}/>
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
