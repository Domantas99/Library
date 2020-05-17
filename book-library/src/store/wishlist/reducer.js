import {
  ADD_WISH_END,
  GET_AUTHORS_END,
  GET_CATEGORIES_START,
  GET_CATEGORIES_END,
  GET_VOTE,
  GET_VOTE_END,
  GET_WISHLIST_END,
  SET_FILTERS_START,
  SET_VOTE_END,
} from './actionTypes';
import { paramGenerator, paramFormatter } from '../../utilities';

const initialState = {
  authors: [],
  bookData: [],
  categories: [],
  filters: {},
  modalState: false,
  voteData: {},
  voteState: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISH_END: {
      const temp = state.bookData;
      temp.push(action.payload.returnResult);
      return {
        ...state,
        bookData: temp,
      };
    }

    case GET_AUTHORS_END: {
      return {
        ...state,
        authors: action.payload.returnResult,
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

    case GET_WISHLIST_END: {
      return {
        ...state,
        bookData: action.payload.returnResult,
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

    case SET_VOTE_END: {
      return {
        ...state,
        voteData: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
