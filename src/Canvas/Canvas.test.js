import React from 'react';
import { mount } from 'enzyme';

import Canvas from './Canvas';

describe('Canvas', () => {
  let canvas;

  jest.useRealTimers();

  beforeEach(() => {
    canvas = mount(
      <Canvas />
    );
  });

  it('will render a scene', done => {
    const scene =  [
      jasmine.createSpy(),
      jasmine.createSpy(),
      jasmine.createSpy(),
    ];
    canvas.setProps({ scene });
    setTimeout(() => {
      scene.forEach(layer => {
        expect(layer).toHaveBeenCalled();
      });
      done();
    }, 10);
  });

  it('will render an animation', done => {
    const sequence =  [
      jasmine.createSpy(),
      jasmine.createSpy(),
      jasmine.createSpy(),
    ];
    canvas.setProps({ sequence });
    setTimeout(() => {
      sequence.forEach(layer => {
        expect(layer).toHaveBeenCalled();
      });
      done();
    }, 10);
  });
});
