import {GET_BOOK_LIST_END} from './actionTypes';

const initialState = {
  bookData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST_END: {
      return {
        ...state,
        bookData: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
