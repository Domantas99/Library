import { combineReducers } from 'redux';
import { reducer as test } from './test';
import { reducer as library } from './library';
import { reducer as searchbar } from './search-bar';

const reducers = combineReducers({
  test,
  library,
  searchbar
});

export default reducers;
