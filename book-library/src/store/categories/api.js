import httpClient from '../../core/httpClient';

export const getCategoriesAPI = () => {
    debugger;
    return httpClient.get('books/categories');
}