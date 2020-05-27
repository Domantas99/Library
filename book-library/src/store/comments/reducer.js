import { GET_COMMENTS_END, GET_BOOK_COMMENTS_END } from './actionTypes';

const initialState = {
  comments: {},
};

// TODO Timestamp formatting
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_END: {
      return {
        ...state,
        comments: action.payload,
      };
    }

    case GET_BOOK_COMMENTS_END: {
      return {
        ...state,
        comments: action.payload,
      };
    }

    default:
      return state;
  }
};
