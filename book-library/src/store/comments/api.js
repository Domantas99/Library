import httpClient from "../../core/httpClient";

export const getComments = () => {
  return httpClient.get("comments");
};

export const getBookComments = (book) => {
  return httpClient.get(`books/${book}/comments/`);
};

export const addComment = (comment) => {
  return httpClient.post("comments", comment);
};
