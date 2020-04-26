import {
  GET_BOOK_LIST_END,
  ADD_NEW_BOOK,
  ADD_NEW_BOOK_END,
  GET_BOOK_DETAILS_END,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_AVAILABILITY_END,
  SET_CONFIRMATION_MODAL,
  DELETE_BOOK,
  DELETE_BOOK_END,
} from "./actionTypes";

const initialState = {
  bookData: [],
  bookDetails: [],
  bookAvailability: [],
  confirmationModal: false,
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
    case SET_CONFIRMATION_MODAL: {
      return {
        ...state,
        confirmationModal: action.payload,
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
        }
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
