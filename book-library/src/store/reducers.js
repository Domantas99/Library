import { combineReducers } from "redux";
import { reducer as library } from "./library";
import { reducer as wishlist } from "./wishlist";
import { reducer as searchbar } from "./search-bar";
import { reducer as categories } from "./categories";
import { reducer as dashboard } from "./dashboard";
import { reducer as office } from "./office";

const reducers = combineReducers({
  library,
  searchbar,
  categories,
  wishlist,
  dashboard,
  office
});

export default reducers;
