// => renderWithRedux.js
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';

/**
 * usage renderWithRedux(<ConnectedComponent />)
 */
export default ({
  initialState = {},
  reducer = state => state,
  store = createStore(reducer, initialState)
} = {}) => componentUnderTest => ({
  store,
  ...render(
    <Provider store={store}>{ componentUnderTest }</Provider>
  ),
});
// => renderWithRedux.js
