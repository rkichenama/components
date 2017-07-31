import React from 'react';
import '../global.scss';
import Cube from './Cube';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

storiesOf('Cube', module)
  .add('story',
    withInfo('')(
      () => (
        <Cube />
      )
    )
);
