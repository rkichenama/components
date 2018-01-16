import React from 'react';
import '../global.scss';
import Card from './Card';
import StateDecorator from '../StateDecorator/StateDecorator';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

const FlippingCard = StateDecorator('flipped', [true, false], 1000)(Card);

storiesOf('Items/Card', module)
  .add('with info',
    withInfo('')(
      () => (
        <Card>
          <div>Front</div>
          <div>Back</div>
          <div>Extra</div>
        </Card>
      )
    )
  )
  .add('auto',
    withInfo('')(
      () => (
        <FlippingCard>
          <div>Front</div>
          <div>Back</div>
          <div>Extra</div>
        </FlippingCard>
      )
    )
  )
;
