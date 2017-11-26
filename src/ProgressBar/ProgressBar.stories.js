/* */
import React from 'react';
import '../global.scss';
import ProgressBar from './ProgressBar';
import { storiesOf } from  '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';

const PB = StateDecorator(
  'barColor',
  ['black', 'white', 'gray'],
  2500
)(StateDecorator(
  'value',
  Array(10).fill(0).map((v,i) => i / 10),
  250
)(ProgressBar));

const stories = storiesOf('Atomic/ProgressBar', module);

stories.add('auto', () => (
  <div>
    <div>
      <PB />
    </div>
    <div>
      <PB>
        <p style={{ fontSize: '8px' }}>Status</p>
      </PB>
    </div>
    <div className='has-success'>
      <PB>
        <p style={{ fontSize: '8px' }}>Success</p>
      </PB>
    </div>
    <div className='has-info'>
      <PB>
        <p style={{ fontSize: '8px' }}>Info</p>
      </PB>
    </div>
    <div className='has-warning'>
      <PB>
        <p style={{ fontSize: '8px' }}>Warning</p>
      </PB>
    </div>
    <div className='has-error'>
      <PB>
        <p style={{ fontSize: '8px' }}>Error</p>
      </PB>
    </div>
  </div>
));
