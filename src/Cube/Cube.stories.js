import React, { Component } from 'react';
import '../global.scss';
import Cube from './Cube';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import StateDecorator from '../StateDecorator/StateDecorator';
import Centered from '../../storybook/Centered';

const stories = storiesOf('Cube', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

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
    const Cubed = StateDecorator('face', Cube.Faces, 2500, action('face'))(Cube);

    return (
      <Cubed>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
      </Cubed>
    )
  }
);
