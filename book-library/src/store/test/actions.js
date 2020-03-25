import {
  GET_MOCKED,
  GET_MOCKED_END,
  GET_MOCKED_ID,
  GET_MOCKED_ID_END,
  GET_TEST,
  GET_TEST_END,
} from './actionTypes';

export const getTest = () => ({type: GET_TEST});
export const testLoaded = (testData) => ({type: GET_TEST_END, payload: testData});

export const getMocked = () => ({type: GET_MOCKED});
export const mockedLoaded = (mockedData) => ({type: GET_MOCKED_END, payload: mockedData});

export const getMockedById = (id) => ({type: GET_MOCKED_ID, payload: id});
export const mockedByIdLoaded = (mockedData) => ({type: GET_MOCKED_ID_END, payload: mockedData});