import {
  GET_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_END,
  REMOVE_RESERVATION_START,
  REMOVE_RESERVATION_END,
} from "./actionTypes";

const initialState = {
  reservationData: [],
  bookReservationData: [],
  teamReservationData: [],
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

    case GET_TEAM_RESERVATIONS_END: {
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
        teamReservationData: reservations,
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

    case REMOVE_RESERVATION_START: {
      return {
        ...state,
        reservationData: state.reservationData.filter(
          (x) => x.id !== action.payload
        ),
      };
    }
    case REMOVE_RESERVATION_END: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
