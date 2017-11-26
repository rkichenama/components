import React, { Component } from 'react';
import '../global.scss';
import Cube from './Cube';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import StateDecorator from '../StateDecorator/StateDecorator';

import Die from './Die';

const stories = storiesOf('Atomic/Cube', module);
stories.addDecorator(withKnobs);

stories.add('with knobs',
  () => {
    return (
      <Cube face={select('face', Cube.Faces, 'front')}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
      </Cube>
    )
  }
);

stories.add('auto',
  () => {
    const Cubed = StateDecorator('face', Cube.Faces, 2500)(Cube);

    return (
      <Cubed>
        <Die value={1} />
        <Die value={6} />
        <Die value={2} />
        <Die value={5} />
        <Die value={4} />
        <Die value={3} />
      </Cubed>
    )
  }
);
