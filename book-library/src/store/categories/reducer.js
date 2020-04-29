import {
  GET_CATEGORIES,
  GET_CATEGORIES_END,
  SELECT_CATEGORY,
} from "./actionTypes";

const initialState = {
  data: [],
  selected: "all",
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_CATEGORIES: {
      return { ...state };
    }
    case GET_CATEGORIES_END: {
      return { data: action.payload.returnResult };
    }
    case SELECT_CATEGORY: {
      debugger
      return {
        ...state,
        selected: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
