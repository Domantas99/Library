import {
  ADD_WISH,
  ADD_WISH_END,
  GET_AUTHORS_START,
  GET_AUTHORS_END,
  GET_CATEGORIES_START,
  GET_CATEGORIES_END,
  GET_VOTE,
  GET_VOTE_END,
  GET_WISHLIST_START,
  GET_WISHLIST_END,
  MOVE_WISH_TO_LIBRARY,
  MOVE_WISH_TO_LIBRARY_END,
  SET_FILTERS_START,
  SET_FILTERS_END,
  SET_VOTE,
  SET_VOTE_END,
} from './actionTypes';

export const addWish = (bookWish) => ({
  type: ADD_WISH,
  payload: bookWish,
});
export const addWishEnd = (bookWish) => ({
  type: ADD_WISH_END,
  payload: bookWish,
});

export const getAuthors = () => ({
  type: GET_AUTHORS_START,
});

export const getAuthorsEnd = (authors) => ({
  type: GET_AUTHORS_END,
  payload: authors,
});

export const getCategories = () => ({ type: GET_CATEGORIES_START });

export const getCategoriesEnd = (categories) => ({
  type: GET_CATEGORIES_END,
  payload: categories,
});

export const getWishlist = (params) => ({
  type: GET_WISHLIST_START,
  payload: params,
});
export const getWishlistEnd = (wishlist) => ({
  type: GET_WISHLIST_END,
  payload: wishlist,
});

export const moveWishToLibrary = (book) => ({
  type: MOVE_WISH_TO_LIBRARY,
  payload: book,
});
export const moveWishToLibraryEnd = (book) => ({
  type: MOVE_WISH_TO_LIBRARY_END,
  payload: book,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS_START,
  payload: filters,
});

export const setFiltersEnd = (filters) => ({
  type: SET_FILTERS_END,
  payload: filters,
});

export const setVote = (wishId, index) => ({
  type: SET_VOTE,
  payload: { wishId, index },
});
export const setVoteEnd = (index) => ({
  type: SET_VOTE_END,
  payload: index,
});
