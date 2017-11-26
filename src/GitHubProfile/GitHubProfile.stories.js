/* */
import React from 'react';
import '../global.scss';
import GitHubProfile from './GitHubProfile';
import { storiesOf } from  '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';

storiesOf('GitHubProfile', module)
  .add('simple profile',
    withInfo('')(
      () => (<GitHubProfile />)
    )
  );
