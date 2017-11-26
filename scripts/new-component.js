let fs = require('fs');
let path = require('path');

let name = process.argv[2];
if (!name) {
  throw new Error('component name required');
}
let basedir = path.join(__dirname, '../src');
let componentDir = path.join(basedir, name);
try {
  fs.mkdirSync(componentDir);
} catch (e) {
  if (e.code !== 'EEXIST') {
    throw e;
  }
}

let fileTemplate = `import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ${name} extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <span>${name}</span>
    );
  }
}
`;

// TODO: need to make a jest template
// let testTemplate = `/* */
// import React from 'react';
// import { shallow } from 'enzyme';
// import jasmineEnzyme from 'jasmine-enzyme';

// import ${name} from './${name}';

// describe('${name}', () => {
//   beforeEach(jasmineEnzyme);

//   it('can render', () => {
//     shallow(<${name} />);
//   });
// });
// `;

let storyTemplate = `import React from 'react';
import { storiesOf } from  '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
// import { withKnobs } from '@storybook/addon-knobs';
// import { withNotes } from '@storybook/addon-notes';
// import { action } from '@storybook/addon-actions';
import ${name} from './${name}';
// import StateDecorator from '../StateDecorator/StateDecorator';

import '../global.scss';

const stories = storiesOf('Atomic/${name}', module);

stories.add('${name}', () => (
  <${name} />
));
`;

function writeFile (path, text) {
  console.log('writing file', path);
  fs.writeFileSync(path, text);
}

writeFile(path.join(componentDir, `${name}.js`), fileTemplate);
// writeFile(path.join(componentDir, `${name}.test.js`), testTemplate);
writeFile(path.join(componentDir, `${name}.stories.js`), storyTemplate);
