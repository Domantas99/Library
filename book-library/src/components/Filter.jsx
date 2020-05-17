/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import FilterModalContent from './FilterModalContent';
import Modal from './Modal';

const Filter = ({
  dataAction,
  filterSelector,
  filterMap,
  excludedFilters,
  setFilterAction,
}) => {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState('DateAdded');
  const [sortDirection, setSortDirection] = useState(-1);
  const [filterElements, setFilterElements] = useState([]);
  const [modalState, setModalState] = useState(false);

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
    const newFilters = { ...filterSelector };
    newFilters[key] = newFilters[key].filter((item) => item !== filter);
    if (!newFilters[key]) {
      delete newFilters[key];
    }
    dispatch(setFilterAction(generateSortedFilters(newFilters)));
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
    Object.keys(filterSelector).forEach((key) => {
      if (!excludedFilters.includes(key)) {
        if (Array.isArray(filterSelector[key])) {
          filterSelector[key].forEach((filter) => {
            elements.push(createFilterPill(key, filter));
          });
        } else {
          elements.push(createFilterPill(key, filterSelector[key]));
        }
      }
    });
    return elements;
  };

  useEffect(() => {
    dispatch(dataAction(generateSortedFilters(filterSelector)));
  }, [filterSelector, sortField, sortDirection]);

  useEffect(() => {
    setFilterElements(createFilterElements());
  }, [filterSelector]);

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
          filters={filterSelector}
          filterMap={filterMap}
          modalHandler={setModalState}
          setFilterAction={setFilterAction}
        />
      </Modal>
    </>
  );
};

Filter.propTypes = {
  dataAction: PropTypes.func.isRequired,
  filterMap: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
  })).isRequired,
  filterSelector: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
    ])
  ),
  setFilterAction: PropTypes.func.isRequired,
};

export default Filter;
