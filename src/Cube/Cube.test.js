import React from 'react';
import { mount } from 'enzyme';
import Cube from './Cube';

describe('Cube', () => {
  let cube;

  describe('properly rendered', () => {
    let cube, onClick;

    beforeEach(() => {
      onClick = jasmine.createSpy();
      cube = mount(
        <Cube {...{onClick}}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </Cube>
      );
    });

    it('should trigger a callback when clicked', () => {
      expect(onClick).not.toHaveBeenCalled();
      cube.find('.flip').simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('should change a class when prop changes', () => {
      expect(cube.find('.cube').hasClass('front')).toBeTruthy();
      Cube.Faces.forEach(face => {
        if (/front/.test(face)) { return }
        cube.setProps({ face });
        expect(cube.find('.cube').hasClass(face)).toBeTruthy();
      });
    });
  });

  describe('improperly rendered', () => {
    [0,1,2,3,4,5,7]
      .forEach(n => {
        const kids = n ? Array(n).fill(false).map(() => (<div>child</div>)) : null;
        it(`should render ${n} children`, () => {
          cube = mount(<Cube>{ kids }</Cube>);
          Cube.Faces.forEach((side, s) => {
            expect(cube.find(`.flip > .${side}`).children().length).toBe(n > s ? 1 : 0);
          });
        });
      });
  });
});
