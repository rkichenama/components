import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import Centered from './Centered';

setAddon(infoAddon);
addDecorator(Centered);

const req = require.context('../src/', true, /.stories.js$/);

function loadStories () {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
