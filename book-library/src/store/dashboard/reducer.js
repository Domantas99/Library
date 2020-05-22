import {
  GET_LATEST_BOOKS,
  GET_LATEST_BOOKS_END,
  GET_CURRENTLY_READING_BOOKS,
  GET_CURRENTLY_READING_BOOKS_END,
  GET_RECOMMENDED_BOOKS_END
} from './actionTypes';

const initialState = {
  latestBooks: [],
  currentlyReadingBooks: [],
  recommendedBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_BOOKS: {
      return state;
    }
    case GET_LATEST_BOOKS_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, latestBooks: result };
      }
      break;
    }
    case GET_RECOMMENDED_BOOKS_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, recommendedBooks: result };
      }
      break;
    }
    case GET_CURRENTLY_READING_BOOKS: {
      return state;
    }
    case GET_CURRENTLY_READING_BOOKS_END: {
      return { ...state, currentlyReadingBooks: action.payload };
    }
    default: {
      return state;
    }
  }
};
