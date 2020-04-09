import { combineReducers } from 'redux';
import { reducer as test } from './test';
import { reducer as library } from './library';
import { reducer as wishlist } from './wishlist';
import { reducer as searchbar } from './search-bar';

const reducers = combineReducers({
  test,
  library,
  wishlist,
  searchbar
});

export default reducers;
