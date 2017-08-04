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

let fileTemplate = `/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  compose, withState, withHandlers,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

const ${name} = ({}) => {
  return (
    <div>
      replace this with actual code
    </div>
  );
};

const enhance = compose(
  setPropTypes({}),
  defaultProps({}),
  lifecycle({}),
  setDisplayName('Stateless(${name})')
);

export default enhance(${name});
`;

let testTemplate = `/* */
import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<${name} />);
  });
});
`;

let storyTemplate = `/* */
import React from 'react';
import '../global.scss';
import ${name} from './${name}';
import { storiesOf } from  '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import StateDecorator from '../StateDecorator/StateDecorator';

storiesOf('${name}', module)
  .add('story',
    withInfo('')(
      () => (
        <${name} />
      )
    )
  );
`;

function writeFile (path, text) {
  console.log('writing file', path);
  fs.writeFileSync(path, text);
}

writeFile(path.join(componentDir, `${name}.js`), fileTemplate);
writeFile(path.join(componentDir, `${name}.test.js`), testTemplate);
writeFile(path.join(componentDir, `${name}.stories.js`), storyTemplate);
