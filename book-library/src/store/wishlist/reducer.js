import { GET_WISHLIST_END, SET_WISHLIST_MODAL } from "./actionTypes";

const initialState = {
  bookData: [],
  modalState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_END: {
      return {
        ...state,
        bookData: action.payload,
      };
    }
    case SET_WISHLIST_MODAL: {
      return {
        ...state,
        modalState: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
