import {GET_BOOK_LIST_END, ADD_NEW_BOOK, ADD_NEW_BOOK_END} from './actionTypes';

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
    case ADD_NEW_BOOK: {
      debugger;
      return {
        ...state
      };
    }
    case ADD_NEW_BOOK_END: {
      debugger;
      let temp = state.bookData;
      temp.push(action.payload.returnResult);
      return {
        ...state, bookData:temp
      }
    }

    default: {
      return state;
    }
  }
};
