import jasmineEnzyme from 'jasmine-enzyme';

import ArrayProxyFactory from './ArrayProxyFactory';

describe('ArrayProxyFactory', () => {
  beforeEach(jasmineEnzyme);

  it('exisits', () => {
    expect(ArrayProxyFactory).toBeDefined();
  });
});
