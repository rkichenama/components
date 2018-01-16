/* */
import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import GitHubProfile from './GitHubProfile';

describe('GitHubProfile', () => {
  beforeEach(jasmineEnzyme);

  it('can render', () => {
    shallow(<GitHubProfile />);
  });
});
