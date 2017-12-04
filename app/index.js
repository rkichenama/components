import React from 'react';
// import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Docs from './docs';

import './scss/docs.scss';

render(
  <Provider {...{store}} >
    <Docs />
  </Provider>,
  document.getElementById('root')
);
