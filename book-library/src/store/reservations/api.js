/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

const reservations = [
  {
    id: 1,
    bookId: 1,
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
    office: "Kaunas",
    status: "Borrowed",
    bookedFrom: "2020-02-12",
    returnDate: "2020-04-12",
    userId: 1,
  },
  {
    id: 2,
    bookId: 2,
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
    office: "Kaunas",
    status: "Borrowed",
    bookedFrom: "2020-02-12",
    returnDate: "2020-04-12",
    userId: 1,
  },
  {
    id: 3,
    bookId: 3,
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
    office: "Kaunas",
    status: "Requested",
    bookedFrom: "2020-02-12",
    userId: 1,
  },
];

export const getReservationsList = (userId) => {
  return httpClient.get(`reservations/user/${userId}`);
};

export const addReservation = (reservation) => {
  reservations.push({ ...reservation, id: reservations.length + 1 });
  return reservation;
};

export const updateReservation = (reservation) => {
  reservations[
    reservations.findIndex((element) => element.id === reservation.id)
  ] = reservation;
  return reservation;
};
