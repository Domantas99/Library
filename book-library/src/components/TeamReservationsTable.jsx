import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ReservationsTableItem from "./ReservationsTableItem";
import { getTeamReservations } from "../store/reservations/actions";

const TeamReservationsTable = ({ startingPage, pageSize }) => {
  const dispatch = useDispatch();
  const reservationData = useSelector(
    (state) => state.reservations.teamReservationData
  );
  const [page, setPage] = useState(startingPage);
  const [sort, setSort] = useState("recent");
  const [tableRows, setTableRows] = useState([]);
  const [navButtons, setNavButtons] = useState([]);

  useEffect(() => {
    dispatch(getTeamReservations(page, pageSize, sort));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [page, pageSize, sort]);

  useEffect(() => {
    const generateTableRows = () => {
      return reservationData.reservations.map((reservation) => {
        console.log(reservation);
        return (
          <ReservationsTableItem key={reservation.id} data={reservation} />
        );
      });
    };
    setTableRows(generateTableRows());
  }, [reservationData]);

  useEffect(() => {
    const generateNavButtons = () => {
      let buttons = [];
      buttons.push(
        <button
          key="prev"
          className="reservations__button-step"
          disabled={!reservationData.hasPreviousPage}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          &lt; Prev
        </button>
      );
      if (page > 1) {
        if (page > 2 && page === reservationData.totalPages) {
          buttons.push(
            <button
              key={page - 2}
              className="reservations__button-number"
              onClick={() => {
                setPage(page - 2);
              }}
            >
              {page - 2}
            </button>
          );
        }
        buttons.push(
          <button
            key={page - 1}
            className="reservations__button-number"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {page - 1}
          </button>
        );
      }
      buttons.push(
        <button key={page} disabled className="reservations__button-current">
          {page}
        </button>
      );
      if (page < reservationData.totalPages) {
        buttons.push(
          <button
            key={page + 1}
            className="reservations__button-number"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {page + 1}
          </button>
        );
        if (page === 1 && reservationData.totalPages > 2) {
          buttons.push(
            <button
              key={3}
              className="reservations__button-number"
              onClick={() => {
                setPage(3);
              }}
            >
              {3}
            </button>
          );
        }
      }
      buttons.push(
        <button
          key="next"
          className="reservations__button-step"
          disabled={!reservationData.hasNextPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next &gt;
        </button>
      );
      return buttons;
    };
    setNavButtons(generateNavButtons);
  }, [reservationData, page, pageSize]);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="panel__content">
      <select value={sort} onChange={handleChangeSort}>
        <option value="recent">Recent</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Book</th>
            <th>Office</th>
            <th>Status</th>
            <th>Booked from</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <span>{`${reservationData.items} reservations`}</span>
      {navButtons}
    </div>
  );
};

TeamReservationsTable.propTypes = {
  startingPage: PropTypes.number,
  pageSize: PropTypes.number,
};

TeamReservationsTable.defaultProps = {
  startingPage: 1,
  pageSize: 10,
};
export default TeamReservationsTable;
