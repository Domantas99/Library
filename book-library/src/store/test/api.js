import httpClient from "../../core/httpClient";

export const getTest = () => {
  return httpClient.get("test");
};

export const getMocked = () => {
  return {
    libraryName: "mocked library name",
    bookCount: Math.floor(Math.random() * 69),
  };
};

export const getMockedById = (id) => {
  return {
    libraryName: `mocked library ${id}`,
    bookCount: id,
  };
};
