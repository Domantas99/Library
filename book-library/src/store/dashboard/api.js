/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getLatestBooksAPI = (numberOfBooks) => {
  return httpClient.get(`books/latest/${numberOfBooks}`);
};

export const getCurrentlyReadingBooksAPI = () => {
  return [
    {
      id: 1,
      title: "Batman",
      isbn: "9789851807822",
      author: "Donald Trump",
      coverPictureUrl: "https://picsum.photos/200/300?random=1",
      goodReadsUrl: "https://www.goodreads.com/book/show/830502.It",
      releaseDate: "1986-09-15",
      dateAdded: "2020-03-28",
      description: "textA",
      category: "Art",
      tag: "tagA",
      format: "Audio",
      numberOfPages: "255",
      series: "batman",
      publisher: "Alma littera",
      editionLanguage: "English",
    },
    {
      id: 2,
      title: "World War2",
      author: "Baravykas",
      coverPictureUrl: "https://picsum.photos/200/300?random=2",
      releaseDate: "2000-04-01",
      dateAdded: "2020-03-28",
      description: "textC",
      category: "Health",
      tag: "tagA",
      format: "E-Book",
      numberOfPages: "255",
      series: "batman",
      publisher: "Alma littera",
      editionLanguage: "English",
      goodReadsUrl: "www.google.com",
    },
    {
      id: 3,
      title: "Spidar",
      author: "Balandis",
      coverPictureUrl: "https://picsum.photos/200/300?random=3",
      releaseDate: "1983-11-24",
      dateAdded: "2020-03-29",
      description: "textB",
      category: "Tech",
      tag: "tagB",
      format: "Audio",
      numberOfPages: "256",
      series: "jj",
      publisher: "Alma littera",
      editionLanguage: "English",
      goodReadsUrl: "www.google.com",
    },
  ];
};
