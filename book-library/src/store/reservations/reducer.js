import {
  GET_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_END,
  REMOVE_RESERVATION_START,
  REMOVE_RESERVATION_END,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END
} from "./actionTypes";

const initialState = {
  reservationData: [],
  bookReservationData: [],
  currentlyReading: [],
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
          ...reservation
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
          ...reservation
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

    default:
      return state;
  }
};
