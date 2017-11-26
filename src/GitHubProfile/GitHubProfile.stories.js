/* */
import React from 'react';
import '../global.scss';
import GitHubProfile from './GitHubProfile';
import { storiesOf } from  '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';


const stories = storiesOf('GitHubProfile', module);
stories.addDecorator(withKnobs);

stories
  .add('with no set username',
    withInfo('')(
      () => (<GitHubProfile />)
    )
  )
  .add('with selectable username',
    () => (<GitHubProfile username={select('username', [
      '', 'rkichenama', 'getify', 'wesbos', 'leaverou'
    ], '')} />)
  )
;
