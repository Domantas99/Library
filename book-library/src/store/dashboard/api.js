/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getLatestBooksAPI = (numberOfBooks) => {
  return httpClient.get(`books/latest/${numberOfBooks}`);
};

export const getCurrentlyReadingBooksAPI = () => {
  return [
    {
      Id: 1,
      Title: "Batman",
      Isbn: "9789851807822",
      Author: "Donald Trump",
      CoverPictureUrl: "https://picsum.photos/200/300?random=1",
      GoodReadsUrl: "https://www.goodreads.com/book/show/830502.It",
      ReleaseDate: "1986-09-15",
      DateAdded: "2020-03-28",
      Description: "textA",
      Category: "Art",
      Tag: "tagA",
      Format: "Audio",
      NumberOfPages: "255",
      Series: "batman",
      Publisher: "Alma littera",
      EditionLanguage: "English",
    },
    {
      Id: 2,
      Title: "World War2",
      Author: "Baravykas",
      CoverPictureUrl: "https://picsum.photos/200/300?random=2",
      ReleaseDate: "2000-04-01",
      DateAdded: "2020-03-28",
      Description: "textC",
      Category: "Health",
      Tag: "tagA",
      Format: "E-Book",
      NumberOfPages: "255",
      Series: "batman",
      Publisher: "Alma littera",
      EditionLanguage: "English",
      GoodReadsUrl: "www.google.com",
    },
    {
      Id: 3,
      Title: "Spidar",
      Author: "Balandis",
      CoverPictureUrl: "https://picsum.photos/200/300?random=3",
      ReleaseDate: "1983-11-24",
      DateAdded: "2020-03-29",
      Description: "textB",
      Category: "Tech",
      Tag: "tagB",
      Format: "Audio",
      NumberOfPages: "256",
      Series: "jj",
      Publisher: "Alma littera",
      EditionLanguage: "English",
      GoodReadsUrl: "www.google.com",
    },
  ];
};