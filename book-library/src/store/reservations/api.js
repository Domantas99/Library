/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';
import { paramGenerator } from '../../utilities';

const reservations = [
  {
    id: 1,
    bookId: 1,
    title: 'IT',
    isbn: '9789851807822',
    author: 'Stephen King',
    coverPictureUrl: 'https://picsum.photos/200/300?random=1',
    goodReadsUrl: 'https://www.goodreads.com/book/show/830502.It',
    releaseDate: '1986-09-15',
    dateAdded: '2020-03-28',
    description: 'textA',
    category: 'Art',
    tag: 'tagA',
    format: 'Audio',
    numberOfPages: '255',
    series: 'batman',
    publisher: 'Alma littera',
    editionLanguage: 'English',
    office: 'Kaunas',
    status: 'Borrowed',
    bookedFrom: '2020-02-12',
    returnDate: '2020-04-12',
    userId: 1,
  },
  {
    id: 2,
    bookId: 2,
    title: 'Storm Front',
    author: 'Jim Butcher',
    coverPictureUrl: 'https://picsum.photos/200/300?random=2',
    releaseDate: '2000-04-01',
    dateAdded: '2020-03-28',
    description: 'textC',
    category: 'Health',
    tag: 'tagA',
    format: 'E-Book',
    numberOfPages: '255',
    series: 'batman',
    publisher: 'Alma littera',
    editionLanguage: 'English',
    goodReadsUrl: 'www.google.com',
    office: 'Kaunas',
    status: 'Borrowed',
    bookedFrom: '2020-02-12',
    returnDate: '2020-04-12',
    userId: 1,
  },
  {
    id: 3,
    bookId: 3,
    title: 'The Colour Of Magic',
    author: 'Terry Pratchett',
    coverPictureUrl: 'https://picsum.photos/200/300?random=3',
    releaseDate: '1983-11-24',
    dateAdded: '2020-03-29',
    description: 'textB',
    category: 'Tech',
    tag: 'tagB',
    format: 'Audio',
    numberOfPages: '256',
    series: 'jj',
    publisher: 'Alma littera',
    editionLanguage: 'English',
    goodReadsUrl: 'www.google.com',
    office: 'Kaunas',
    status: 'Requested',
    bookedFrom: '2020-02-12',
    userId: 1,
  },
];

export const getReservationsList = ({id, filters}) => {
  let url = `reservations/user/${id}`;
  if (filters) {
    url += `?${paramGenerator(filters)}`;
  }
  return httpClient.get(url);
};

export const getTeamReservations = (params) => {
  let url = 'reservations';
  if (params) {
    url += `?${paramGenerator(params)}`;
  }
  return httpClient.get(url);
};

//TODO This needs to be real API data.
export const getBookReservations = (bookId) => {
  return {
    errorFlag: false,
    returnResult: [
      {
        id: 1,
        bookId,
        office: 'Kaunas',
        status: 'Borrowed',
        bookedFrom: '2020-04-12',
        returnDate: '2020-05-12',
        userId: 1,
        userName: 'Jonas Jonaitis',
        userPictureUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
      },
      {
        id: 2,
        bookId,
        office: 'Vilnius',
        status: 'Borrowed',
        bookedFrom: '2020-04-12',
        returnDate: '2020-05-12',
        userId: 2,
        userName: 'Justas Justaitis',
        userPictureUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      },
      {
        id: 3,
        bookId,
        office: 'Kaunas',
        status: 'Waiting',
        bookedFrom: '2020-04-12',
        userId: 3,
        userName: 'Lina Linaitė',
        userPictureUrl: 'https://randomuser.me/api/portraits/women/78.jpg',
      },
      {
        id: 4,
        bookId,
        office: 'Vilnius',
        status: 'Waiting',
        bookedFrom: '2020-04-12',
        userId: 4,
        userName: 'Sima Simaitė',
        userPictureUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
      },
    ],
  };
};

export const addReservation = (reservation) => {
  return httpClient.post('reservations', reservation);
};

//TODO This needs to be a real API method.
export const updateReservation = (reservation) => {
  reservations[
    reservations.findIndex((element) => element.id === reservation.id)
  ] = reservation;
  return reservation;
};

export const addWaiting = (waiting) => {
  httpClient.post('reservations/waiting', waiting);
};

export const removeWaiting = (waitingId) => {
  return httpClient.delete(`reservations/waiting/${waitingId}`)
};

export const removeReservationAPI = (reservationId) => {
  return httpClient.delete(`reservations/${reservationId}`);
};
