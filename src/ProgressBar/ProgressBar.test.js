/* */
import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<ProgressBar />);
  });
});
