import { GET_USER, GET_USER_END } from './actionTypes';

const initialState = {
  loggedInUserId: 1,
  userData: { isAdmin: true },
  users: [
    { id: 1, userName: 'Nathaniux123' },
    { id: 2, userName: 'Beanz' },
    { id: 3, userName: 'MrAdmin' },
  ], //TODO need users list implemented
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
