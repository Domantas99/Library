import {
  GET_USER_END,
  GET_USER_LIST_END,
  LOGOUT,
  PING_AUTH_END,
  PING_AUTH,
  PING_AUTH_ERROR,
} from './actionTypes';

const initialState = {
  userData: { isAdmin: false },
  isAuthenticated: false,
  authLoading: true,
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_END: {
      const result = action.payload;
      if (!result.error) {
        return { ...state, userData: result };
      }
      break;
    }

    case GET_USER_LIST_END: {
      return { ...state, users: action.payload };
    }

    case LOGOUT: {
      return { initialState };
    }

    case PING_AUTH: {
      return { ...state, isAuthenticated: false, authLoading: true };
    }

    case PING_AUTH_END: {
      return { ...state, isAuthenticated: true, authLoading: false };
    }

    case PING_AUTH_ERROR: {
      return { ...state, authLoading: false };
    }

    default: {
      return state;
    }
  }
};
