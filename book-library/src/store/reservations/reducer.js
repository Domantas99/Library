import { GET_RESERVATIONS_END, GET_BOOK_RESERVATIONS_END } from "./actionTypes";

const initialState = {
  reservationData: [],
  bookReservationData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
          bookedFrom: reservation.bookedFrom
            ? reservation.bookedFrom.substring(0, 10)
            : "",
          returnDate: reservation.returnDate
            ? reservation.returnDate.substring(0, 10)
            : "",
        };
      });
      return {
        ...state,
        reservationData: reservations,
      };
    }

    case GET_BOOK_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
          bookedFrom: reservation.bookedFrom
            ? reservation.bookedFrom.substring(0, 10)
            : "",
          returnDate: reservation.returnDate
            ? reservation.returnDate.substring(0, 10)
            : "",
        };
      });
      return {
        ...state,
        bookReservationData: reservations,
      };
    }

    default:
      return state;
  }
};
