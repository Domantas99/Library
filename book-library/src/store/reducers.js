import { combineReducers } from 'redux';
import { reducer as library } from './library';
import { reducer as wishlist } from './wishlist';
import { reducer as searchbar } from './search-bar';
import { reducer as categories } from './categories';

const reducers = combineReducers({
  library,
  searchbar,
  categories,
  wishlist
});

export default reducers;
