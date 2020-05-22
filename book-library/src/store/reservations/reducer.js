import {
  CHECK_IN_RESERVATION_START,
  CHECK_IN_RESERVATION_END,
  GET_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_END,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END,
  SET_FILTERS_START,
  SET_TEAM_FILTERS_START,
} from './actionTypes';
import { formatDate, paramGenerator, paramFormatter } from '../../utilities';

const initialState = {
  bookReservationData: { borrowed: [], waiting: [] },
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
    case CHECK_IN_RESERVATION_START: {
      return {
        ...state,
        reservationData: state.reservationData.filter(
          (x) => x.id !== action.payload
        ),
      };
    }

    case CHECK_IN_RESERVATION_END: {
      return {
        ...state,
      };
    }

    case GET_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
        };
      });
      return {
        ...state,
        reservationData: reservations,
      };
    }

    case GET_BOOK_RESERVATIONS_END: {
      const borrowed = action.payload.returnResult
        .filter((x) => x.status === 'Borrowed')
        .map((reservation) => ({
          ...reservation,
          bookedFrom: formatDate(reservation.bookedFrom),
          returnDate: formatDate(reservation.returnDate),
        }));
      const waiting = action.payload.returnResult
        .filter((x) => x.status === 'Waiting')
        .map((reservation) => ({
          ...reservation,
          bookedFrom: formatDate(reservation.bookedFrom),
        }));
      return {
        ...state,
        bookReservationData: { borrowed, waiting },
      };
    }

    case GET_TEAM_RESERVATIONS_END: {
      const reservations = action.payload.returnResult.map((reservation) => {
        return {
          ...reservation,
        };
      });
      return {
        ...state,
        teamReservationData: {
          reservations,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
          totalPages: action.payload.totalPages,
          items: action.payload.items,
        },
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
      const newFilters = paramFormatter(action.payload.filters);
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
