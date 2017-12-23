import React from 'react';
import { mount } from 'enzyme';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  let bar;

  beforeEach(() => { bar = mount(<ProgressBar />) });

  it('should have zero value', () => {
    expect(bar.prop('value')).toBe(0);
  });

  it('should changes value on props', () => {
    bar.setProps({ value: .25 });
    expect(bar.find('.status-progress-bar').prop('style').width).toMatch(/25%/);
  });
});
