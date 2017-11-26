import { configure, addDecorator } from '@storybook/react';
import Centered from './Centered';

addDecorator(Centered);

const req = require.context('../src/', true, /.stories.js$/);

function loadStories () {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
