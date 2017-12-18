import React from 'react';
import { mount } from 'enzyme';
import Cube from './Cube';

describe('Cube', () => {
  let cube;

  describe('properly rendered', () => {
    let onClick;
    
    beforeEach(() => {
      onClick = jasmine.createSpy();
    });
  
    it('should trigger a callback when clicked');
  
    it('should toggle a class when prop changes');
  });

  describe('improperly rendered', () => {
    let onClick;

    [0,1,2,3,4,5,7]
      .forEach(n => {
        it(`should render ${n} children`);
      });
  });
});
