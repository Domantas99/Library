import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ReservationsTableItem from "./ReservationsTableItem";
import { getTeamReservations } from "../store/reservations/actions";

const TeamReservationsTable = ({ startingPage, pageSize }) => {
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.reservations.teamReservationData
  );
  const [page, setPage] = useState(startingPage);
  const [sort, setSort] = useState("recent");
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    dispatch(getTeamReservations(page, pageSize, sort));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [page, pageSize, sort]);

  useEffect(() => {
    const generateTableRows = () => {
      return reservations.map((reservation) => {
        console.log(reservation);
        return (
          <ReservationsTableItem
            key={reservation.id}
            data={reservation}
          />
        );
      });
    };
    setTableRows(generateTableRows());
  }, [reservations]);
  return (
    <div className="panel__content">
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
