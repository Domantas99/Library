import { combineReducers } from "redux";
import { reducer as library } from "./library";
import { reducer as wishlist } from "./wishlist";
import { reducer as searchbar } from "./search-bar";
import { reducer as categories } from "./categories";
import { reducer as reservations } from "./reservations";

const reducers = combineReducers({
  library,
  searchbar,
  categories,
  wishlist,
  reservations,
});

export default reducers;
