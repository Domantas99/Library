import {
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  ADD_NEW_BOOK_END,
  GET_BOOK_DETAILS_END,
} from "./actionTypes";

const initialState = {
  bookData: [],
  bookDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST_END: {
      return {
        ...state,
        bookData: action.payload.returnResult,
      };
    }
    case ADD_NEW_BOOK: {
      return {
        ...state,
      };
    }
    case ADD_NEW_BOOK_END: {
      const temp = state.bookData;
      temp.push(action.payload.returnResult);
      return {
        ...state,
        bookData: temp,
      };
    }

    case GET_BOOK_DETAILS_END: {
      return {
        ...state,
        bookDetails: action.payload.returnResult,
      };
    }

    default: {
      return state;
    }
  }
};
