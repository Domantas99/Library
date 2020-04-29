import {
  GET_CATEGORIES,
  GET_CATEGORIES_END,
  SELECT_CATEGORY,
} from "./actionTypes";

export const getCategories = () => ({ type: GET_CATEGORIES });
export const categoriesLoaded = (categories) => ({
  type: GET_CATEGORIES_END,
  payload: categories,
});
export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});
