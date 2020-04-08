import { combineReducers } from 'redux';
import { reducer as test } from './test';
import { reducer as library } from './library';
import { reducer as searchbar } from './search-bar';
import { reducer as categories } from './categories';

const reducers = combineReducers({
  test,
  library,
  searchbar,
  categories
});

export default reducers;
