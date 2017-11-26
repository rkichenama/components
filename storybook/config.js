import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import Centered from './Centered';

addDecorator(Centered);

setOptions({
  name: 'Components',
  downPanelInRight: true,
  hierarchySeparator: /\./
})


const req = require.context('../src/', true, /.stories.js$/);

function loadStories () {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
