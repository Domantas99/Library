/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAuthors,
  getCategories,
  setFilters,
} from '../store/library/actions';
import { getOffices } from '../store/office/actions';
import Button from './Button';
import Modal from './Modal';
import FilterModalContent from './FilterModalContent';

const LibraryFilter = ({ dataAction }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.library.filters);
  const [sortField, setSortField] = useState('DateAdded');
  const [sortDirection, setSortDirection] = useState(-1);
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
  const [filterElements, setFilterElements] = useState([]);
  const [modalState, setModalState] = useState(false);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, _] = useState(['sortField', 'sortDirection']);
  const categories = useSelector((state) => state.library.categories);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);

  const generateSortedFilters = useCallback(
    (newFilters) => {
      return {
        ...newFilters,
        sortField: [sortField],
        sortDirection: [sortDirection],
      };
    },
    [sortField, sortDirection]
  );

  const removeFilter = (key, filter) => {
    const newFilters = { ...filters };
    newFilters[key] = newFilters[key].filter((item) => item !== filter);
    if (!newFilters[key]) {
      delete newFilters[key];
    }
    dispatch(setFilters(generateSortedFilters(newFilters)));
  };

  const createFilterPill = (key, filter) => {
    return (
      <Button
        mini
        key={`${key}-${filter}`}
        onClick={() => removeFilter(key, filter)}
      >
        {`${filterMap[key].label}: ${filter}`}
      </Button>
    );
  };

  const handleModalClick = () => {
    setModalState(true);
  };

  const handleChangeSortField = (event) => {
    setSortField(event.target.value);
  };

  const handleChangeSortDirection = (event) => {
    setSortDirection(event.target.value);
  };

  const createFilterElements = () => {
    const elements = [];
    Object.keys(filters).forEach((key) => {
      if (!excludedFilters.includes(key)) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((filter) => {
            elements.push(createFilterPill(key, filter));
          });
        } else {
          elements.push(createFilterPill(key, filters[key]));
        }
      }
    });
    return elements;
  };

  useEffect(() => {
    dispatch(dataAction(generateSortedFilters(filters)));
  }, [filters, sortField, sortDirection]);

  useEffect(() => {
    setFilterElements(createFilterElements());
  }, [filters]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffices());
    dispatch(getAuthors());
  }, []);

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

  return (
    <>
      {filterElements}
      <Button onClick={() => handleModalClick()}>Add Filters</Button>
      <select
        id="book-list-sorting-field"
        defaultValue={sortField}
        onChange={handleChangeSortField}
      >
        <option value="Title">Title</option>
        <option value="ReleaseDate">Release Date</option>
        <option value="DateAdded">Date Added</option>
      </select>
      <select
        id="book-list-sorting-direction"
        defaultValue={`${sortDirection}`}
        onChange={handleChangeSortDirection}
      >
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="400px"
        width="80%"
      >
        <FilterModalContent
          filters={filters}
          filterMap={filterMap}
          modalHandler={setModalState}
        />
      </Modal>
    </>
  );
};

LibraryFilter.propTypes = {
  dataAction: PropTypes.func.isRequired,
};

export default LibraryFilter;
