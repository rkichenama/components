import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Card from './Card';

describe('Card', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<Card />);
  });
});
