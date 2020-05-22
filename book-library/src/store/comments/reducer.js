import { GET_COMMENTS_END, GET_BOOK_COMMENTS_END } from './actionTypes';

const initialState = {
  comments: [],
  total: 0,
};

//TODO Timestamp formatting
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_END: {
      return {
        ...state,
        comments: action.payload,
        total: action.payload.length,
      };
    }

    case GET_BOOK_COMMENTS_END: {
      return {
        ...state,
        comments: action.payload,
        total: action.payload.length,
      };
    }

    default:
      return state;
  }
};
