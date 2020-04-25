/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getWishlist = () => {
  return [
    {
      id: 4,
      title: "The Prince",
      author: "Niccolò Machiavelli",
      coverPictureUrl: "https://picsum.photos/200/300?random=4",
      releaseDate: "1532-01-01",
      dateAdded: "2020-04-08",
    },
    {
      id: 5,
      title: "Frankenstein; or, Modern Prometheus",
      author: "Mary Shelley",
      coverPictureUrl: "https://picsum.photos/200/300?random=5",
      releaseDate: "1818-01-01",
      dateAdded: "2020-04-08",
    },
  ];
};

export const addWishAPI = (wishObj) => {
  // add url here
  // httpClient.post(url, wishObj);
  return {
    error: false,
    returnResult: {
      id: 6,
      title: "Whoooohoooo",
      author: "Mary xa",
      coverPictureUrl: "https://picsum.photos/200/300?random=6",
      releaseDate: "1818-01-01",
      dateAdded: "2020-04-08",
    },
  };
};
