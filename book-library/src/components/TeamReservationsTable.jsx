/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { getAuthors, getCategories } from '../store/library/actions';
import { getOffices } from '../store/office/actions';
import {
  getTeamReservations,
  setTeamFilters,
} from '../store/reservations/actions';
import Button from './Button';
import Filter from './Filter';
import ReservationsTableItem from './ReservationsTableItem';

const TeamReservationsTable = ({ startingPage, pageSize }) => {
  const dispatch = useDispatch();
  const values = queryString.parse(window.location.search);
  const filterSelector = useSelector((state) => state.reservations.teamFilters);
  const reservationData = useSelector(
    (state) => state.reservations.teamReservationData
  );
  /* Assuming every reserved book exists in library and so its category and author are in there.
    If the excess entries are too much trouble, can add a separate API call. */
  const categories = useSelector((state) => state.library.categories);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);
  const users = useSelector((state) => state.user.users);

  const [page, setPage] = useState(startingPage);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, setExcludedFilters] = useState([
    'sort',
    'page',
    ' pageSize',
  ]);
  const [tableRows, setTableRows] = useState([]);
  const [navButtons, setNavButtons] = useState([]);
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
    users: {
      label: 'Users',
      values: [],
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
        users: {
          label: 'User',
          values: _.map(users, (user) => user.userName),
        },
      };
    };

    setFilterMap(generateFilterMap());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [categories, offices, authors, users]);

  useEffect(() => {
    dispatch(
      getTeamReservations({
        ...filterSelector,
        page: [page],
        pageSize: [pageSize],
      })
    );
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [page, pageSize, filterSelector]);

  useEffect(() => {
    const generateTableRows = () => {
      return reservationData.reservations.map((reservation) => {
        return (
          <ReservationsTableItem key={reservation.id} data={reservation} />
        );
      });
    };
    setTableRows(generateTableRows());
  }, [reservationData]);

  useEffect(() => {
    dispatch(setTeamFilters(values));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffices());
    dispatch(getAuthors());
  }, []);

  useEffect(() => {
    const generateNavButtons = () => {
      const buttons = [];
      buttons.push(
        <Button
          key="prev"
          className="reservations__button-step"
          disabled={!reservationData.hasPreviousPage}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          &lt; Prev
        </Button>
      );
      if (page > 1) {
        if (page > 2 && page === reservationData.totalPages) {
          buttons.push(
            <Button
              key={page - 2}
              className="reservations__button-number"
              onClick={() => {
                setPage(page - 2);
              }}
            >
              {page - 2}
            </Button>
          );
        }
        buttons.push(
          <Button
            key={page - 1}
            className="reservations__button-number"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {page - 1}
          </Button>
        );
      }
      buttons.push(
        <Button key={page} disabled className="reservations__button-current">
          {page}
        </Button>
      );
      if (page < reservationData.totalPages) {
        buttons.push(
          <Button
            key={page + 1}
            className="reservations__button-number"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {page + 1}
          </Button>
        );
        if (page === 1 && reservationData.totalPages > 2) {
          buttons.push(
            <Button
              key={3}
              className="reservations__button-number"
              onClick={() => {
                setPage(3);
              }}
            >
              {3}
            </Button>
          );
        }
      }
      buttons.push(
        <Button
          key="next"
          className="reservations__button-step"
          disabled={!reservationData.hasNextPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next &gt;
        </Button>
      );
      return buttons;
    };
    setNavButtons(generateNavButtons);
  }, [reservationData, page, pageSize]);

  return (
    <>
      <Filter
        dataAction={getTeamReservations}
        filterSelector={filterSelector}
        filterMap={filterMap}
        sortMap={sortMap}
        excludedFilters={excludedFilters}
        setFilterAction={setTeamFilters}
      />
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Book</th>
            <th>Office</th>
            <th>Status</th>
            <th>Booked from</th>
            <th>Return Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <span>{`${reservationData.items} reservations`}</span>
      <div className="reservations-nav">{navButtons}</div>
    </>
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
