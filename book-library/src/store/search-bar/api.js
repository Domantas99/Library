import httpClient from '../../core/httpClient';

export const getSeachedBooksAPI = (pattern) => {
    return httpClient.get('books/filter/' + pattern)
};