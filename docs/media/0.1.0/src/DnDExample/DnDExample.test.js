import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import DnDExample from './DnDExample';

describe('DnDExample', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<DnDExample />);
  });
});
