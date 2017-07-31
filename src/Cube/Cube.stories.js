import React from 'react';
import '../global.scss';
import Cube from './Cube';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Cube', module)
  .addWithInfo('story', '', () => (
    <Cube
            />
  ));
