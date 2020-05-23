import { combineReducers } from 'redux';
import { reducer as library } from './library';
import { reducer as wishlist } from './wishlist';
import { reducer as searchbar } from './search-bar';
import { reducer as reservations } from './reservations';
import { reducer as dashboard } from './dashboard';
import { reducer as office } from './office';
import { reducer as comments } from './comments';
import { reducer as user } from './user';
import { reducer as general } from './general';

const reducers = combineReducers({
  library,
  searchbar,
  wishlist,
  reservations,
  dashboard,
  office,
  comments,
  user,
  general,
});

export default reducers;
