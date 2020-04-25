import { GET_COMMENTS_START, GET_COMMENTS_END} from "./actionTypes";

export const getComments = (book) => ({type: GET_COMMENTS_START, payload: book});
export const getCommentsEnd = (comments) => ({type: GET_COMMENTS_END, payload: comments}); 