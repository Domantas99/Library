/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import FilterModalContent from './FilterModalContent';
import Modal from './Modal';

const Filter = ({
  dataAction,
  filterSelector,
  filterMap,
  sortMap,
  excludedFilters,
  setFilterAction,
}) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(sortMap[0].value);
  const [filterElements, setFilterElements] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [sortOptions, setSortOptions] = useState([]);

  const generateSortedFilters = useCallback(
    (newFilters) => {
      return {
        ...newFilters,
        sort: [sort],
      };
    },
    [sort]
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

  const handleChangeSort = (event) => {
    setSort(event.target.value);
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

  // useEffect(() => {
  //   dispatch(dataAction(generateSortedFilters(filterSelector)));
  // }, [filterSelector, sort]);

  useEffect(() => {
    setFilterElements(createFilterElements());
  }, [filterSelector]);

  useEffect(() => {
    setSortOptions(
      sortMap.map((sortEntry) => (
        <option key={sortEntry.value} value={sortEntry.value}>
          {sortEntry.label}
        </option>
      ))
    );
  }, [sortMap]);

  return (
    <>
      {filterElements}
      <Button onClick={() => handleModalClick()}>Add Filters</Button>
      <select
        id="book-list-sorting-field"
        defaultValue={sort}
        onChange={handleChangeSort}
      >
        {sortOptions}
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
  filterMap: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  sortMap: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
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
