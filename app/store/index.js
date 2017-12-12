import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import initialState from './state';

import reducer from '../reducers';

const composeEnhancers =
  (/^production$/.test(process.env.NODE_ENV) && compose) ||
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose);

export default createStore(reducer, initialState, composeEnhancers(
  applyMiddleware(
    thunk
  )
));
