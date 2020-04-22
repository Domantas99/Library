import httpClient from "../../core/httpClient";

export const addBookAPI = (bookObj) => {
  return httpClient.post("books", bookObj);
};

export const getBookList = () => {
  return [
    {
      id: 1,
      title: "IT",
      isbn: "9789851807822",
      author: "Stephen King",
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
      title: "Storm Front",
      author: "Jim Butcher",
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
      title: "The Colour Of Magic",
      author: "Terry Pratchett",
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

export const getBookDetails = (id) => {
  return getBookList().find((element) => element.Id === id);
};
