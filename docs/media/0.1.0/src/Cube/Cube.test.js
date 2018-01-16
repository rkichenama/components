import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Cube from './Cube';

describe('Cube', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<Cube />);
  });
});
