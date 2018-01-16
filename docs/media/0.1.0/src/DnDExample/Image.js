import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Image = ({category = 'sports'}) => (
  <img src={`http://lorempixel.com/400/400/${category}`} />
);

export default Image;
