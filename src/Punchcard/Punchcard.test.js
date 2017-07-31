import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Punchcard from './Punchcard';

describe('Punchcard', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<Punchcard />);
  });
});
