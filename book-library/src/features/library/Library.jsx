/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { BookList, BookDetails } from '../../components';
import {
  getBookList,
  setFilters,
  getAuthors,
  getCategories,
} from '../../store/library/actions';
import { getOffices } from '../../store/office/actions';
import ActionItem from '../../components/ActionItem';
import Filter from '../../components/Filter';
import Panel from '../../components/Panel';

const Library = ({ location }) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const { id } = useParams();
  const history = useHistory();
  const bookSelector = useSelector((state) => state.library.bookData);
  const filterSelector = useSelector((state) => state.library.filters);
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

  const categories = useSelector((state) => state.library.categories);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, _] = useState(['sortField', 'sortDirection']);

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
        filterComponent={<Filter
          dataAction={getBookList}
          filterSelector={filterSelector}
          filterMap={filterMap}
          excludedFilters={excludedFilters}
          setFilterAction={setFilters}
        />}
        actionButton={actionButton}
      />
    </Panel>
  );
};

export default Library;