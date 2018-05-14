---
to: src/<%= h.PascalCase(name) %>/<%= h.PascalCase(name) %>.test.js
---
import React from 'react';
import { mount } from 'enzyme';
import <%= h.PascalCase(name) %> from './<%= h.PascalCase(name) %>';

describe('<%= h.PascalCase(name) %>', () => {
  it('should have a test');
});
