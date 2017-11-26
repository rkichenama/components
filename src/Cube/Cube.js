import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cube extends Component {
  constructor (...args) {
    super(...args);
    [

    ].map(fn => (this[fn] = this[fn].bind(this)));
  }
  render () {
    return (
      <div>
        replace this with actual code
      </div>
    );
  }
}

Cube.propTypes = {

};
