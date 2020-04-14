import httpClient from '../../core/httpClient';

export const getCategoriesAPI = () => {
    return httpClient.get('books/categories');
}