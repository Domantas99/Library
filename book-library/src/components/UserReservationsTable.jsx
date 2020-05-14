import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReservations } from "../store/reservations/actions";
import { getFieldSorter } from "../utilities";
import ReservationsTableItem from "./ReservationsTableItem";

const createTableRows = (reservations, sort_field, sort_direction) => {
  return [...reservations]
    .sort(getFieldSorter(sort_field, sort_direction))
    .map((reservation) => (
      <ReservationsTableItem
        key={reservation.id}
        data={reservation}
      />
    ));
};

const ReservationsTable = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData.id);
  const reservations = useSelector(
    (state) => state.reservations.reservationData
  );
  const [sortField, setSortField] = useState("BookedFrom");
  const [sortDirection, setSortDirection] = useState(-1);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    dispatch(getReservations(userId));
  }, [dispatch, userId]);

  const handleChangeSortField = (event) => {
    setSortField(event.target.value);
  };

  const handleChangeSortDirection = (event) => {
    setSortDirection(event.target.value);
  };

  useEffect(() => {
    setTableRows(createTableRows(reservations, sortField, sortDirection));
  }, [reservations, sortField, sortDirection]);

  return (
    <div className="panel__content">
      <select
        id="book-list-sorting-field"
        defaultValue={sortField}
        onChange={handleChangeSortField}
      >
        <option value="Status">Status</option>
        <option value="ReturnDate">Return Date</option>
        <option value="BookedFrom">Booked From</option>
      </select>
      <select
        id="book-list-sorting-direction"
        defaultValue={`${sortDirection}`}
        onChange={handleChangeSortDirection}
      >
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
      <table>
        <thead>
          <tr>
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
    </div>
  );
};

export default ReservationsTable;
