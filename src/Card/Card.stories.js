import React from 'react';
import '../global.scss';
import Card from './Card';
import StateDecorator from '../StateDecorator/StateDecorator';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

const CardExample = StateDecorator('flipped', [true, false], 1000)(Card);

storiesOf('Card', module)
  .add('story',
    withInfo('')(
      () => (
        <Card>
          <div id="lipsum">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis augue sed est varius ultrices sit amet vel justo. Nunc nisi erat, consectetur sed lacus quis, laoreet sodales sapien. Praesent eu metus efficitur, pulvinar metus at, rutrum ipsum. Donec eget lacinia dui, eu elementum ligula. Donec consectetur et est eu laoreet. Donec porttitor, arcu ac semper faucibus, sapien mauris tristique nisl, quis posuere neque nibh a tortor. Donec ante ex, pharetra vel efficitur eu, elementum nec sapien. Sed scelerisque nisl quis bibendum blandit. Phasellus urna lorem, aliquam sit amet bibendum eu, tempor ac augue. Integer luctus iaculis dui. Proin diam neque, molestie non lacus ut, volutpat placerat risus. Morbi quis nibh porta, bibendum elit a, lacinia diam. Morbi non dui tellus. Cras nulla magna, rhoncus quis turpis at, volutpat iaculis neque. Praesent sed justo mattis nisi fringilla ullamcorper.
            </p>
          </div>

          <div className='text-center'>Back</div>
          <div className='text-center'>Extra</div>
        </Card>
      )
    )
  );
