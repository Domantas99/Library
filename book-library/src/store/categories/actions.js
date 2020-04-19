import { GET_CATEGORIES, GET_CATEGORIES_END } from "./actionTypes";

export const getCategories = () => ({ type: GET_CATEGORIES });
export const categoriesLoaded = (categories) => ({
  type: GET_CATEGORIES_END,
  payload: categories,
});
