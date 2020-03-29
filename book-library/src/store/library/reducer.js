import {GOT_BOOK_LIST} from './actionTypes';

const initialState = {
  bookData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_BOOK_LIST: {
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
