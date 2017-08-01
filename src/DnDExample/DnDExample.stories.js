import React from 'react';
import '../global.scss';
import DnDExample from './DnDExample';
import DnDExample2 from './Reorder';
import { storiesOf } from  '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

storiesOf('DnDExample', module)
  .add('story1',
    withInfo(null)(
      () => (
        <DnDExample />
      )
    )
  )
  .add('story2',
    withInfo(null)(
      () => (
        <DnDExample2 />
      )
    )
  );
