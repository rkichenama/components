import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

// function loadStories() {
//   require('../stories');
// }

setOptions({
  name: 'Components',
  downPanelInRight: true,
  hierarchySeparator: /\//
})

const req = require.context('../src/', true, /.stories.js$/);

function loadStories () {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
