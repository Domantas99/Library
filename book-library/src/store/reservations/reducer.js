import {
  GET_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_END,
  REMOVE_RESERVATION_START,
  REMOVE_RESERVATION_END,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END,
  SET_FILTERS_START,
  SET_TEAM_FILTERS_START,
} from "./actionTypes";
import { paramGenerator, paramFormatter } from '../../utilities';

const initialState = {
  bookReservationData: [],
  currentlyReading: [],
  filters: {},
  reservationData: [],
  teamFilters: {},
  teamReservationData: {
    reservations: [],
    hasNextPage: false,
    hasPreviousPage: false,
    totalPages: 1,
    items: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
          bookedFrom: reservation.bookedFrom
            ? reservation.bookedFrom.substring(0, 10)
            : '',
          returnDate: reservation.returnDate
            ? reservation.returnDate.substring(0, 10)
            : '',
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
            : '',
          returnDate: reservation.returnDate
            ? reservation.returnDate.substring(0, 10)
            : '',
        };
      });
      return {
        ...state,
        teamReservationData: {
          reservations: reservations,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
          totalPages: action.payload.totalPages,
          items: action.payload.items,
        },
      };
    }

    case GET_BOOK_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
          bookedFrom: reservation.bookedFrom
            ? reservation.bookedFrom.substring(0, 10)
            : '',
          returnDate: reservation.returnDate
            ? reservation.returnDate.substring(0, 10)
            : '',
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

    case REMOVE_WAITING_START: {
      return {
        ...state,
        reservationData: state.reservationData.filter(
          (x) => x.id !== action.payload
        ),
      };
    }

    case REMOVE_WAITING_END: {
      return {
        ...state,
      };
    }

    case SET_FILTERS_START: {
      const newFilters = paramFormatter(action.payload);
      if (paramGenerator(newFilters) === paramGenerator(state.filters)) {
        return state;
      }
      return {
        ...state,
        filters: newFilters,
      };
    }

    case SET_TEAM_FILTERS_START: {
      const newFilters = paramFormatter(action.payload);
      if (paramGenerator(newFilters) === paramGenerator(state.teamFilters)) {
        return state;
      }
      return {
        ...state,
        teamFilters: newFilters,
      };
    }

    default:
      return state;
  }
};
