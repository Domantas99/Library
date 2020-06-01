import { GET_COMMENTS_END, GET_BOOK_COMMENTS_END } from './actionTypes';
import { formatDateTime } from '../../utilities';

const initialState = {
  comments: {
    result: [],
    hasNextPage: false,
    hasPreviousPage: false,
    totalPages: 1,
    items: 0,
    page: 1,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_END: {
      return {
        ...state,
        comments: action.payload,
      };
    }

    case GET_BOOK_COMMENTS_END: {
      const formatted = action.payload.result.map((comment) => ({
        ...comment,
        createdOn: formatDateTime(comment.createdOn),
      }));
      return {
        ...state,
        comments: { ...action.payload, result: formatted },
      };
    }

    default:
      return state;
  }
};
