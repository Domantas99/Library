import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { getAuthors, getCategories } from '../store/library/actions';
import { getOffices } from '../store/office/actions';
import { getReservations, setFilters } from '../store/reservations/actions';
import Filter from './Filter';
import ReservationsTableItem from './ReservationsTableItem';

const ReservationsTable = () => {
  const dispatch = useDispatch();
  const values = queryString.parse(window.location.search);
  const filterSelector = useSelector((state) => state.reservations.filters);
  const reservationData = useSelector(
    (state) => state.reservations.reservationData
  );
  /* Assuming every reserved book exists in library and so its category and author are in there.
    If the excess entries are too much trouble, can add a separate API call. */
  const categories = useSelector((state) => state.library.categories);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);
  const user = useSelector((state) => state.user.userData);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, setExcludedFilters] = useState(['sort']);
  const [tableRows, setTableRows] = useState([]);
  const [filterMap, setFilterMap] = useState({
    category: {
      label: 'Category',
      values: [],
    },
    authors: {
      label: 'Author',
      values: [],
    },
    offices: {
      label: 'Office',
      values: [],
    },
    status: {
      label: 'Status',
      values: ['Returned', 'Borrowed', 'Waiting'],
    },
  });
  /* eslint-disable no-unused-vars */
  const [sortMap, setSortMap] = useState([
    {
      value: 'recent',
      label: 'Recent',
    },
    {
      value: 'oldest',
      label: 'Oldest',
    },
    {
      value: 'titleaz',
      label: 'Title [A-Z]',
    },
    {
      value: 'titleza',
      label: 'Title [Z-A]',
    },
    {
      value: 'authoraz',
      label: 'Author [A-Z]',
    },
    {
      value: 'authorza',
      label: 'Author [Z-A]',
    },
    {
      value: 'fromasc',
      label: 'Booked From (Ascending)',
    },
    {
      value: 'fromdsc',
      label: 'Booked From (Descending)',
    },
    {
      value: 'returnasc',
      label: 'Return Date (Ascending)',
    },
    {
      value: 'returndsc',
      label: 'Return Date (Descending)',
    },
  ]);

  useEffect(() => {
    const generateFilterMap = () => {
      return {
        category: {
          label: 'Category',
          values: categories,
        },
        authors: {
          label: 'Author',
          values: authors,
        },
        offices: {
          label: 'Office',
          values: offices.map((office) => office.name),
        },
        status: filterMap.status,
      };
    };

    setFilterMap(generateFilterMap());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [categories, offices, authors]);

  useEffect(() => {
    if (user.id) {
      dispatch(getReservations(user.id, filterSelector));
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user, filterSelector]);

  useEffect(() => {
    const generateTableRows = () => {
      return reservationData.map((reservation) => {
        return (
          <ReservationsTableItem key={reservation.id} data={reservation} />
        );
      });
    };
    setTableRows(generateTableRows());
  }, [reservationData]);

  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffices());
    dispatch(getAuthors());
  }, []);

  return (
    <div className="panel__content">
      <Filter
        dataAction={(filters) => getReservations(user.id, filters)}
        filterSelector={filterSelector}
        filterMap={filterMap}
        sortMap={sortMap}
        excludedFilters={excludedFilters}
        setFilterAction={setFilters}
      />
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
      <span>{`${reservationData.length} reservations`}</span>
    </div>
  );
};

export default ReservationsTable;
