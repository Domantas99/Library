import {
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  GET_BOOK_DETAILS_END,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_AVAILABILITY_END,
  DELETE_BOOK,
  DELETE_BOOK_END,
} from "./actionTypes";

const initialState = {
  bookData: [],
  bookDetails: [],
  bookAvailability: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST_END: {
      const books = action.payload.returnResult.map((book) => {
        return {
          ...book,
          releaseDate: book.releaseDate.substring(0, 10),
        };
      });
      return {
        ...state,
        bookData: books,
      };
    }
    case ADD_NEW_BOOK: {
      return {
        ...state,
      };
    }
    case GET_BOOK_DETAILS_END: {
      return {
        ...state,
        bookDetails: {
          ...action.payload.returnResult,
          releaseDate: action.payload.returnResult.releaseDate.substring(0, 10),
        },
      };
    }
    case GET_BOOK_AVAILABILITY: {
      return {
        ...state,
        bookAvailability: [],
      };
    }
    case GET_BOOK_AVAILABILITY_END: {
      return {
        ...state,
        bookAvailability: action.payload.returnResult,
      };
    }
    case DELETE_BOOK: {
      return {
        ...state,
      };
    }
    case DELETE_BOOK_END: {
      const result = action.payload;
      if (!result.error) {
        const books = state.bookData.filter((x) => x.result.returnResult.id);
        return {
          ...state,
          bookData: books,
        };
      }
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
