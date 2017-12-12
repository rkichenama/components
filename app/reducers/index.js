import { combineReducers } from 'redux';

import { keys } from './keys';
import { components } from './components';
import { testStatus } from './testStatus';

export default combineReducers({
  keys,
  components,
  testStatus,
});
