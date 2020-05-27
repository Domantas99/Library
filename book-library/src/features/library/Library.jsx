/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  getBookList,
  setFilters,
  getAuthors,
  getCategories,
} from '../../store/library/actions';
import { getOffices } from '../../store/office/actions';
import {
  ActionItem,
  BookDetails,
  BookList,
  Filter,
  Panel,
} from '../../components';

const Library = ({ location }) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const { id } = useParams();
  const history = useHistory();
  const bookSelector = useSelector((state) => state.library.bookData);
  const filterSelector = useSelector((state) => state.library.filters);
  const categories = useSelector((state) => state.library.categories);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);
  const userData = useSelector((state) => state.user.userData);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, setExcludedFilters] = useState(['sort']);
  const actionButton = (
    <ActionItem
      linkTitle="Register new book"
      onClickAction={() => history.push('/library/register-book')}
    />
  );
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
      values: ['Available', 'Unavailable'],
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
  ]);

  const filterComponent = useCallback(
    () => (
      <Filter
        dataAction={getBookList}
        filterSelector={filterSelector}
        filterMap={filterMap}
        sortMap={sortMap}
        excludedFilters={excludedFilters}
        setFilterAction={(filterValues) => {
          return setFilters(filterValues);
        }}
      />
    ),
    [filterSelector, filterMap, sortMap, excludedFilters]
  );

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
  }, [categories, offices, authors]);

  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffices());
    dispatch(getAuthors());
  }, []);

  return id ? (
    <BookDetails id={id} />
  ) : (
    <Panel title="Library">
      <BookList
        dataSelector={bookSelector}
        dataAction={getBookList(values)}
        navigateItems
        addLink="/library/register-book"
        filterComponent={filterComponent()}
        actionButton={userData && userData.isAdmin === true && actionButton}
      />
    </Panel>
  );
};

Library.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ search: PropTypes.string }),
  ]),
};

Library.defaultProps = {
  location: '',
};

export default Library;
