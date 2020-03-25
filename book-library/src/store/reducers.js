import { combineReducers } from 'redux';
import { reducer as test } from './test';
import { reducer as library } from './library';

const reducers = combineReducers({
  test,
  library,
});

export default reducers;
