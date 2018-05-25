---
to: app/examples/<%= h.PascalCase(name) %>/<% if (locals.ex) { -%><%= h.mixedCase(locals.ex) %><% } else { -%>01<% } %>.js
---
/* eslint-disable react/display-name */
import React, { PureComponent } from 'react';
import { Stage } from '../';
import <%= h.PascalCase(name) %> from 'components/<%= h.PascalCase(name) %>/<%= h.PascalCase(name) %>';

export default class extends PureComponent {
  state = {
  }

  render () {
    return (
      <Stage>
        <<%= h.PascalCase(name) %> />
      </Stage>
    );
  }
}
/* eslint-enable react/display-name */
