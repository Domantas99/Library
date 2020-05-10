import { GET_OFFICES, GET_OFFICES_END } from './actionTypes';

const initialState = {
  offices: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFICES: {
      return state;
    }
    case GET_OFFICES_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, offices: result.returnResult };
      }
      break;
    }

    default: {
      return state;
    }
  }
};
