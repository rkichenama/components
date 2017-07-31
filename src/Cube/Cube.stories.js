import React from 'react';
import '../global.scss';
import Cube from './Cube';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Cube', module)
  .addWithInfo('story', '', () => (
    <Cube
            />
  ));
