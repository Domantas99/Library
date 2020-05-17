import {
  GET_WISHLIST_END,
  ADD_WISH_END,
  SET_VOTE_END,
  GET_VOTE_END,
  GET_VOTE,
  SET_FILTERS_START,
  GET_CATEGORIES_START,
  GET_CATEGORIES_END,
  GET_AUTHORS_END,
} from './actionTypes';
import { paramGenerator, paramFormatter } from '../../utilities';

const initialState = {
  authors: [],
  bookData: [],
  categories: [],
  filters: [],
  modalState: false,
  voteData: {},
  voteState: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_END: {
      return {
        ...state,
        bookData: action.payload.returnResult,
      };
    }
    case ADD_WISH_END: {
      const temp = state.bookData;
      temp.push(action.payload.returnResult);
      return {
        ...state,
        bookData: temp,
      };
    }
    case SET_VOTE_END: {
      return {
        ...state,
        voteData: action.payload,
      };
    }
    case GET_VOTE: {
      return {
        ...state,
      };
    }
    case GET_VOTE_END: {
      return {
        ...state,
        voteState: action.payload.returnResult,
      };
    }
    case SET_FILTERS_START: {
      const newFilters = paramFormatter(action.payload);
      if (paramGenerator(newFilters) === paramGenerator(state.filters)) {
        return state;
      }
      return {
        ...state,
        filters: newFilters,
      };
    }
    case GET_CATEGORIES_START: {
      return { ...state };
    }

    case GET_CATEGORIES_END: {
      return {
        ...state,
        categories: action.payload.returnResult,
      };
    }

    case GET_AUTHORS_END: {
      return {
        ...state,
        authors: action.payload.returnResult,
      };
    }
    default: {
      return state;
    }
  }
};
