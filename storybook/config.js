import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import Centered from './Centered';

setAddon(infoAddon);
addDecorator(Centered);

const req = require.context('../src/', true, /.stories.js$/);

function loadStories () {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
