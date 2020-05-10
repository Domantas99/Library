import {
  GET_WISHLIST_END,
  ADD_WISH_END,
  SET_VOTE_END,
  GET_VOTE_END,
  GET_VOTE,
} from './actionTypes';

const initialState = {
  bookData: [],
  modalState: false,
  voteData: {},
  voteState: [],
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
    case SET_VOTE_END: {
      return {
        ...state,
        voteData: action.payload,
      };
    }
    case GET_VOTE: {
      return {
        ...state,
      };
    }
    case GET_VOTE_END: {
      return {
        ...state,
        voteState: action.payload.returnResult,
      };
    }
    default: {
      return state;
    }
  }
};
