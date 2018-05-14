---
to: src/<%= h.PascalCase(name) %>/<%= h.PascalCase(name) %>.jsx
---
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './<%= h.PascalCase(name) %>.scss';

/**
 * <%= h.PascalCase(name) %>
 */
export default class <%= h.PascalCase(name) %> extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render () {
    return (
      <div><%= h.mixedCase(name) %></div>
    );
  }
}
