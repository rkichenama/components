import React from 'react';
import { mount } from 'enzyme';
import ClickDecorator from './ClickDecorator';

describe('ClickDecorator', () => {
  const spy = jasmine.createSpy('react').and.returnValue(<span>Test</span>);
  let decorated;

  beforeEach(() => {
    spy.calls.reset();
    decorated = mount(
      <ClickDecorator values={['aaa', 'bbb']} component={spy} />
    );
  });

  it('should push down the next value to component', () => {
    decorated.find('div').first().simulate('click');
    expect(spy).toHaveBeenCalledWith('bbb');
  });

  it('should change saved values list', () => {
    const [next, ...values] = decorated.state('values');
    decorated.find('div').first().simulate('click');
    const vals = decorated.state('values');
    expect(vals[vals.length - 1]).toBe(next);
    values.forEach((val, v) => {
      expect(vals[v]).toBe(val);
    });
  });
});
