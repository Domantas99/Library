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
import { paramGenerator, paramFormatter, formatDate } from '../../utilities';

const initialState = {
  authors: [],
  bookData: [],
  bookDetails: {},
  bookAvailability: [],
  filters: {},
  categories: [],
  activeCategory: null,
};

export default (state = initialState, action) => {
  console.log(action, "vykksta veiksmas")
  switch (action.type) {
    case GET_BOOK_LIST_END: {
      const books = action.payload.map((book) => {
        return {
          ...book,
          releaseDate: formatDate(book.releaseDate),
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
      const result = action.payload;
      const returnedBook = result.book;
      return {
        ...state,
        bookDetails: {
          ...result,
          book: {
            ...returnedBook,
            releaseDate: formatDate(returnedBook.releaseDate),
          },
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
        bookAvailability: action.payload,
      };
    }
    case DELETE_BOOK: {
      return {
        ...state,
      };
    }
    case DELETE_BOOK_END: {
      return {
        ...state,
      };
    }
    case UPDATE_BOOK_END: {
      const result = action.payload;
      if (!result.error) {
        return {
          ...state,
          bookDetails: action.payload,
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
        categories: action.payload,
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
        authors: action.payload,
      };
    }
    case SET_BOOK_ARCHIVE_STATUS: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
