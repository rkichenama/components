import React from 'react';
import { mount } from 'enzyme';
import Info from './Info';

describe('Info', () => {
  const onStateChanged = jasmine.createSpy();
  let info;

  beforeEach(() => {
    onStateChanged.calls.reset();
    info = mount(
      <Info {...{ onStateChanged }} >
        <p>Test run</p>
      </Info>
    );
  });

  it('should handle click events', () => {
    expect(info.find('.information').hasClass('open')).toBeFalsy();
    info.find('header.left').simulate('click');
    expect(onStateChanged).toHaveBeenCalledWith(true);
  });

  it('should change state based on props', () => {
    expect(info.state('open')).toBeFalsy();
    info.setProps({ open: true, right: true });
    expect(info.state('open')).toBeTruthy();
  });
});
