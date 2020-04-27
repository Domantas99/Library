import { GET_WISHLIST_END, ADD_WISH_END } from "./actionTypes";

const initialState = {
  bookData: [],
  modalState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_END: {
      return {
        ...state,
        bookData: action.payload.returnResult,
      };
    }
    case ADD_WISH_END: {
      const temp = state.bookData;
      temp.push(action.payload.returnResult);
      return {
        ...state,
        bookData: temp,
      };
    }
    default: {
      return state;
    }
  }
};
