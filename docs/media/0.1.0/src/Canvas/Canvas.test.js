/* */
import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Canvas from './Canvas';

describe('Canvas', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<Canvas />);
  });
});
