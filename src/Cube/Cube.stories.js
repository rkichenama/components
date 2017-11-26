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
        <Cube>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </Cube>
      )
    )
);
