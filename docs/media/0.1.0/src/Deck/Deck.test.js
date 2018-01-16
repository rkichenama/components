import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Deck from './Deck';

describe('Deck', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<Deck />);
  });
});
