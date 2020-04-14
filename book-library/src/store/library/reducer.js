import {GET_BOOK_LIST_END, GET_BOOK_DETAILS_END} from './actionTypes';

const initialState = {
  bookData: [],
  bookDetails: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST_END: {
      return {
        ...state,
        bookData: action.payload
      };
    }

    case GET_BOOK_DETAILS_END: {
      return {
        ...state,
        bookDetails: action.payload
      }
    }

    default: {
      return state;
    }
  }
};
