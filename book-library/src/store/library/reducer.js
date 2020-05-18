import {
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  GET_BOOK_DETAILS_END,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_AVAILABILITY_END,
  DELETE_BOOK,
  DELETE_BOOK_END,
  SET_FILTERS_START,
  GET_CATEGORIES_START,
  GET_CATEGORIES_END,
  SELECT_CATEGORY,
  UPDATE_BOOK_END,
  GET_AUTHORS_END,
  SET_BOOK_ARCHIVE_STATUS,
} from './actionTypes';
import { paramGenerator, paramFormatter } from '../../utilities';

const initialState = {
  authors: [],
  bookData: [],
  bookDetails: {
    book: {},
    isUserCurrentlyReading: false,
  },
  bookAvailability: [],
  filters: {},
  categories: [],
  activeCategory: null,
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
      const result = action.payload.returnResult;
      const returnedBook = result.book;
      return {
        ...state,
        bookDetails: {
          ...result,
          book: { ...returnedBook, releaseDate: returnedBook.releaseDate.substring(0, 10) },
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
    case UPDATE_BOOK_END: {
      const result = action.payload;
      if (!result.error) {
        return {
          ...state,
          bookDetails: action.payload.returnResult,
        };
      }
      return {
        ...state,
      };
    }

    case SET_FILTERS_START: {
      const newFilters = paramFormatter(action.payload);
      if (paramGenerator(newFilters) === paramGenerator(state.filters)) {
        return state;
      }
      let nextActiveCategory = null;
      if (newFilters.category) {
        if (newFilters.category.length === 1) {
          [nextActiveCategory] = newFilters.category;
        }
      }
      return {
        ...state,
        filters: newFilters,
        activeCategory: nextActiveCategory,
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

    case SELECT_CATEGORY: {
      return {
        ...state,
        activeCategory: action.payload,
      };
    }

    case GET_AUTHORS_END: {
      return {
        ...state,
        authors: action.payload.returnResult,
      };
    }
    case SET_BOOK_ARCHIVE_STATUS: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
};
