import { GET_USER, GET_USER_END } from "./actionTypes";

const initialState = {
  userData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return state;
    }
    case GET_USER_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, userData: result.returnResult };
      }
      break;
    }

    default: {
      return state;
    }
  }
};
