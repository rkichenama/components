import React from 'react';
import { mount } from 'enzyme';

import Canvas from './Canvas';

describe('Canvas', () => {
  let canvas;

  beforeEach(() => {
    canvas = mount(
      <Canvas />
    );
  });

  /*
  rendering a scene is running an array of functions that use props and passes context
  */
  it('will render a scene');
  it('will render an animation');
});
