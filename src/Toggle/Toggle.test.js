import React from 'react';
import { mount } from 'enzyme';
import Toggle from './Toggle';

describe('Toggle', () => {
  const onValueChange = jasmine.createSpy();
  let toggle;

  beforeEach(() => {
    onValueChange.calls.reset();
    toggle = mount(
      <Toggle {...{ onValueChange }} />
    );
  });

  it('should handle click events', () => {
    expect(toggle.find('.toggle-track').hasClass('on')).toBeFalsy();
    toggle.find('.toggle-container').simulate('click');
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('should change state based on props', () => {
    expect(toggle.state('value')).toBeFalsy();
    toggle.setProps({ value: true });
    expect(toggle.state('value')).toBeTruthy();
  });
});
