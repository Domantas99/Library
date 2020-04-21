import { GET_LATEST_BOOKS, GET_LATEST_BOOKS_END } from "./actionTypes";

const initialState = {
  latestBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_BOOKS: {
      return state;
    }
    case GET_LATEST_BOOKS_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, latestBooks: result.returnResult };
      }
      break;
    }
    default: {
      return state;
    }
  }
};
