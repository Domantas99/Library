import { GET_MOCKED_END, GET_MOCKED_ID_END, GET_TEST_END } from './actionTypes';

const initialState = {
  testData: null,
  mockedData: null,
  mockedById: null
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_TEST_END: {
      return {
        ...state,
        testData: action.payload
      };
    }

    case GET_MOCKED_END: {
      return {
        ...state,
        mockedData: action.payload
      };
    }

    case GET_MOCKED_ID_END: {
      return {
        ...state,
        mockedById: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
